import { Box, Link, Typography } from '@mui/material';

import * as S from './ProfileInfo.styles';
import type { ProfileInfoProps } from './ProfileInfo.types';

export const ProfileInfo = ({ user }: ProfileInfoProps) => (
    <Box>
        {user.bio && <S.BioText variant="body1">{user.bio}</S.BioText>}

        <S.StatsContainer>
            <Typography variant="body1">
                <strong>{user.followers}</strong> Followers
            </Typography>
            <Typography variant="body1">
                <strong>{user.following}</strong> Following
            </Typography>
        </S.StatsContainer>

        <Box>
            {user.email && (
                <S.EmailText variant="body2">
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
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
        </Box>
    </Box>
);
