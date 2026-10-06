import { TextField, TextFieldProps } from '@mui/material';

type InputProps = TextFieldProps;

export const Input = (props: InputProps) => (
    <TextField variant="outlined" {...props} />
);
