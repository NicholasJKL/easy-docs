import { FC, useState } from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    IconButton,
    Paper,
    Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SimpleText from "../TemplateFill/Resources/SimpleText";
import ValueSelector from "../TemplateFill/Resources/ValueSelector";

type FieldType = 'Простой текст' | 'Название блока';

interface FormField {
    label: string;
    type: FieldType;
}

interface FormData {
    name: string;
    description: string;
    fields: FormField[];
}

const TemplateConstructor: FC = () => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: '',
            description: '',
            fields: [],
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields'
    });

    const [file, setFile] = useState<File | null>(null);

    const updateFile = (value: File | null) => {
        setFile(value ?? null);
    };

    const addField = () => {
        append({ label: '', type: 'Простой текст' });
    };

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            
            formData.append('name', data.name);
            formData.append('description', data.description);
            
            formData.append('fields', JSON.stringify(data.fields));
            
            if (file) {
                formData.append('templateFile', file);
            }

            const response = await fetch('http://localhost:3001/api/templates', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка создания шаблона');
            }

            alert('Шаблон успешно сохранён!');
        } catch (err) {
            console.error(err);
            alert('Ошибка при отправке формы');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>Конструктор шаблонов</Typography>
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Основная информация</Typography>
                    <Stack spacing={2}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Название обязательно' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Название шаблона"
                                    fullWidth
                                    required
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Описание (необязательно)"
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                            )}
                        />
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<span>📄</span>}
                        >
                            Загрузить файл шаблона (.docx)
                            <input
                                type="file"
                                accept=".docx"
                                hidden
                                onChange={(e) => updateFile(e.target.files?.[0] ?? null)}
                            />
                        </Button>

                        {file && (
                            <Typography variant="body2" color="textSecondary">
                                Файл: {file.name}
                            </Typography>
                        )}
                    </Stack>
                </Paper>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">Поля формы</Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addField}
                            variant="contained"
                            size="small"
                        >
                            Добавить поле
                        </Button>
                    </Box>

                    {fields.map((field, index) => (
                        <Box key={field.id} display="flex" alignItems="center" gap={2} sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 1 }}>
                            <SimpleText
                                name={`fields.${index}.label`}
                                control={control}
                                label="Маркер или текст" />
                            <ValueSelector
                                name={`fields.${index}.type`}
                                control={control}
                                label="Тип поля"
                                defaultValue="Простой текст"
                                values={["Простой текст", "Заголовок"]}></ValueSelector>
                            <IconButton edge="end" color="error" onClick={() => remove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Paper>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={isLoading}
                    >
                        Создать
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default TemplateConstructor;