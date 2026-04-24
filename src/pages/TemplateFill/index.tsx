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

const phoneRegExp: RegExp = /^7\d{10}$/

const schema = yup.object({
    email: yup.string().email().required(),
    type: yup.string().required(),
    date: yup.date().required(),
    FIO: yup.string().required(),
    phoneNumber: yup.string().matches(phoneRegExp, "Некорректный номер телефона").required()
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
                <ValueSelector name='type' control={control} label='Вид практики' values={['1', '2']}></ValueSelector>
                <DateCalendar name='date' control={control} label='Дата начала практики'></DateCalendar>
                <DateCalendar name='date' control={control} label='Дата окончания практики'></DateCalendar>
                <SimpleText name='email' control={control} label='Email' />
                <SimpleText name='FIO' control={control} label='ФИО' />
                <MaskedText 
                name='phoneNumber' 
                control={control} 
                label='Телефон' 
                mask='+7 (000) 000-00-00'/>
                <Button
                    type="submit"
                    variant='contained'
                >Отправить</Button>
            </form>

        </main>
    );
}


export default TemplateFill;