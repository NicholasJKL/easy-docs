import { JSX } from 'react';
import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';
import NumberField from './NumberFieldMUI';

interface NumProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    min?: number;
    max?: number;
    label: string;
    helperText?: string;
}

const NumField = <T extends FieldValues>({
    name,
    control,
    label,
    min,
    max,
    defaultValue
}: NumProps<T>): JSX.Element => (
    <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
            <NumberField
                {...field}
                min={min}
                max={max}
                label={label}
                onValueChange={(val) => {
                    const parsed = Number(val);
                    field.onChange(parsed);
                }}
                error={!!fieldState.error}
            />)
        }
    />
);

export default NumField;