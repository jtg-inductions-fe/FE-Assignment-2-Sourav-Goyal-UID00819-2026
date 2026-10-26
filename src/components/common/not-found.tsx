import { Box, Typography } from '@mui/material';

interface NotFoundProps {
    title?: string;
    message?: string;
}

export const NotFound = ({
    title = 'Not Found',
    message = 'We could not find what you were looking for.',
}: NotFoundProps) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 8,
            px: 2,
            width: '100%',
        }}
    >
        <Box
            component="img"
            src="/images/not-found.svg"
            alt="Not Found"
            sx={{
                width: '100%',
                maxWidth: 400,
                mb: 4,
            }}
        />
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
            {message}
        </Typography>
    </Box>
);
