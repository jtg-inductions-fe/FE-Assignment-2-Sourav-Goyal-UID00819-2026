import CloseIcon from '@mui/icons-material/Close';
import { Link } from '@mui/material';

import * as S from './UserCard.styles';
import type { UserCardProps } from './UserCard.types';
import { FollowButton } from '../FollowButton';

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
    <S.CardContainer
        isClickable={!!onClick}
        onClick={() => onClick && onClick(user.login)}
    >
        <S.UserAvatar src={user.avatar_url} alt={user.login} />
        <S.CardPaper variant="outlined">
            <S.UserName>
                <Link
                    href={user.html_url}
                    target="_blank"
                    underline="hover"
                    onClick={(e) => e.stopPropagation()}
                >
                    {user.login}
                </Link>
            </S.UserName>

            <S.FollowButtonWrapper>
                {showFollowButton && onFollow && (
                    <FollowButton
                        onFollow={onFollow}
                        username={user.login}
                        isFollowing={isFollowing}
                        isFollowingLoading={isFollowingLoading}
                    />
                )}
            </S.FollowButtonWrapper>

            {showDismissButton && onDismiss && (
                <S.DismissButton
                    className="user-card-dismiss-btn"
                    size="large"
                    aria-label={`Dismiss ${user.login}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(user.id);
                    }}
                >
                    <CloseIcon fontSize="small" color="error" />
                </S.DismissButton>
            )}
        </S.CardPaper>
    </S.CardContainer>
);
