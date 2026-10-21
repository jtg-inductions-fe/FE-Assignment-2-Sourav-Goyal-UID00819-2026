import {
    Avatar,
    Box,
    IconButton,
    Paper,
    styled,
    Typography,
} from '@mui/material';

export const CardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isClickable',
})<{ isClickable?: boolean }>(({ theme, isClickable }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
    cursor: isClickable ? 'pointer' : 'default',
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(64),
    height: theme.typography.pxToRem(64),
    border: `1px solid ${theme.palette.divider}`,
}));

export const CardPaper = styled(Paper)(({ theme }) => ({
    flex: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius * 2,
    minHeight: theme.typography.pxToRem(64),
    position: 'relative',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        '& .user-card-dismiss-btn': {
            opacity: 1,
            visibility: 'visible',
        },
    },
}));

export const UserName = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
}));

export const FollowButtonWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

export const DismissButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: -15,
    right: -15,
    opacity: 0,
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s',
    '&:hover': {
        opacity: 1,
    },
}));
