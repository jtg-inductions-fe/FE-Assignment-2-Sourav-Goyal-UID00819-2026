import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Alert,
    Box,
    Container,
    Slide,
    Snackbar,
    Typography,
} from '@mui/material';

import { LoginForm, type LoginFormInputs } from '@/components/login/LoginForm';
import { useLazyGetAuthenticatedUserQuery } from '@/services/github';
import { clearUser, setUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [getAuthUser] = useLazyGetAuthenticatedUserQuery();

    const [toast, setToast] = useState<{
        message: string;
        severity: 'error' | 'success' | 'info';
    }>({ message: '', severity: 'info' });

    const [toastOpen, setToastOpen] = useState(false);

    const handleLoginSubmit = async (data: LoginFormInputs) => {
        setToastOpen(false);

        localStorage.setItem('pat_token', data.pat);

        try {
            const response = await getAuthUser().unwrap();

            if (response.login.toLowerCase() === data.username.toLowerCase()) {
                dispatch(setUser(response));
                setToast({
                    message: 'Login successful! Redirecting...',
                    severity: 'success',
                });
                setToastOpen(true);
                localStorage.setItem('token', data.pat);
                await navigate('/profile');
            } else {
                setToast({
                    message:
                        'The provided PAT does not match the entered github username.',
                    severity: 'error',
                });
                setToastOpen(true);
                localStorage.removeItem('pat_token');
                dispatch(clearUser());
            }
        } catch {
            setToast({
                message:
                    'Failed to authenticate. Please check your PAT and try again.',
                severity: 'error',
            });
            setToastOpen(true);
            localStorage.removeItem('pat_token');
            dispatch(clearUser());
        }
    };

    return (
        <Box>
            <Container>
                <Typography variant="h1" gutterBottom>
                    Login Page
                </Typography>
                <Box
                    sx={{
                        maxWidth: 'sm',
                        margin: '0 auto',
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 4,
                            textTransform: 'capitalize',
                        }}
                    >
                        Please enter your credentials to login
                    </Typography>

                    <Snackbar
                        open={toastOpen}
                        autoHideDuration={2500}
                        onClose={() => setToastOpen(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        TransitionComponent={Slide}
                    >
                        <Alert
                            onClose={() => setToastOpen(false)}
                            severity={toast.severity}
                            sx={{ width: '100%' }}
                        >
                            {toast.message}
                        </Alert>
                    </Snackbar>

                    <LoginForm onSubmit={handleLoginSubmit} />
                </Box>
            </Container>
        </Box>
    );
}

export default Login;
