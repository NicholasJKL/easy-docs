import React, { FC } from 'react';
import CircularWithValueLabel from './CircularProgressWithLabel';
import { Controller, useForm } from 'react-hook-form';
import SimpleText from './SimpleText';
import { TextField } from '@mui/material';

const TemplateFill: FC = () => {

    const { control, handleSubmit } = useForm();

    return (
        <main className='template-fill'>
            <div className='template-info'>
                <p>Прогресс заполнения</p>
                <div>
                    <CircularWithValueLabel></CircularWithValueLabel>
                </div>
            </div>

            <form className='template-form' onSubmit={handleSubmit((data) => console.log(data))}>
                <h2>Документ на практику "СТАНКИН"</h2>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email обязателен' }}
                    
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Email"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <button type="submit">Отправить</button>
            </form>

        </main>
    );
}


export default TemplateFill;