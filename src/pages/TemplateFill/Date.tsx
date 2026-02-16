import React, { FC } from 'react';
import DateProps from '../../props/DateProps';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/ru';

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

const Date: FC<DateProps> = () => {
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru' localeText={russianLocale}>
            <DatePicker
                label='Выберите дату'
                format='DD.MM.YYYY'
            />


        </LocalizationProvider>);
}

export default Date;