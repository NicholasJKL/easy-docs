import React, { FC } from 'react';
import ValueSelectorProps from '../../props/ValueSelectorProps';

const ValueSelector: FC<ValueSelectorProps> = ({ values }) => {

    return (<div className='valueselector-block'>
        <select name="" id="">
            <option value="">--Выберите значение--</option>
            {values?.map((value) => <option value={value}>{value}</option>)}
        </select>
    </div>);
}

export default ValueSelector;