import { Box, Link, Typography } from '@mui/material';

import type { UserDetail } from '@/types/user';

export const ProfileInfo = ({ user }: { user: UserDetail }) => (
    <Box>
        {user.bio && (
            <Typography variant="body1" sx={{ mb: 3 }}>
                {user.bio}
            </Typography>
        )}

        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
            <Typography variant="body1">
                <strong>{user.followers}</strong> Followers
            </Typography>
            <Typography variant="body1">
                <strong>{user.following}</strong> Following
            </Typography>
        </Box>

        <Box>
            {user.email && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
                </Typography>
            )}
            {user.blog && (
                <Typography variant="body2">
                    <Link
                        href={
                            user.blog.startsWith('http')
                                ? user.blog
                                : `https://${user.blog}`
                        }
                        target="_blank"
                    >
                        {user.blog}
                    </Link>
                </Typography>
            )}
        </Box>
    </Box>
);
