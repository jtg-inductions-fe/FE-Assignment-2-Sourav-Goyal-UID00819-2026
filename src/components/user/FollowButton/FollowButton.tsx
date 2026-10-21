import { useEffect, useState } from 'react';

import { Button, CircularProgress } from '@mui/material';

import * as S from './FollowButton.styles';
import type { FollowButtonProps } from './FollowButton.types';

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
                <S.FollowActionButton variant="outlined" size="small" disabled>
                    <CircularProgress size={16} color="inherit" />
                </S.FollowActionButton>
            );
        }

        if (hasFollowed) {
            return <S.FollowingText variant="body2">Following</S.FollowingText>;
        }

        if (isFollowingLoading) {
            return (
                <S.LoadingFollowButton variant="outlined" size="small" disabled>
                    <CircularProgress size={16} color="inherit" />
                </S.LoadingFollowButton>
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
        <S.FollowButtonContainer onClick={(e) => e.stopPropagation()}>
            {renderButton()}
        </S.FollowButtonContainer>
    );
};
