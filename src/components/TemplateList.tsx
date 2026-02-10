import React, { FC } from 'react';
import TemplateListItem from './TemplateListItem';
import { Search } from '@mui/icons-material';


const TemplateList: FC = () => 
    {
        return (
        <div className='template-list'>
            <h2>Список шаблонов</h2>
            <div className='template-list-search'>
                <input type="text" /><Search/>
            </div>
            <div className='template-list-container'>
                <TemplateListItem></TemplateListItem>
                <TemplateListItem></TemplateListItem>
            </div>
        </div>
        );
    }

export default TemplateList;