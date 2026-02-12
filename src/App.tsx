import React from 'react';
import logo from './logo.svg';

import Header from './components/Header';
import TemplateList from './pages/TemplateList';


function App() {
    return (
        <>
            <Header/>

            <main>
                <TemplateList></TemplateList>
            </main>
            
        </>
    );
}

export default App;
