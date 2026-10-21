import { useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

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

    useEffect(() => {
        setJustFollowed(false);
    }, [username]);

    const handleFollowClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMutating || isFollowing || justFollowed) return;

        try {
            setIsMutating(true);
            await onFollow(username);
            setJustFollowed(true);
        } catch {
        } finally {
            setIsMutating(false);
        }
    };

    const hasFollowed = isFollowing || justFollowed;

    const renderButton = () => {
        if (isMutating) {
            return (
                <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{ p: 1.5 }}
                >
                    <CircularProgress size={16} color="inherit" />
                </Button>
            );
        }

        if (hasFollowed) {
            return (
                <Typography variant="body2" color="primary">
                    Following
                </Typography>
            );
        }

        if (isFollowingLoading) {
            return (
                <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{ py: 1.5 }}
                >
                    <CircularProgress size={16} color="inherit" />
                </Button>
            );
        }

        return (
            <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                    void handleFollowClick(e);
                }}
            >
                Follow
            </Button>
        );
    };

    return (
        <Box
            onClick={(e) => e.stopPropagation()}
            sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
        >
            {renderButton()}
        </Box>
    );
};
