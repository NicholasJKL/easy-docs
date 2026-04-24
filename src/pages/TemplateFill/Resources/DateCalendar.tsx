import { JSX, useState, useMemo } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { FieldValues, Path, Control, Field, Controller } from 'react-hook-form';
import { DatePickerProps, DateValidationError } from '@mui/x-date-pickers';
import 'dayjs/locale/ru';

interface DateProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    datePickerProps?: Partial<DatePickerProps>;
}

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

const DateCalendar = <T extends FieldValues>({
    name,
    control,
    label,
    datePickerProps
}: DateProps<T>): JSX.Element => {

    return (<Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru' localeText={russianLocale}>
                <DatePicker
                    {...field}
                    {...datePickerProps}
                    label={label}
                    slotProps={!!fieldState.error ?
                        {
                            textField: {
                                error: !!fieldState.error,
                                helperText: fieldState.error?.message
                            }
                        } : {}
                    }
                    format='DD.MM.YYYY'
                />
            </LocalizationProvider>)}
    />)
}

export default DateCalendar;