import { useEffect, useState } from 'react';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Slide,
    Snackbar,
    Typography,
} from '@mui/material';

export interface FollowButtonProps {
    username: string;
    isFollowing: boolean;
    isFollowingLoading: boolean;
    onFollow: (username: string) => Promise<void>;
}

export const FollowButton = ({
    username,
    isFollowing,
    isFollowingLoading,
    onFollow,
}: FollowButtonProps) => {
    const [isMutating, setIsMutating] = useState(false);
    const [justFollowed, setJustFollowed] = useState(false);

    const [toast, setToast] = useState<{
        message: string;
        severity: 'error' | 'success' | 'info';
    }>({ message: '', severity: 'info' });

    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {
        setJustFollowed(false);
    }, [username]);

    const handleFollowClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMutating || isFollowing || justFollowed) return;

        setToastOpen(false);

        try {
            setIsMutating(true);
            await onFollow(username);
            setJustFollowed(true);
        } catch {
            setToast({
                message: `Failed to follow ${username}. Please try again.`,
                severity: 'error',
            });
            setToastOpen(true);
        } finally {
            setIsMutating(false);
        }
    };

    const hasFollowed = isFollowing || justFollowed;

    return (
        <Box
            onClick={(e) => e.stopPropagation()}
            sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
        >
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

            {isMutating ? (
                <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{ p: 1.5 }}
                >
                    <CircularProgress size={16} color="inherit" />
                </Button>
            ) : hasFollowed ? (
                <Typography variant="body2" color="primary">
                    Following
                </Typography>
            ) : isFollowingLoading ? (
                <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{ py: 1.5 }}
                >
                    <CircularProgress size={16} color="inherit" />
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                        void handleFollowClick(e);
                    }}
                >
                    Follow
                </Button>
            )}
        </Box>
    );
};
