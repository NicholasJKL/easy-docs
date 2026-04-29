import { JSX } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, SelectProps, FormHelperText } from '@mui/material';

interface ValueSelectorProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    values: string[];
    helperText?: string;
    valueSelectorProps?: Partial<SelectProps>;
}

const ValueSelector = <T extends FieldValues>({
    name,
    control,
    label,
    values,
    helperText,
    valueSelectorProps }: ValueSelectorProps<T>): JSX.Element => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (

            <FormControl fullWidth error={!!fieldState.error}>
                <InputLabel>{label}</InputLabel>
                <Select
                    {...field}
                    {...valueSelectorProps}
                    label={label}
                    defaultValue={''}>
                    {values?.map((value) => <MenuItem value={value}>{value}</MenuItem>)}
                </Select>
                <FormHelperText>{helperText ?? fieldState.error?.message ?? ''}</FormHelperText>
            </FormControl>)}
    />
);

export default ValueSelector;