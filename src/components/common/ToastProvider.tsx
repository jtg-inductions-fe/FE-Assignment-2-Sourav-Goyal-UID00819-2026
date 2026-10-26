import React, { useEffect, useState } from 'react';

import { Alert, AlertColor, Slide, Snackbar } from '@mui/material';

import { setToastHandler } from './toast';

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    useEffect(() => {
        setToastHandler((msg: string, sev: AlertColor = 'info') => {
            setMessage(msg);
            setSeverity(sev);
            setOpen(true);
        });
    }, []);

    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={Slide}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}
