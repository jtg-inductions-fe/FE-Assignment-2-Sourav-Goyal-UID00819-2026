import { Stack } from '@mui/material';

import * as S from './UserGrid.styles';
import type { UserGridProps } from './UserGrid.types';
import { UserCard } from '../UserCard';

export const UserGrid = ({
    users,
    onUserClick,
    followMap,
    followLoadingMap,
    isFollowLoading = false,
    loggedInUser,
    onFollow,
    showDismissButton = false,
    onDismiss,
    showRefreshButton,
    onRefresh,
    shouldColumnWise = false,
}: UserGridProps) => (
    <Stack>
        <S.ActionsContainer>
            {showRefreshButton && onRefresh && (
                <S.RefreshButton
                    onClick={onRefresh}
                    variant="text"
                    color="primary"
                >
                    Refresh
                </S.RefreshButton>
            )}
        </S.ActionsContainer>
        <S.GridContainer shouldColumnWise={shouldColumnWise}>
            {users.map((user) => {
                const isSelf =
                    loggedInUser?.toLowerCase() === user.login.toLowerCase();

                const showFollowButton = !!loggedInUser && !isSelf;

                const isFollowing = !!followMap?.[user.login];

                const isStatusLoading =
                    followLoadingMap?.[user.login] ??
                    (!followMap && isFollowLoading);

                return (
                    <UserCard
                        key={user.id}
                        user={user}
                        onClick={onUserClick}
                        showFollowButton={showFollowButton}
                        isFollowing={isFollowing}
                        isFollowingLoading={isStatusLoading}
                        onFollow={onFollow}
                        showDismissButton={showDismissButton}
                        onDismiss={onDismiss}
                    />
                );
            })}
        </S.GridContainer>
    </Stack>
);
