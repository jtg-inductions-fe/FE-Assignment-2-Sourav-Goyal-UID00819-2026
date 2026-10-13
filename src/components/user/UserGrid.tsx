import { Box, Button, Stack } from '@mui/material';

import { UserCard, UserCardData } from './UserCard';

export interface UserGridProps {
    users: UserCardData[];
    onUserClick?: (username: string) => void;
    followMap?: Record<string, boolean>;
    followLoadingMap?: Record<string, boolean>;
    isFollowLoading?: boolean;
    loggedInUser?: string;
    onFollow?: (username: string) => Promise<void>;
    showDismissButton?: boolean;
    onDismiss?: (id: number) => void;
    showRefreshButton?: boolean;
    onRefresh?: () => void;
}

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
}: UserGridProps) => (
    <Stack>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >
            {showRefreshButton && onRefresh && (
                <Button
                    onClick={onRefresh}
                    variant="text"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                >
                    Refresh
                </Button>
            )}
        </Box>
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
                width: '100%',
            }}
        >
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
        </Box>
    </Stack>
);
