import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import { useAppSelector } from '@/store/store';
import { GRADIENTS, SHADOWS } from '@constant';

function Home() {
    const user = useAppSelector((state) => state.user.user);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: { xs: 8, md: 12 },
                        width: '100%',
                    }}
                >
                    <Stack spacing={5} sx={{ flex: 1, maxWidth: { md: 580 } }}>
                        <Stack spacing={3}>
                            <Typography variant="h1">
                                Explore GitHub{' '}
                                <Box
                                    component="span"
                                    sx={{
                                        color: 'primary.main',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: { xs: 2, md: 4 },
                                            left: 0,
                                            width: '100%',
                                            height: { xs: '2px', md: '3px' },
                                            bgcolor: 'primary.main',
                                            borderRadius: 1,
                                            opacity: 0.4,
                                        },
                                    }}
                                >
                                    Profiles
                                </Box>{' '}
                                &amp; connections
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                Search any GitHub user, explore their public
                                profile, and discover their followers and
                                following, all in one place. Log in with your
                                Personal Access Token to unlock your own
                                profile.
                            </Typography>
                        </Stack>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                        >
                            <Button
                                component={RouterLink}
                                to="/search"
                                size="large"
                                color="primary"
                                sx={{
                                    fontWeight: 700,
                                    px: 7,
                                    py: 3,
                                    borderRadius: 2,
                                    boxShadow: SHADOWS.BUTTON_PRIMARY,
                                    '&:hover': {
                                        boxShadow: SHADOWS.BUTTON_PRIMARY_HOVER,
                                    },
                                }}
                            >
                                Search Users
                            </Button>

                            <Button
                                component={RouterLink}
                                to={user ? '/profile' : '/login'}
                                variant="outlined"
                                size="large"
                                color="primary"
                                sx={{
                                    fontWeight: 600,
                                    px: 7,
                                    py: 3,
                                    borderRadius: 2,
                                    bgcolor: 'common.white',
                                    backdropFilter: 'blur(6px)',
                                }}
                            >
                                {user ? 'My Profile' : 'Get Started'}
                            </Button>
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <Box
                            aria-hidden
                            sx={{
                                position: 'absolute',
                                width: { xs: 220, sm: 300, md: 380 },
                                height: { xs: 220, sm: 300, md: 380 },
                                borderRadius: '50%',
                                background: GRADIENTS.PRIMARY_RADIAL,
                                pointerEvents: 'none',
                            }}
                        />

                        <Box
                            component="img"
                            src="/images/home.webp"
                            alt="Github Services"
                            sx={{
                                width: { xs: 180, sm: 240, md: 320 },
                                height: { xs: 180, sm: 240, md: 320 },
                                objectFit: 'contain',
                                position: 'relative',
                                zIndex: 1,
                                filter: SHADOWS.HERO_IMAGE_DROP,
                                transition: 'transform 0.4s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}

export default Home;
