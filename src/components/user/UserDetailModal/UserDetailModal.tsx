import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Link,
    Typography,
} from '@mui/material';

import {
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
    useGetUserQuery,
} from '@/services/github';

import * as S from './UserDetailModal.styles';
import type { UserDetailModalProps } from './UserDetailModal.types';
import { UserConnectionList } from '../UserConnectionList';

const CONNECTIONS_PER_PAGE = 10;

export const UserDetailModal = ({
    open,
    onClose,
    username,
}: UserDetailModalProps) => {
    const { data: user, isLoading: isUserLoading } = useGetUserQuery(
        username ?? '',
        {
            skip: !username,
        },
    );

    const { data: followers, isLoading: isFollowersLoading } =
        useGetUserFollowersQuery(
            {
                username: username ?? '',
                page: 1,
                perPage: CONNECTIONS_PER_PAGE,
            },
            { skip: !username },
        );

    const { data: following, isLoading: isFollowingLoading } =
        useGetUserFollowingQuery(
            {
                username: username ?? '',
                page: 1,
                perPage: CONNECTIONS_PER_PAGE,
            },
            { skip: !username },
        );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="paper"
            maxWidth="sm"
            fullWidth
        >
            <S.ModalHeader>
                <DialogTitle>User Profile</DialogTitle>

                <DialogActions>
                    <Button onClick={onClose} color="inherit">
                        Close
                    </Button>
                </DialogActions>
            </S.ModalHeader>
            <DialogContent dividers>
                {isUserLoading ? (
                    <S.LoadingContainer>
                        <CircularProgress />
                    </S.LoadingContainer>
                ) : user ? (
                    <Box>
                        <S.UserProfileHeader>
                            <S.ModalAvatar src={user.avatar_url} />
                            <Box>
                                <S.UserName variant="h5">
                                    <Link
                                        href={user.html_url}
                                        target="_blank"
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {user.login}
                                    </Link>
                                </S.UserName>
                                {user.name && user.name !== user.login && (
                                    <S.FullNameText variant="body2">
                                        {user.name}
                                    </S.FullNameText>
                                )}
                            </Box>
                        </S.UserProfileHeader>

                        {user.location && (
                            <S.LocationText variant="body2">
                                {user.location}
                            </S.LocationText>
                        )}

                        {user.bio && (
                            <S.BioText variant="body1">{user.bio}</S.BioText>
                        )}

                        <S.StatsContainer>
                            <Typography variant="body2">
                                <strong>{user.followers}</strong> Followers
                            </Typography>
                            <Typography variant="body2">
                                <strong>{user.following}</strong> Following
                            </Typography>
                        </S.StatsContainer>

                        <S.ContactWrapper>
                            {user.email && (
                                <S.EmailText variant="body2">
                                    <Link href={user.email}>{user.email}</Link>
                                </S.EmailText>
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
                        </S.ContactWrapper>

                        <Divider />

                        <UserConnectionList
                            title="Followers"
                            list={followers}
                            isLoading={isFollowersLoading}
                        />

                        <S.SectionDivider />

                        <UserConnectionList
                            title="Following"
                            list={following}
                            isLoading={isFollowingLoading}
                        />
                    </Box>
                ) : (
                    <S.ErrorText>Failed to load user details.</S.ErrorText>
                )}
            </DialogContent>
        </Dialog>
    );
};
