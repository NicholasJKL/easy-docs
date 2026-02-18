import React, { FC } from 'react';
import { TextField } from '@mui/material';
import SimpleTextProps from '../../props/SimpleTextProps';

const SimpleText: FC<SimpleTextProps> = () => 
    {
        return <TextField id="standard-basic" variant="standard"/>;
    }

export default SimpleText;