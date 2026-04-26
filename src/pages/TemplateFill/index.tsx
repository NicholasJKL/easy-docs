import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularWithValueLabel from './Resources/CircularProgressWithLabel';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
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
    dateStart: yup.date().min(new Date('2026-04-20')).required(),
    dateEnd: yup.date().required(),
    studentName: yup.string().required(),
    phoneNumber: yup.string().matches(staticData.phoneRegExp, "Некорректный номер телефона").required(),
    group: yup.string().required(), // добавить регекс
    course: yup.string().oneOf(staticData.courseValues, "Некорректное значение").required(),
    fieldOfStudy: yup.string().oneOf(staticData.fieldOfStudyValues, "Некорректное значение").required(),
    cafedra: yup.string().oneOf(staticData.cafedraValues, "Некорректное значение").required(),
    managerName: yup.string().required(),
    managerPost: yup.string().oneOf(staticData.postValues).required(),
    organizationName: yup.string().required(),
    infoOrganizationChoice: yup.string().oneOf(staticData.infoOrganizationChoice, "Некорректное значение").required(),
    address: yup.string().matches(/^[^/]+\/.+$/, "Должно быть два адреса с разделителем /").required(),
    organizationOGRN_INN: yup.string().matches(/^\d{13}\/\d{10}$/, "Формат - ОГРН/ИНН").required(),
});

const TemplateFill: FC = () => {

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <main className='template-fill'>
            <div className='template-info'>
                <p>Прогресс заполнения</p>
                <div>
                    {/*<CircularWithValueLabel></CircularWithValueLabel>*/}
                </div>
            </div>
            <form className='template-form' onSubmit={handleSubmit((data) => console.log(data))}>
                <h2>Документ на практику "СТАНКИН"</h2>
                <ValueSelector name='practiceType' control={control} label='Вид практики' values={staticData.practiceTypeValues}></ValueSelector>
                <DateCalendar name='dateStart' control={control} label='Дата начала практики'></DateCalendar>
                <DateCalendar name='dateEnd' control={control} label='Дата окончания практики'></DateCalendar>
                <h3>Информация об обучающемся</h3>
                <SimpleText name='studentName' control={control} label='ФИО' />
                <MaskedText
                    name='phoneNumber'
                    control={control}
                    label='Телефон'
                    mask='+7 (000) 000-00-00' />
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
                <ValueSelector name='managerPost' control={control} label='Должность' values={staticData.postValues} />
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
                    label='Адрес организации'
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

                <Button
                    type="submit"
                    variant='contained'
                >Отправить</Button>
            </form>

        </main>
    );
}


export default TemplateFill;