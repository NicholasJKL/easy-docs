import { JSX } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface SimpleTextProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    helperText?: string;
    textFieldProps?: Partial<TextFieldProps>;
}

const SimpleText = <T extends FieldValues>({
    name,
    control,
    label,
    helperText,
    textFieldProps,
}: SimpleTextProps<T>): JSX.Element => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <TextField
                {...field}
                {...textFieldProps}
                label={label}
                fullWidth
                error={!!fieldState.error}
                helperText={helperText ?? fieldState.error?.message}
            />
        )}
    />
);

export default SimpleText;