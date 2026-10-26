import { Typography } from '@mui/material';

import { NotFoundContainer, NotFoundImage } from './NotFound.styles';
import type { NotFoundProps } from './NotFound.types';

export const NotFound = ({
    title = 'Not Found',
    message = 'We could not find what you were looking for.',
}: NotFoundProps) => (
    <NotFoundContainer>
        <NotFoundImage src="/images/not-found.svg" alt="Not Found" />
        <Typography variant="h5" gutterBottom>
            {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" gutterBottom>
            {message}
        </Typography>
    </NotFoundContainer>
);
