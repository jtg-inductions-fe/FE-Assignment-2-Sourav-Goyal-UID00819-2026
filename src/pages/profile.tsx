import { Box, Container, Divider, Paper, Typography } from '@mui/material';

import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileInfo } from '@/components/profile/profile-info';
import { UserConnectionList } from '@/components/user/user-connection-list';
import {
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
} from '@/services/github';
import { useAppSelector } from '@/store/store';

const MAX_CONNECTIONS = 10;

function Profile() {
    const user = useAppSelector((state) => state.user.user);

    const { data: followers, isLoading: isFollowersLoading } =
        useGetUserFollowersQuery(
            {
                username: user?.login ?? '',
                page: 1,
                perPage: MAX_CONNECTIONS,
            },
            { skip: !user?.login },
        );

    const { data: following, isLoading: isFollowingLoading } =
        useGetUserFollowingQuery(
            {
                username: user?.login ?? '',
                page: 1,
                perPage: MAX_CONNECTIONS,
            },
            { skip: !user?.login },
        );

    if (!user) {
        return (
            <Container>
                <Typography color="error" mt={4} variant="h6" align="center">
                    No user logged in. Please log in first.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h1" gutterBottom fontWeight="bold">
                My Profile
            </Typography>
            <Paper
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                <ProfileHeader user={user} />
                <ProfileInfo user={user} />

                <Divider sx={{ my: 4 }} />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)',
                        },
                        gap: 4,
                    }}
                >
                    <UserConnectionList
                        title="Followers"
                        list={followers}
                        isLoading={isFollowersLoading}
                    />

                    <UserConnectionList
                        title="Following"
                        list={following}
                        isLoading={isFollowingLoading}
                    />
                </Box>
            </Paper>
        </Container>
    );
}

export default Profile;
