import { FC, MouseEventHandler } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
} from '@mui/material';
import { Description } from '@mui/icons-material';

interface TemplateListItemProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    title?: string;
    description?: string;
}

const TemplateListItem: FC<TemplateListItemProps> = ({
    onClick,
    title = `Личная карточка работника`,
    description = "Унифицированная форма Т-2",
}) => {
    return (
        <Card onClick={onClick}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                },
            }}
        >
            <CardActionArea
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'flex-start'
                }}
            >
                <CardContent sx={{ width: '100%' }}>
                    <Box display="flex" mb={1}>
                        <Description color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" lineHeight="1.2" minHeight="2.4em" overflow="hidden" textOverflow="ellipsis">
                            {title}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default TemplateListItem;