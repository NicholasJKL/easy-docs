import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    Container,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Grid,
    CircularProgress,
    Alert
} from '@mui/material';
import { Search } from '@mui/icons-material';

import TemplateListItem from './TemplateListItem';
import TemplateSummary from '../../model/TemplateSummary';

const TemplateList: FC = () => {
    const navigate = useNavigate();

    const [templates, setTemplates] = useState<TemplateSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/api/templates');
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const data = await response.json();
                setTemplates(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Не удалось загрузить шаблоны');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 4,
                }}
            >
                <Typography variant="h4" component="h2">
                    Список шаблонов
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Поиск..."
                    size="small"
                    sx={{ minWidth: 250 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TemplateListItem key={0} onClick={() => navigate('/template')} />
                </Grid>
                {templates.map((template) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
                        <TemplateListItem
                            title={template.name}
                            description={template.description ?? ""}
                            onClick={() => navigate(`/template/${template.id}`)} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TemplateList;