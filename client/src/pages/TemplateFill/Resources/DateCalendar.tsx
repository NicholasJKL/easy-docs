import { JSX } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { FieldValues, Path, Control, Controller } from 'react-hook-form';
import { DatePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface DateProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    minDate?: dayjs.Dayjs;
    maxDate?: dayjs.Dayjs;
    datePickerProps?: Partial<DatePickerProps>;
}

const DateCalendar = <T extends FieldValues>({
    name,
    control,
    label,
    datePickerProps,
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
                defaultValue={undefined}
                label={label}
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