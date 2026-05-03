import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    Container,
    Paper,
    Typography,
    Box,
    Button,
    Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import * as yup from 'yup';

import SimpleText from './Resources/SimpleText';
import ValueSelector from './Resources/ValueSelector';
import DateCalendar from './Resources/DateCalendar';
import MaskedText from './Resources/MaskedText';
import ComboBox from './Resources/ComboBox';

import staticData from './PracticeTemplateStatic'

yup.setLocale({
    mixed: {
        required: 'Обязательное поле',
        notType: 'Неверный формат',
    },
    string: {
        email: 'Введите корректный email',
        min: ({ min }) => `Должно быть не менее ${min} символов`,
        max: ({ max }) => `Должно быть не более ${max} символов`,
    },
    number: {
        min: ({ min }) => `Должно быть не менее ${min}`,
        max: ({ max }) => `Должно быть не более ${max}`,
    },
});

const schema = yup.object({
    email: yup.string().email().required(),
    practiceType: yup.string().oneOf(staticData.practiceTypeValues, "Некорректное значение").required(),
    dateStart: yup.date().required(),
    dateEnd: yup.date().required().test('is-after-start', 'Дата окончания должна быть позже даты начала', function (value) {
        const { dateStart } = this.parent;
        if (!dateStart || !value) return true;
        return value > dateStart;
    }),
    studentName: yup.string().required(),
    phoneNumber: yup.string().matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Некорректный номер телефона").required(),
    group: yup.string().matches(/^[A-Z]{3}-\d{2}-\d{2}$/, "Некорректное значение").required(),
    course: yup.string().oneOf(staticData.courseValues, "Некорректное значение").required(),
    fieldOfStudy: yup.string().oneOf(staticData.fieldOfStudyValues, "Некорректное значение").required(),
    cafedra: yup.string().oneOf(staticData.cafedraValues, "Некорректное значение").required(),
    managerName: yup.string().required(),
    managerPost: yup.string().oneOf(staticData.managerPostValues).required(),
    orgName: yup.string().required(),
    infoOrgChoice: yup.string().oneOf(staticData.infoOrgChoice, "Некорректное значение").required(),
    addressJuridical: yup.string().required(),
    addressFactical: yup.string().required(),
    orgOGRN: yup.string().matches(/\d{13}$/, "ОГРН - 13 цифр").required(),
    orgINN: yup.string().matches(/\d{10}$/, "ИНН - 10 цифр").required(),
    orgKPP: yup.string().default("").optional().matches(/^(|\d{9})$/, "КПП - 9 цифр"),
    orgPhoneNumber: yup.string().matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Некорректный номер телефона").required(),
    orgEmail: yup.string().email().required(),
    directorPost: yup.string().oneOf(staticData.directorPostValues).required(),
    directorName: yup.string().required(),
    directorBase: yup.string().oneOf(staticData.directorBaseValues).required(),
    orgManagerName: yup.string().required(),
    orgManagerPost: yup.string().required()
});

const validMock = {
    email: 'test@example.com',
    practiceType: staticData.practiceTypeValues[0],
    dateStart: undefined,
    dateEnd: undefined,
    studentName: 'Иванов Иван Иванович',
    phoneNumber: '+7 (123) 456-78-90',
    group: 'ABC-12-34',
    course: staticData.courseValues[0],
    fieldOfStudy: staticData.fieldOfStudyValues[0],
    cafedra: staticData.cafedraValues[0],
    managerName: 'Петров П.П.',
    managerPost: staticData.managerPostValues[0],
    orgName: 'ООО "Ромашка"',
    infoOrgChoice: staticData.infoOrgChoice[0],
    addressJuridical: 'Москва, ул. Ленина, д.1',
    addressFactical: 'Москва, ул.Ленина, д.1, офис 5',
    orgOGRN: '1234567890123',
    orgINN: '1234567890',
    orgKPP: '123456789',
    orgPhoneNumber: '+7 (987) 654-32-10',
    orgEmail: 'org@example.com',
    directorPost: staticData.directorPostValues[0],
    directorName: 'Сидоров С.С.',
    directorBase: staticData.directorBaseValues[0],
    orgManagerName: 'Кузнецов К.К.',
    orgManagerPost: 'Главный инженер',
};

const defaultValues = {
    practiceType: '',
    dateStart: null,
    dateEnd: null,
    studentName: '',
    phoneNumber: '',
    email: '',
    course: '',
    group: '',
    fieldOfStudy: '',
    cafedra: '',
    managerName: '',
    managerPost: '',
    orgName: '',
    infoOrgChoice: '',
    addressJuridical: '',
    addressFactical: '',
    orgOGRN: '',
    orgINN: '',
    orgKPP: '',
    orgPhoneNumber: '',
    orgEmail: '',
    directorPost: '',
    directorName: '',
    directorBase: '',
    orgManagerName: '',
    orgManagerPost: '',
};

