import { useNavigate } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

import { toast } from '@/components/common/toast';
import { LoginForm, type LoginFormInputs } from '@/components/login/LoginForm';
import { useLazyGetAuthenticatedUserQuery } from '@/services/github';
import { clearUser, setUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [getAuthUser] = useLazyGetAuthenticatedUserQuery();

    const handleLoginSubmit = async (data: LoginFormInputs) => {
        localStorage.setItem('pat_token', data.pat);

        try {
            const response = await getAuthUser().unwrap();

            if (response.login.toLowerCase() === data.username.toLowerCase()) {
                dispatch(setUser(response));
                toast('Login successful! Redirecting...', 'success');
                localStorage.setItem('token', data.pat);
                await navigate('/profile');
            } else {
                toast(
                    'The provided PAT does not match the entered github username.',
                    'error',
                );
                localStorage.removeItem('pat_token');
                dispatch(clearUser());
            }
        } catch (error) {
            const err = error as FetchBaseQueryError;

            if (err.status === 401) {
                toast(
                    'Failed to authenticate. Please check your PAT and try again.',
                    'error',
                );
            }

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

                    <LoginForm onSubmit={handleLoginSubmit} />
                </Box>
            </Container>
        </Box>
    );
}

export default Login;
