import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Link,
    Typography,
} from '@mui/material';

import {
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
    useGetUserQuery,
} from '@/services/github';

import { UserConnectionList } from './user-connection-list';

const CONNECTIONS_PER_PAGE = 10;

interface UserDetailModalProps {
    open: boolean;
    onClose: () => void;
    username: string | null;
}

export const UserDetailModal = ({
    open,
    onClose,
    username,
}: UserDetailModalProps) => {
    const { data: user, isLoading: isUserLoading } = useGetUserQuery(
        username ?? '',
        {
            skip: !username,
        },
    );

    const { data: followers, isLoading: isFollowersLoading } =
        useGetUserFollowersQuery(
            {
                username: username ?? '',
                page: 1,
                perPage: CONNECTIONS_PER_PAGE,
            },
            { skip: !username },
        );

    const { data: following, isLoading: isFollowingLoading } =
        useGetUserFollowingQuery(
            {
                username: username ?? '',
                page: 1,
                perPage: CONNECTIONS_PER_PAGE,
            },
            { skip: !username },
        );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="paper"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>User Profile</DialogTitle>
            <DialogContent dividers>
                {isUserLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            py: 4,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : user ? (
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <Avatar
                                src={user.avatar_url}
                                sx={{ width: 80, height: 80 }}
                            />
                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    <Link
                                        href={user.html_url}
                                        target="_blank"
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {user.login}
                                    </Link>
                                </Typography>
                                {user.location && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {user.location}
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        {user.bio && (
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {user.bio}
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                            <Typography variant="body2">
                                <strong>{user.followers}</strong> Followers
                            </Typography>
                            <Typography variant="body2">
                                <strong>{user.following}</strong> Following
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            {user.email && (
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <Link href={user.email}>{user.email}</Link>
                                </Typography>
                            )}
                            {user.blog && (
                                <Typography variant="body2">
                                    <Link href={user.blog} target="_blank">
                                        {user.blog}
                                    </Link>
                                </Typography>
                            )}
                        </Box>

                        <Divider />

                        <UserConnectionList
                            title="Followers"
                            list={followers}
                            isLoading={isFollowersLoading}
                        />

                        <Divider sx={{ my: 2 }} />

                        <UserConnectionList
                            title="Following"
                            list={following}
                            isLoading={isFollowingLoading}
                        />
                    </Box>
                ) : (
                    <Typography color="error">
                        Failed to load user details.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
