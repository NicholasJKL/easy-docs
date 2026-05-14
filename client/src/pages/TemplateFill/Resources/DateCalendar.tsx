import { JSX } from 'react';
import { DatePicker, DateView } from '@mui/x-date-pickers';
import { FieldValues, Path, Control, Controller } from 'react-hook-form';
import { DatePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { PickerValue } from '@mui/x-date-pickers/internals';

interface DateProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    defaultValue?: PickerValue;
    views?: DateView[];
    minDate?: dayjs.Dayjs;
    maxDate?: dayjs.Dayjs;
    datePickerProps?: Partial<DatePickerProps>;
}

const DateCalendar = <T extends FieldValues>({
    name,
    control,
    label,
    datePickerProps,
    defaultValue,
    views,
    minDate,
    maxDate,
}: DateProps<T>): JSX.Element => {

    return (<Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <DatePicker
                {...field}
                {...datePickerProps}
                value={defaultValue ? (field.value) : (field.value ?? null)}
                defaultValue={defaultValue ?? null}
                label={label}
                views={views ?? ['year', 'month', 'day']} 
                minDate={minDate ?? undefined}
                maxDate={maxDate ?? undefined}
                slotProps={
                    {
                        textField: {
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message
                        }
                    }
                }
            />
        )}
    />)
}

export default DateCalendar;