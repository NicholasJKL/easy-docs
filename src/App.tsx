import React from 'react';
import logo from './logo.svg';

import SimpleText from './components/template/SimpleText';
import ComplexText from './components/template/ComplexText';
import ValueSelector from './components/template/ValueSelector';
import Header from './components/Header';


function App() {
    return (
        <main>
            <Header></Header>
            <ComplexText name="test" restraints={new RegExp("abc")}></ComplexText>
            <ValueSelector name="test" values={["1","2"]}></ValueSelector>
        </main>
    );
}

export default App;
