import type { AlertColor } from '@mui/material';

export type ToastHandler = (message: string, severity?: AlertColor) => void;
