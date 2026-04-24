import { JSX, forwardRef } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { IMaskInput } from 'react-imask';

interface PhoneMaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

interface MaskFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    mask: string;
    textFieldProps?: Partial<TextFieldProps>;
}

const MaskedText = <T extends FieldValues>({
    name,
    control,
    label,
    mask,
    textFieldProps}: MaskFieldProps<T>): JSX.Element => {

    const PhoneMask = forwardRef<HTMLInputElement, PhoneMaskProps>(
        function PhoneMask(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask={mask}
                    radix="."
                    inputRef={ref}
                    onAccept={(value) => {
                        const raw = value.replace(/\D/g, '');
                        onChange({ target: { name: props.name, value: raw } });
                    }}
                    overwrite
                />
            );
        },
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...textFieldProps}
                    label={label}
                    fullWidth
                    slotProps={{
                        input: {
                            inputComponent: PhoneMask as any,
                        }
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}
        />
    )
};

export default MaskedText;