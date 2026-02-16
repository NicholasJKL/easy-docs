import React, { FC } from 'react';
import ValueSelectorProps from '../../props/ValueSelectorProps';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ValueSelector: FC<ValueSelectorProps> = ({ name, values }) => {

    return (<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={name}
        >
            {values?.map((value) => <MenuItem value={value}>{value}</MenuItem>)}
        </Select>
    </FormControl>);
}

export default ValueSelector;