import {
    Avatar,
    Box,
    CircularProgress,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

import type { UserConnection } from '@/types/user';

interface UserConnectionListProps {
    title: string;
    list?: UserConnection[];
    isLoading?: boolean;
}

export const UserConnectionList = ({
    title,
    list,
    isLoading,
}: UserConnectionListProps) => (
    <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
            {title}
        </Typography>
        {isLoading ? (
            <CircularProgress size={24} />
        ) : list && list.length > 0 ? (
            <List dense sx={{ padding: 0 }}>
                {list.map((conn) => (
                    <ListItem key={conn.id} disableGutters>
                        <ListItemAvatar>
                            <Avatar src={conn.avatar_url} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link
                                    href={conn.html_url}
                                    target="_blank"
                                    underline="hover"
                                >
                                    {conn.login}
                                </Link>
                            }
                            secondary={conn.type}
                        />
                    </ListItem>
                ))}
            </List>
        ) : (
            <Typography variant="body2" color="text.secondary">
                No {title.toLowerCase()} found.
            </Typography>
        )}
    </Box>
);
