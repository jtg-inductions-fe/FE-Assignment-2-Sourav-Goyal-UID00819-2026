import { useForm } from 'react-hook-form';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import * as S from './LoginForm.styles';
import type { LoginFormInputs, LoginFormProps } from './LoginForm.types';

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<LoginFormInputs>({
        mode: 'onChange',
    });

    return (
        <>
            <S.FormSubtitle variant="h5" fontWeight="bold">
                Please enter your credentials to login
            </S.FormSubtitle>

            <Box
                component="form"
                onSubmit={(e) => {
                    void handleSubmit(onSubmit)(e);
                }}
            >
                <Stack spacing={4}>
                    <TextField
                        id="github-username"
                        label="GitHub Username"
                        placeholder="Enter your username here"
                        {...register('username', {
                            required: 'GitHub Username is required',
                            maxLength: {
                                value: 39,
                                message: 'Username cannot exceed 39 characters',
                            },
                            pattern: {
                                value: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
                                message: 'Invalid GitHub Username format',
                            },
                            validate: {
                                noMultipleHyphens: (val) =>
                                    !val.includes('--') ||
                                    'Cannot contain consecutive hyphens',
                            },
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        fullWidth
                        required
                    />
                    <Typography />
                    <TextField
                        id="github-pat"
                        label="Personal Access Token (PAT)"
                        placeholder="Paste your GitHub PAT here"
                        type="password"
                        {...register('pat', {
                            required: 'Personal Access Token is required',
                            minLength: {
                                value: 40,
                                message:
                                    'PAT must be at least 40 characters long',
                            },
                            pattern: {
                                value: /^(gh[pousr]_|github_pat_)/,
                                message:
                                    'Invalid PAT format (should start with ghp_, github_pat_, etc.)',
                            },
                        })}
                        error={!!errors.pat}
                        helperText={errors.pat?.message}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        size="large"
                        fullWidth
                        disabled={!isValid || !isDirty || isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </Stack>
            </Box>
        </>
    );
};
