import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import App from '@/App';
import AuthMiddleware from '@/components/common/AuthMiddleware';
import { store } from '@/store/store';
import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthMiddleware>
                <App />
            </AuthMiddleware>
        </ThemeProvider>
    </Provider>,
);
