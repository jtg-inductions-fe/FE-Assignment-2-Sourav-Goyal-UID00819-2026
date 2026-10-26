import { Avatar, Box, Divider, styled, Typography } from '@mui/material';

export const ModalHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});

export const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

export const UserProfileHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
}));

export const ModalAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(80),
    height: theme.typography.pxToRem(80),
}));

export const UserName = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
}));

export const FullNameText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
}));

export const LocationText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export const BioText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(4),
    marginBottom: theme.spacing(2),
}));

export const ContactWrapper = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
}));

export const EmailText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

export const SectionDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
}));
