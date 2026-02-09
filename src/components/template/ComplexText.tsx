import React, { ChangeEvent, FC, useState } from 'react';
import ComplexTextProps from '../../props/ComplexTextProps';


const ComplexText: FC<ComplexTextProps> = ({ restraints }) => {

    const [value, setValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className='complextext-block'>
            <input type="text"
                value={value}
                onChange={handleChange}/>

            {restraints.test(value) ? <p>true</p> : <p>false</p>}
        </div>);
}

export default ComplexText;