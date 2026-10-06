import {
    Container as MContainer,
    ContainerProps as MContainerProps,
} from '@mui/material';

type ContainerProps = MContainerProps;

export const Container = ({ children, sx, ...props }: ContainerProps) => (
    <MContainer
        maxWidth="lg"
        sx={{
            py: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            ...sx,
        }}
        {...props}
    >
        {children}
    </MContainer>
);
