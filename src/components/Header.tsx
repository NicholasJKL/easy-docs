import React, { FC } from 'react';


const Header: FC = () => 
    {
        return (
        <header>
            <h1>EasyDocs</h1>
            <nav>
                <ul>Список шаблонов</ul>
                <ul>Авторизация</ul>
            </nav>
        </header>
        );
    }

export default Header;