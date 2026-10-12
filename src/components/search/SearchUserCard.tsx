import { Avatar, Box, Link, Paper, Typography } from '@mui/material';

import type { SearchUser } from '@/types/search';

import { FollowButton } from './FollowButton';

type SearchUserCardProps = {
    user: SearchUser;
    onClick?: (username: string) => void;
    isFollowing?: boolean;
    showFollowButton?: boolean;
    isFollowingLoading?: boolean;
    onFollow?: (username: string) => Promise<void>;
};

export const SearchUserCard = ({
    user,
    onClick,
    showFollowButton = false,
    isFollowing = false,
    isFollowingLoading = false,
    onFollow,
}: SearchUserCardProps) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={() => onClick && onClick(user.login)}
    >
        <Avatar
            src={user.avatar_url}
            alt={user.login}
            sx={{
                width: 64,
                height: 64,
                border: 1,
            }}
        />
        <Paper
            variant="outlined"
            sx={{
                flex: 1,
                py: 2,
                px: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 2,
                minHeight: 64,
                '&:hover': {
                    bgcolor: 'action.hover',
                },
            }}
        >
            <Typography fontWeight="bold">
                <Link
                    href={user.html_url}
                    target="_blank"
                    underline="hover"
                    onClick={(e) => e.stopPropagation()}
                >
                    {user.login}
                </Link>
            </Typography>

            {showFollowButton && onFollow && (
                <FollowButton
                    onFollow={onFollow}
                    username={user.login}
                    isFollowing={isFollowing}
                    isFollowingLoading={isFollowingLoading}
                />
            )}
        </Paper>
    </Box>
);
