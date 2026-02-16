import React, { FC } from 'react';
import { Button } from '@mui/material'
import CircularWithValueLabel from './CircularProgressWithLabel';
import ValueSelector from './ValueSelector';
import Date from './Date';

const TemplateFill: FC = () => {

    return (<main className='template-fill'>
        <div className='template-info'>
            <p>Прогресс заполнения</p>
            <div>
                <CircularWithValueLabel></CircularWithValueLabel>
            </div>
        </div>

        <form className='template-form'>
            <h2>Документ на практику "СТАНКИН"</h2>
            <ValueSelector name={'Вид практической подготовки'} 
            values={["Учебная практика", "Производственная практика", "Преддипломная практика"]}/>

            <p>Срок организации практической подготовки (с/по)</p>
            <Date name='Дата'/>
            <Date name='Дата'/>
            <Button variant="contained" disabled>Готово</Button>
        </form>

    </main>);
}


export default TemplateFill;