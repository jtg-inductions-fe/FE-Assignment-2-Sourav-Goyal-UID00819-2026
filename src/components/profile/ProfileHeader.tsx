import { Avatar, Box, Link, Typography } from '@mui/material';

import type { UserDetail } from '@/types/user';

export const ProfileHeader = ({ user }: { user: UserDetail }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar src={user.avatar_url} sx={{ width: 100, height: 100 }} />
        <Box>
            <Typography variant="h4" fontWeight="bold">
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
                <Typography variant="body1" color="text.secondary">
                    {user.location}
                </Typography>
            )}
        </Box>
    </Box>
);
