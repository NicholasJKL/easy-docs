import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
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
    dateStart: yup.date().required().nullable(),
    dateEnd: yup.date().required().nullable().test('is-after-start', 'Дата окончания должна быть позже даты начала', function (value) {
        const { dateStart } = this.parent;
        if (!dateStart || !value) return true;
        return value > dateStart;
    }),
    studentName: yup.string().required(),
    phoneNumber: yup.string().matches(staticData.phoneRegExp, "Некорректный номер телефона").required(),
    group: yup.string().matches(/^[A-Z]{3}-\d{2}-\d{2}$/, "Некорректное значение").required(),
    course: yup.string().oneOf(staticData.courseValues, "Некорректное значение").required(),
    fieldOfStudy: yup.string().oneOf(staticData.fieldOfStudyValues, "Некорректное значение").required(),
    cafedra: yup.string().oneOf(staticData.cafedraValues, "Некорректное значение").required(),
    managerName: yup.string().required(),
    managerPost: yup.string().oneOf(staticData.managerPostValues).required(),
    organizationName: yup.string().required(),
    infoOrganizationChoice: yup.string().oneOf(staticData.infoOrganizationChoice, "Некорректное значение").required(),
    address: yup.string().matches(/^[^/]+\/.+$/, "Должно быть два адреса с разделителем /").required(),
    organizationOGRN_INN: yup.string().matches(/^\d{13}\/\d{10}$/, "Формат - ОГРН/ИНН").required(),
    organization_KPP: yup.string().optional().default("").matches(/^(|\d{9})$/),
    organizationPhoneNumber: yup.string().matches(staticData.phoneRegExp, "Некорректный номер телефона").required(),
    organizationEmail: yup.string().email().required(),
    directorPost: yup.string().oneOf(staticData.directorPostValues).required(),
    directorName: yup.string().required(),
    directorBase: yup.string().oneOf(staticData.directorBaseValues).required(),
    orgManagerName: yup.string().required(),
    orgManagerPost: yup.string().required()
});

const validMock = {
    email: 'test@example.com',
    practiceType: staticData.practiceTypeValues[0],
    dateStart: null,
    dateEnd: null,
    studentName: 'Иванов Иван Иванович',
    phoneNumber: '+7 (123) 456-78-90',
    group: 'ABC-12-34',
    course: staticData.courseValues[0],
    fieldOfStudy: staticData.fieldOfStudyValues[0],
    cafedra: staticData.cafedraValues[0],
    managerName: 'Петров П.П.',
    managerPost: staticData.managerPostValues[0],
    organizationName: 'ООО "Ромашка"',
    infoOrganizationChoice: staticData.infoOrganizationChoice[0],
    address: 'Москва, ул. Ленина, д.1 / Москва, ул. Ленина, д.1, офис 5',
    organizationOGRN_INN: '1234567890123/1234567890',
    organization_KPP: '123456789',
    organizationPhoneNumber: '+7 (987) 654-32-10',
    organizationEmail: 'org@example.com',
    directorPost: staticData.directorPostValues[0],
    directorName: 'Сидоров С.С.',
    directorBase: staticData.directorBaseValues[0],
    orgManagerName: 'Кузнецов К.К.',
    orgManagerPost: 'Главный инженер',
};


const TemplateFill: FC = () => {

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: validMock
    });

    return (
        <main className='template-fill'>
            <div className='template-info'>

            </div>
            <form className='template-form' onSubmit={handleSubmit((data) => console.log(data))}>
                <h2>Документ на практику "СТАНКИН"</h2>
                <ValueSelector name='practiceType' control={control} label='Вид практики' values={staticData.practiceTypeValues}></ValueSelector>
                <DateCalendar name='dateStart' control={control} label='Дата начала практики' minDate={dayjs('2025-01-01')} maxDate={dayjs('2026-12-31')}></DateCalendar>
                <DateCalendar name='dateEnd' control={control} label='Дата окончания практики' minDate={dayjs('2025-01-01')} maxDate={dayjs('2026-12-31')}></DateCalendar>
                <h3>Информация об обучающемся</h3>
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
                <h3>Информация о руководителе практической подготовки от Университета</h3>
                <SimpleText name='managerName' control={control} label='ФИО' />
                <ValueSelector name='managerPost' control={control} label='Должность' values={staticData.managerPostValues} />
                <h3>Информация о Профильной организации</h3>
                <SimpleText name='organizationName' control={control} label='Полное наименование (сокращённое наименование)' />
                <ValueSelector
                    name='infoOrganizationChoice'
                    control={control}
                    label='Информация о выборе организации'
                    helperText='Если выбрал сам, то указать "САМОСТОЯТЕЛЬНО", если работаете в этой организации, то указать "ПО МЕСТУ РАБОТЫ", если целевое обучение – "ЦЕЛЕВИК", выбрал из списка – "ПО ПОТРЕБНОСТИ"'
                    values={staticData.infoOrganizationChoice}
                />
                <SimpleText
                    name='address'
                    control={control}
                    label='Адрес'
                    helperText={'Юридический адрес (с индексом) / Фактический адрес (с индексом, помещением). Разделитель "/" обязателен'}
                />
                <h4>Реквизиты организации можно посмотреть
                    <Button
                        href='https://spark-interfax.ru/quick-search/rekvizity-organizatsii'
                        target="_blank" rel="noopener noreferrer"
                        size="small">
                        здесь
                    </Button></h4>
                <MaskedText
                    name='organizationOGRN_INN'
                    control={control}
                    label='ОГРН/ИНН'
                    mask='0000000000000/0000000000'
                />
                <MaskedText
                    name='organization_KPP'
                    control={control}
                    label='КПП'
                    mask='000000000'
                    unmasked
                    helperText='Если организация является ИП - не указывать'
                />
                <MaskedText
                    name='organizationPhoneNumber'
                    control={control}
                    label='Телефон'
                    mask='+7 (000) 000-00-00'
                />
                <SimpleText name='organizationEmail' control={control} label='Email' />
                <h3>Информация о руководителе Профильной организации</h3>
                <ValueSelector name='directorPost' control={control} label='Должность' values={staticData.directorPostValues} />
                <SimpleText name='directorName' control={control} label='ФИО' />
                <ValueSelector
                    name='directorBase'
                    control={control}
                    label='Действует на основании'
                    values={staticData.directorBaseValues}
                    helperText='Только генеральный директор может действовать на основании устава'
                />
                <h3>Информация о руководителе практической подготовки от Профильной организации</h3>
                <SimpleText name='orgManagerName' control={control} label='ФИО' />
                <SimpleText name='orgManagerPost' control={control} label='Должность' />

                <Button
                    type="submit"
                    variant='contained'
                >Отправить</Button>
            </form>

        </main>
    );
}


export default TemplateFill;