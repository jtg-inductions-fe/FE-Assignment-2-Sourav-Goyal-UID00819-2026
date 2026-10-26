import {
    Avatar,
    CircularProgress,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

import * as S from './UserConnectionList.styles';
import type { UserConnectionListProps } from './UserConnectionList.types';

export const UserConnectionList = ({
    title,
    list,
    isLoading,
}: UserConnectionListProps) => (
    <S.ConnectionListContainer>
        <Typography variant="h6" gutterBottom>
            {title}
        </Typography>
        {isLoading ? (
            <CircularProgress size={24} />
        ) : list && list.length > 0 ? (
            <S.StyledList dense>
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
                                    rel="noopener noreferrer"
                                >
                                    {conn.login}
                                </Link>
                            }
                            secondary={conn.type}
                        />
                    </ListItem>
                ))}
            </S.StyledList>
        ) : (
            <S.EmptyMessage variant="body2">
                No {title.toLowerCase()} found.
            </S.EmptyMessage>
        )}
    </S.ConnectionListContainer>
);
