import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import {
    Container,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Grid,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import TemplateListItem from './TemplateListItem';

const TemplateList: FC = () => {
    const navigate = useNavigate();

    const templates = Array(9).fill({});

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
                {templates.map((_, index) => (
                    <Grid size={4}>
                        <TemplateListItem onClick={() => navigate('/template')} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TemplateList;