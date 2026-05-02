import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { EditDocument } from '@mui/icons-material';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    useMediaQuery,
    useTheme,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <EditDocument sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 500 }}>
                        EasyDocs
                    </Typography>
                </Box>

                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" sx={{ textTransform: 'none' }} onClick={() => navigate('/')}>
                            Список шаблонов
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ textTransform: 'none' }}
                        >
                            Регистрация
                        </Button>
                    </Box>
                )}

                {isMobile && (
                    <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => {
                                handleMenuClose();
                                navigate('/');
                            }}
                            >Список шаблонов</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Регистрация</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar >
    );
};

export default Header;