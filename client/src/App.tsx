import { Routes, Route } from 'react-router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';
import TemplateList from './pages/TemplateList';
import T2Template from './pages/TemplateFill/T2Template';
import TemplateFill from './pages/TemplateFill';
import TemplateConstructor from './pages/TemplateConstructor';

const theme = createTheme({
    components: {
        MuiAutocomplete: {
            defaultProps: {
                noOptionsText: 'Нет вариантов'
            }
        }
    },

});

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru' localeText={russianLocale}>
                <CssBaseline />
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<TemplateList />} />
                        <Route path="/constructor" element={<TemplateConstructor />} />
                        <Route path="/template/:id" element={<TemplateFill />} />
                        <Route path="/template" element={<T2Template />} />
                    </Routes>
                </main>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
