import CloseIcon from '@mui/icons-material/Close';
import {
    Avatar,
    Box,
    IconButton,
    Link,
    Paper,
    Typography,
} from '@mui/material';

import { FollowButton } from './FollowButton';

export interface UserCardData {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface UserCardProps {
    user: UserCardData;
    onClick?: (username: string) => void;
    isFollowing?: boolean;
    showFollowButton?: boolean;
    isFollowingLoading?: boolean;
    onFollow?: (username: string) => Promise<void>;
    showDismissButton?: boolean;
    onDismiss?: (id: number) => void;
}

export const UserCard = ({
    user,
    onClick,
    showFollowButton = false,
    isFollowing = false,
    isFollowingLoading = false,
    onFollow,
    showDismissButton = false,
    onDismiss,
}: UserCardProps) => (
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
                position: 'relative',
                '&:hover': {
                    bgcolor: 'action.hover',
                    '& .user-card-dismiss-btn': {
                        opacity: 1,
                        visibility: 'visible',
                    },
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

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {showFollowButton && onFollow && (
                    <FollowButton
                        onFollow={onFollow}
                        username={user.login}
                        isFollowing={isFollowing}
                        isFollowingLoading={isFollowingLoading}
                    />
                )}
            </Box>

            {showDismissButton && onDismiss && (
                <IconButton
                    className="user-card-dismiss-btn"
                    size="large"
                    aria-label={`Dismiss ${user.login}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(user.id);
                    }}
                    sx={{
                        position: 'absolute',
                        top: -15,
                        right: -15,
                        opacity: 0,
                        p: 2,
                        background: 'white',
                        border: 1,
                        transition: 'all 0.2s ',
                        '&:hover': {
                            opacity: 1,
                        },
                    }}
                >
                    <CloseIcon fontSize="small" color="error" />
                </IconButton>
            )}
        </Paper>
    </Box>
);
