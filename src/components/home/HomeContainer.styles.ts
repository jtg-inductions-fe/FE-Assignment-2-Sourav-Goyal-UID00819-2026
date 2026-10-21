import type { ElementType } from 'react';

import type { ButtonProps } from '@mui/material';
import { Box, Button, Container, styled, Typography } from '@mui/material';

import { GRADIENTS, SHADOWS } from '@constant';

const HERO_METRICS = {
    MAX_TEXT_WIDTH: 580,
    UNDERLINE: {
        OFFSET_XS: 2,
        OFFSET_MD: 4,
        HEIGHT_XS: 2,
        HEIGHT_MD: 3,
        OPACITY: 0.4,
    },
    GLOW_SIZE: {
        XS: 220,
        SM: 300,
        MD: 380,
    },
    IMAGE_SIZE: {
        XS: 180,
        SM: 240,
        MD: 320,
    },
    IMAGE_HOVER_SCALE: 1.05,
    BACKDROP_BLUR: '6px',
} as const;

export const HighlightedText = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: theme.typography.pxToRem(HERO_METRICS.UNDERLINE.OFFSET_XS),
        left: 0,
        width: '100%',
        height: theme.typography.pxToRem(HERO_METRICS.UNDERLINE.HEIGHT_XS),
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        opacity: HERO_METRICS.UNDERLINE.OPACITY,
        [theme.breakpoints.up('md')]: {
            bottom: theme.typography.pxToRem(HERO_METRICS.UNDERLINE.OFFSET_MD),
            height: theme.typography.pxToRem(HERO_METRICS.UNDERLINE.HEIGHT_MD),
        },
    },
}));

export const PrimaryActionButton = styled(Button)<
    ButtonProps & { component?: ElementType; to?: string }
>(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: SHADOWS.BUTTON_PRIMARY,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: SHADOWS.BUTTON_PRIMARY_HOVER,
    },
}));

export const SecondaryActionButton = styled(Button)<
    ButtonProps & { component?: ElementType; to?: string }
>(({ theme }) => ({
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.common.white,
    backdropFilter: `blur(${HERO_METRICS.BACKDROP_BLUR})`,
    '&:hover': {
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.common.white,
    },
}));

export const HeroVisualWrapper = styled(Box)({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
});

export const GlowEffect = styled(Box)(({ theme }) => ({
    position: 'absolute',
    borderRadius: '50%',
    background: GRADIENTS.PRIMARY_RADIAL,
    pointerEvents: 'none',
    width: theme.typography.pxToRem(HERO_METRICS.GLOW_SIZE.XS),
    height: theme.typography.pxToRem(HERO_METRICS.GLOW_SIZE.XS),
    [theme.breakpoints.up('sm')]: {
        width: theme.typography.pxToRem(HERO_METRICS.GLOW_SIZE.SM),
        height: theme.typography.pxToRem(HERO_METRICS.GLOW_SIZE.SM),
    },
    [theme.breakpoints.up('md')]: {
        width: theme.typography.pxToRem(HERO_METRICS.GLOW_SIZE.MD),
        height: theme.typography.pxToRem(HERO_METRICS.GLOW_SIZE.MD),
    },
}));

export const HeroImage = styled('img')(({ theme }) => ({
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    filter: SHADOWS.HERO_IMAGE_DROP,
    transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
    }),
    '&:hover': {
        transform: `scale(${HERO_METRICS.IMAGE_HOVER_SCALE})`,
    },
    width: theme.typography.pxToRem(HERO_METRICS.IMAGE_SIZE.XS),
    height: theme.typography.pxToRem(HERO_METRICS.IMAGE_SIZE.XS),
    [theme.breakpoints.up('sm')]: {
        width: theme.typography.pxToRem(HERO_METRICS.IMAGE_SIZE.SM),
        height: theme.typography.pxToRem(HERO_METRICS.IMAGE_SIZE.SM),
    },
    [theme.breakpoints.up('md')]: {
        width: theme.typography.pxToRem(HERO_METRICS.IMAGE_SIZE.MD),
        height: theme.typography.pxToRem(HERO_METRICS.IMAGE_SIZE.MD),
    },
}));

export const StyledHomeContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
});

export const CenteredLayout = styled(Box)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

export const HeroContent = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: theme.spacing(12),
    },
}));

export const HeroTextSection = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
        maxWidth: theme.typography.pxToRem(HERO_METRICS.MAX_TEXT_WIDTH),
    },
}));

export const HeroHeadingGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export const ActionButtonGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));
