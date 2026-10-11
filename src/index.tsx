import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from '@/app';
import AuthMiddleware from '@/components/common/auth-middleware';
import { store } from '@/store/store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthMiddleware>
                    <App />
                </AuthMiddleware>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
