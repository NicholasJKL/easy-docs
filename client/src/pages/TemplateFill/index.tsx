import { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    Stack,
    CircularProgress,
    Alert
} from '@mui/material';

import Template, { FormField } from "../../model/Template";
import SimpleText from "./Resources/SimpleText";

const TemplateFill: FC = () => {

    const { id } = useParams<{ id: string }>();

    const [template, setTemplate] = useState<Template | null>(null);
    const [validationSchema, setValidationSchema] = useState(yup.object({}));
    const [loading, setLoading] = useState(true);
    const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTemplate = async () => {
            if (!id) {
                setError('ID шаблона не указан');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await fetch(`http://localhost:3001/api/template/${id}`);
                const template: Template = await data.json();
                setTemplate(template);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Не удалось загрузить шаблон');
            } finally {
                setLoading(false);
            }
        };
        fetchTemplate();
    }, [id]);

    useEffect(() => {
        if (template?.fields && template.fields.length > 0) {
            const schema = buildValidationSchema(template.fields);
            setValidationSchema(schema);
        }
    }, [template]);

    const buildValidationSchema = (fields: FormField[]) => {
        const schema: Record<string, yup.StringSchema> = {};
        fields.forEach((field: FormField) => {
            if (field.type === 'Простой текст') {
                schema[field.label] = yup.string().required(`Поле обязательно для заполнения`);
            }
        });

        return yup.object(schema);
    };

    const { control, handleSubmit, formState: { errors } } = useForm<Record<string, any>>({
        resolver: yupResolver(validationSchema)
    });

    type FormData = yup.InferType<typeof validationSchema>;

    const onSubmit = async (data: FormData) => {
        console.log(data);
        setLoadingButton(true);
        try {
            const response = await fetch('http://localhost:3001/api/fill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId: template?.id,
                    formData: data,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Ошибка генерации');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const filename = 'document.docx';

            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert('Ошибка при отправке формы');
        }

        setLoadingButton(false);
    };


    if (loading || !validationSchema) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!template) return <Alert severity="warning">Шаблон не найден</Alert>;

    return (<Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Typography variant="h4">{template.name}</Typography>
                    {template.fields.map((field: FormField, index) => {
                        switch (field.type) {
                            case 'Простой текст':
                                return (
                                    <SimpleText
                                        key={index}
                                        name={field.label}
                                        defaultValue={""}
                                        control={control}
                                        label={field.label.charAt(0).toUpperCase() + field.label.slice(1)}
                                    />
                                );
                            case 'Заголовок':
                                return (
                                    <Typography
                                        key={index}
                                        variant="h5"
                                    >
                                        {field.label}
                                    </Typography>
                                );
                            default:
                                return null;
                        }
                    })}

                    <Box display="flex" flexDirection="column">
                        <Button
                            type="submit"
                            variant='contained'
                            disabled={Object.keys(errors).length > 0}
                            loading={isLoadingButton}
                            sx={{ alignSelf: "flex-end" }}
                        >Отправить</Button>
                        {Object.keys(errors).length > 0 && (
                            <Typography color="error" variant="body2" sx={{ mt: 0, textAlign: "right" }}>
                                Пожалуйста, исправьте ошибки в форме
                            </Typography>
                        )}
                    </Box>
                </Stack>

            </form>
        </Paper>
    </Container>
    );
}

export default TemplateFill;