import React, { FC, MouseEventHandler } from 'react';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import TemplateListItem from './TemplateListItem';

const TemplateList: FC = () => {

    const navigate = useNavigate();

    return (
        <div className='template-list'>
            <div className='template-list-search'>
            <h2>Список шаблонов</h2>
                <div className='search-field'>
                    <input type="text" /><Search />
                </div>
            </div>
            <div className='template-list-container'>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
                <TemplateListItem onClick={() => navigate('/template')}></TemplateListItem>
            </div>
        </div>
    );
}

export default TemplateList;