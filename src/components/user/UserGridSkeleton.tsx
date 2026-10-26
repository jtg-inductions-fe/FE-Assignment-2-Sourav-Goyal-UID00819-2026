import { Box } from '@mui/material';

import { UserCardSkeleton } from './UserCardSkeleton';

export interface UserGridSkeletonProps {
    count?: number;
}

export const UserGridSkeleton = ({ count = 6 }: UserGridSkeletonProps) => (
    <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            width: '100%',
        }}
    >
        {Array.from({ length: count }).map((_, i) => (
            <UserCardSkeleton key={i} />
        ))}
    </Box>
);
