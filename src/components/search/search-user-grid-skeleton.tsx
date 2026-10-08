import { Box } from '@mui/material';

import { SearchUserCardSkeleton } from './search-user-card-skeleton';

interface SearchUserGridSkeletonProps {
    count?: number;
}

export const SearchUserGridSkeleton = ({
    count = 6,
}: SearchUserGridSkeletonProps) => (
    <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            width: '100%',
        }}
    >
        {Array.from({ length: count }).map((_, i) => (
            <SearchUserCardSkeleton key={i} />
        ))}
    </Box>
);
