import { JSX } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

interface ComboBoxProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    values: string[];
    textFieldProps?: Partial<AutocompleteProps<any, false, false, false>>;
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
                {...field}
                {...textFieldProps}
                options={values}
                fullWidth
                renderInput={(params) => <TextField
                    {...params}
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />}
            />
        )}
    />
);

export default ComboBox;