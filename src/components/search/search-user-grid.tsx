import { Box } from '@mui/material';

import type { SearchUser } from '@/types/search';

import { SearchUserCard } from './search-user-card';

interface SearchUserGridProps {
    users: SearchUser[];
    onUserClick?: (username: string) => void;
}

export const SearchUserGrid = ({ users, onUserClick }: SearchUserGridProps) => (
    <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            width: '100%',
        }}
    >
        {users.map((user) => (
            <SearchUserCard key={user.id} user={user} onClick={onUserClick} />
        ))}
    </Box>
);
