import React, { FC } from 'react';
import { Search } from '@mui/icons-material';
import TemplateListItem from './TemplateListItem';

const TemplateList: FC = () => {
    return (
        <main>
            <div className='template-list'>
                <h2>Список шаблонов</h2>
                <div className='template-list-search'>
                    <input type="text" /><Search />
                </div>
                <div className='template-list-container'>
                    <TemplateListItem></TemplateListItem>
                    <TemplateListItem></TemplateListItem>
                </div>
            </div>
        </main>
    );
}

export default TemplateList;