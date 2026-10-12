import { Box, Skeleton } from '@mui/material';

export const SearchUserCardSkeleton = () => (
    <Box
        sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            width: '100%',
        }}
    >
        <Skeleton
            variant="circular"
            width={64}
            height={64}
            sx={{ flexShrink: 0 }}
        />
        <Skeleton
            variant="rounded"
            sx={{
                flex: 1,
                height: 64,
                borderRadius: 2,
            }}
        />
    </Box>
);
