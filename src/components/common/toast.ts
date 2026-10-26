import type { AlertColor } from '@mui/material';

type ToastHandler = (message: string, severity?: AlertColor) => void;

let toastHandler: ToastHandler = () => {};

export function setToastHandler(handler: ToastHandler) {
    toastHandler = handler;
}

export function toast(message: string, severity: AlertColor = 'info') {
    toastHandler(message, severity);
}
