import { JSX } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

interface ComboBoxProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    values: string[];
    textFieldProps?: Partial<React.ComponentProps<typeof Autocomplete>>;
}

const ComboBox = <T extends FieldValues>({
    name,
    control,
    label,
    values,
    textFieldProps,
}: ComboBoxProps<T>): JSX.Element => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <Autocomplete
                {...textFieldProps}
                {...field}
                options={values}
                onChange={(_e, newValue) => {
                    field.onChange(newValue ?? '');
                }}
                fullWidth
                
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
        )}
    />
);

export default ComboBox;