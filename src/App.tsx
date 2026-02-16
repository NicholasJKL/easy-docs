import React from 'react';
import { Routes, Route } from 'react-router'
import Header from './components/Header';
import TemplateList from './pages/TemplateList';
import TemplateFill from './pages/TemplateFill';


function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<TemplateList/>} />
                    <Route path="/template" element={<TemplateFill/>}/>
                </Routes>
            </main>
        </>
    );
}

export default App;
