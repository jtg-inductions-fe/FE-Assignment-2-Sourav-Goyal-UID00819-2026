import { Box } from '@mui/material';

import { NotFound } from '@/components/common/NotFound';

function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <NotFound
                title="Page Not Found"
                message="Oops! The page you are looking for does not exist. It might have been moved or deleted."
            />
        </Box>
    );
}

export default NotFoundPage;
