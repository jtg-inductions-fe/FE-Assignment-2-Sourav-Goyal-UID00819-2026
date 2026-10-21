import { Link as RouterLink } from 'react-router-dom';

import { Typography } from '@mui/material';

import { useAppSelector } from '@/store/store';

import * as S from './HomeContainer.styles';

export function HomeContainer() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <S.StyledHomeContainer>
            <S.CenteredLayout>
                <S.HeroContent>
                    <S.HeroTextSection>
                        <S.HeroHeadingGroup>
                            <Typography variant="h1">
                                Explore GitHub{' '}
                                <S.HighlightedText>Profiles</S.HighlightedText>{' '}
                                &amp; connections
                            </Typography>

                            <S.HeroSubtitle variant="body1">
                                Search any GitHub user, explore their public
                                profile, and discover their followers and
                                following, all in one place. Log in with your
                                Personal Access Token to unlock your own
                                profile.
                            </S.HeroSubtitle>
                        </S.HeroHeadingGroup>

                        <S.ActionButtonGroup>
                            <S.PrimaryActionButton
                                component={RouterLink}
                                to="/search"
                                size="large"
                            >
                                Search Users
                            </S.PrimaryActionButton>

                            <S.SecondaryActionButton
                                component={RouterLink}
                                to={user ? '/profile' : '/login'}
                                variant="outlined"
                                size="large"
                            >
                                {user ? 'My Profile' : 'Get Started'}
                            </S.SecondaryActionButton>
                        </S.ActionButtonGroup>
                    </S.HeroTextSection>

                    <S.HeroVisualWrapper>
                        <S.GlowEffect aria-hidden />
                        <S.HeroImage
                            src="/images/home.webp"
                            alt="Github Services"
                        />
                    </S.HeroVisualWrapper>
                </S.HeroContent>
            </S.CenteredLayout>
        </S.StyledHomeContainer>
    );
}
