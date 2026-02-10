import React, { FC } from 'react';
import { EditDocument } from '@mui/icons-material';


const Header: FC = () => 
    {
        return (
        <header>
            <h1>EasyDocs&nbsp;<EditDocument/></h1>
            <nav>
                <ul>Список шаблонов</ul>
                <ul className='accent'>Регистрация</ul>
            </nav>
        </header>
        );
    }

export default Header;