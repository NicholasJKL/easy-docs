import { Routes, Route } from 'react-router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './components/Header';
import TemplateList from './pages/TemplateList';
import TemplateFill from './pages/TemplateFill';

const theme = createTheme({
    components: {
        MuiAutocomplete: {
            defaultProps: {
                noOptionsText: 'Нет вариантов'
            }
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#4758b8',
        },
        secondary: {
            main: '#8dfff9',
        },
    }
});

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru' localeText={russianLocale}>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<TemplateList />} />
                        <Route path="/template" element={<TemplateFill />} />
                    </Routes>
                </main>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
