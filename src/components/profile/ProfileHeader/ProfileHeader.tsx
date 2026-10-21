import { Box, Link } from '@mui/material';

import * as S from './ProfileHeader.styles';
import type { ProfileHeaderProps } from './ProfileHeader.types';

export const ProfileHeader = ({ user }: ProfileHeaderProps) => (
    <S.HeaderContainer>
        <S.ProfileAvatar src={user.avatar_url} />
        <Box>
            <S.ProfileTitle variant="h4">
                <Link
                    href={user.html_url}
                    target="_blank"
                    color="inherit"
                    underline="hover"
                >
                    {user.login}
                </Link>
            </S.ProfileTitle>
            {user.location && (
                <S.LocationText variant="body1">{user.location}</S.LocationText>
            )}
        </Box>
    </S.HeaderContainer>
);
