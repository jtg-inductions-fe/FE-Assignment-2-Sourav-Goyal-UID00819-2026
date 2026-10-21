import type { AlertColor } from '@mui/material';

import type { ToastHandler } from './toast.types';

let toastHandler: ToastHandler = () => {};

export function setToastHandler(handler: ToastHandler) {
    toastHandler = handler;
}

export function toast(message: string, severity: AlertColor = 'info') {
    toastHandler(message, severity);
}
