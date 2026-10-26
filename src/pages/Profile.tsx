import { Box, Container, Divider, Paper, Typography } from '@mui/material';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import Suggestions from '@/components/suggestions/Suggestions';
import { UserConnectionList } from '@/components/user/UserConnectionList';
import {
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
} from '@/services/github';
import { useAppSelector } from '@/store/store';

const MAX_CONNECTIONS = 9;

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
        <Container sx={{ py: 4 }}>
            <Typography variant="h1" gutterBottom fontWeight="bold">
                My Profile
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        lg: '3.5fr 1.5fr',
                    },
                    gap: 8,
                    minWidth: '100%',
                }}
            >
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
                <Suggestions />
            </Box>
        </Container>
    );
}

export default Profile;
