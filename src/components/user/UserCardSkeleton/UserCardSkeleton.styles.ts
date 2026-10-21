import { Box, Skeleton, styled } from '@mui/material';

export const SkeletonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    width: '100%',
}));

export const AvatarSkeleton = styled(Skeleton)({
    flexShrink: 0,
});

export const CardBodySkeleton = styled(Skeleton)(({ theme }) => ({
    flex: 1,
    height: 64,
    borderRadius: theme.shape.borderRadius * 2,
}));
