import { Button as MButton, ButtonProps as MButtonProps } from '@mui/material';

type ButtonProps = MButtonProps;

export const Button = ({ children, ...props }: ButtonProps) => (
    <MButton variant="contained" {...props}>
        {children}
    </MButton>
);
