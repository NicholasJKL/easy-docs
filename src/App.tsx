import React from 'react';
import { Routes, Route } from 'react-router'
import Header from './components/Header';
import TemplateList from './pages/TemplateList';
import TemplateFill from './pages/TemplateFill';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      defaultProps: {
        noOptionsText: 'Нет вариантов'
      }
    }
  }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<TemplateList/>} />
                    <Route path="/template" element={<TemplateFill/>}/>
                </Routes>
            </main>
        </ThemeProvider>
    );
}

export default App;
