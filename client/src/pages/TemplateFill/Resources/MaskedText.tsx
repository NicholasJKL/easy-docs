import { JSX, forwardRef } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { IMaskInput, IMask } from 'react-imask';

interface MaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

interface MaskFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    mask: string | RegExp;
    unmasked?: boolean
    helperText?: string;
    textFieldProps?: Partial<TextFieldProps>;
}

const MaskedText = <T extends FieldValues>({
    name,
    control,
    label,
    mask,
    helperText,
    unmasked,
    textFieldProps }: MaskFieldProps<T>): JSX.Element => {

    const iMask = IMask.createMask(mask);

    const MaskInput = forwardRef<HTMLInputElement, MaskProps>(
        function Mask(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask={iMask}
                    prepare={(str: string) => str.toUpperCase()}
                    inputRef={ref}
                    lazy={false}
                    onAccept={(value, maskRef) => {
                        onChange({ target: { name: props.name, value: unmasked ? maskRef.unmaskedValue : value } });
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
                            inputComponent: MaskInput as any,
                        },
                        inputLabel: {
                            shrink: true
                        }
                    }}
                    error={!!fieldState.error}
                    helperText={helperText ?? fieldState.error?.message}
                />
            )}
        />
    )
};

export default MaskedText;