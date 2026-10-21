import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

import App from '@/App';
import AuthMiddleware from '@/components/common/AuthMiddleware';
import { ToastProvider } from '@/components/common/ToastProvider';
import { store } from '@/store/store';
import { COLORS } from '@constant';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ToastProvider>
                    <CssBaseline />
                    <GlobalStyles
                        styles={{
                            body: {
                                paddingTop: 64,
                                background: COLORS.BACKGROUND.GRADIENT,
                                minHeight: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                            },
                            '#root': {
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                            },
                        }}
                    />
                    <AuthMiddleware>
                        <App />
                    </AuthMiddleware>
                </ToastProvider>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
