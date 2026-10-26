import { Box } from '@mui/material';

import type { SearchUser } from '@/types/search';

import { SearchUserCard } from './SearchUserCard';

interface SearchUserGridProps {
    users: SearchUser[];
    onUserClick?: (username: string) => void;
    followMap?: Record<string, boolean>;
    isFollowLoading?: boolean;
    loggedInUsername?: string;
    onFollow?: (username: string) => Promise<void>;
}

export const SearchUserGrid = ({
    users,
    onUserClick,
    followMap,
    isFollowLoading = false,
    loggedInUsername,
    onFollow,
}: SearchUserGridProps) => (
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
                loggedInUsername?.toLowerCase() === user.login.toLowerCase();

            const showFollowButton = !!loggedInUsername && !isSelf;

            const isFollowing = !!followMap?.[user.login];

            const isStatusLoading = !followMap && isFollowLoading;

            return (
                <SearchUserCard
                    key={user.id}
                    user={user}
                    onClick={onUserClick}
                    showFollowButton={showFollowButton}
                    isFollowing={isFollowing}
                    isFollowingLoading={isStatusLoading}
                    onFollow={onFollow}
                />
            );
        })}
    </Box>
);
