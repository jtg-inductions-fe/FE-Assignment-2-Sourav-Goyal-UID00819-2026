import { Box, Typography } from '@mui/material';

function Error() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Box
                component="img"
                src="/images/page-eaten.svg"
                alt="Not Found"
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    mb: 4,
                }}
            />
            <Typography variant="h4" sx={{ my: 6 }}>
                Oops! Something Went Wrong
            </Typography>

            <Typography variant="body1" color="text.secondary">
                Brace yourself till we get the error fixed.
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
                You may also refresh the page or try again later.
            </Typography>
        </Box>
    );
}

export default Error;