type FormData = yup.InferType<typeof schema>;

const TemplateFill: FC = () => {

    const [isLoading, setLoading] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: validMock
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/fill', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateId: 0,
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

        setLoading(false);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Typography variant="h4">Документ на практику "СТАНКИН"</Typography>

                        <ValueSelector name='practiceType' control={control} label='Вид практики' values={staticData.practiceTypeValues}></ValueSelector>
                        <DateCalendar name='dateStart' control={control} label='Дата начала практики' minDate={dayjs('2025-01-01')} maxDate={dayjs('2026-12-31')}></DateCalendar>
                        <DateCalendar name='dateEnd' control={control} label='Дата окончания практики' minDate={dayjs('2025-01-01')} maxDate={dayjs('2026-12-31')}></DateCalendar>
                        <Typography variant="h5">Информация об обучающемся</Typography>
                        <SimpleText name='studentName' control={control} label='ФИО' />
                        <MaskedText
                            name='phoneNumber'
                            control={control}
                            label='Телефон'
                            mask='+7 (000) 000-00-00'
                        />
                        <SimpleText name='email' control={control} label='Email' />
                        <ValueSelector name='course' control={control} label='Курс' values={staticData.courseValues}></ValueSelector>
                        <MaskedText
                            name='group'
                            control={control}
                            label='Группа'
                            mask='aaa-00-00'
                        />
                        <ComboBox name='fieldOfStudy' control={control} label='Направление подготовки' values={staticData.fieldOfStudyValues}></ComboBox>
                        <ComboBox name='cafedra' control={control} label='Кафедра' values={staticData.cafedraValues}></ComboBox>
                        <Typography variant="h5">Информация о руководителе практической подготовки от Университета</Typography>
                        <SimpleText name='managerName' control={control} label='ФИО' />
                        <ValueSelector name='managerPost' control={control} label='Должность' values={staticData.managerPostValues} />
                        <Typography variant="h5">Информация о Профильной организации</Typography>
                        <SimpleText name='orgName' control={control} label='Полное наименование (сокращённое наименование)' />
                        <ValueSelector
                            name='infoOrgChoice'
                            control={control}
                            label='Информация о выборе организации'
                            helperText='Если выбрал сам, то указать "САМОСТОЯТЕЛЬНО", если работаете в этой организации, то указать "ПО МЕСТУ РАБОТЫ", если целевое обучение – "ЦЕЛЕВИК", выбрал из списка – "ПО ПОТРЕБНОСТИ"'
                            values={staticData.infoOrgChoice}
                        />
                        <SimpleText
                            name='addressJuridical'
                            control={control}
                            label='Адрес'
                            helperText={'Юридический адрес (с индексом)'}
                        />
                        <SimpleText
                            name='addressFactical'
                            control={control}
                            label='Адрес'
                            helperText={'Фактический адрес (с индексом, помещением)'}
                        />
                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                            <Typography variant="body1">Реквизиты организации можно посмотреть</Typography>
                            <Button
                                href="https://spark-interfax.ru/quick-search/rekvizity-organizatsii"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                variant="text"
                            >
                                здесь
                            </Button>
                        </Box>
                        <MaskedText
                            name='orgOGRN'
                            control={control}
                            label='ОГРН'
                            mask='0000000000000'
                        />
                        <MaskedText
                            name='orgINN'
                            control={control}
                            label='ИНН'
                            mask='0000000000'
                        />
                        <MaskedText
                            name='orgKPP'
                            control={control}
                            label='КПП'
                            mask='000000000'
                            unmasked
                            helperText='Если организация является ИП - не указывать'
                        />
                        <MaskedText
                            name='orgPhoneNumber'
                            control={control}
                            label='Телефон'
                            mask='+7 (000) 000-00-00'
                        />
                        <SimpleText name='orgEmail' control={control} label='Email' />
                        <Typography variant="h5">Информация о руководителе Профильной организации</Typography>
                        <ValueSelector name='directorPost' control={control} label='Должность' values={staticData.directorPostValues} />
                        <SimpleText name='directorName' control={control} label='ФИО' />
                        <ValueSelector
                            name='directorBase'
                            control={control}
                            label='Действует на основании'
                            values={staticData.directorBaseValues}
                            helperText='Только генеральный директор может действовать на основании устава'
                        />
                        <Typography variant="h5">Информация о руководителе практической подготовки от Профильной организации</Typography>
                        <SimpleText name='orgManagerName' control={control} label='ФИО' />
                        <SimpleText name='orgManagerPost' control={control} label='Должность' />
                        <Box display="flex" flexDirection="column">
                            <Button
                                type="submit"
                                variant='contained'
                                disabled={Object.keys(errors).length > 0}
                                loading={isLoading}
                                sx={{alignSelf: "flex-end" }}
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