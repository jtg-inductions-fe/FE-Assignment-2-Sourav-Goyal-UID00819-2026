import type { Components, Theme } from '@mui/material/styles';

import InterBoldTTF from '@assets/fonts/inter/Inter-Bold.ttf';
import InterBoldWOFF2 from '@assets/fonts/inter/Inter-Bold.woff2';
import InterMediumTTF from '@assets/fonts/inter/Inter-Medium.ttf';
import InterMediumWOFF2 from '@assets/fonts/inter/Inter-Medium.woff2';
// Local Font files
import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import InterSemiBoldTTF from '@assets/fonts/inter/Inter-SemiBold.ttf';
import InterSemiBoldWOFF2 from '@assets/fonts/inter/Inter-SemiBold.woff2';

const fontFaceDeclarations = `
      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      }
      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: url(${InterMediumWOFF2}) format('woff2'), 
        url(${InterMediumTTF}) format('truetype');
      }
      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        src: url(${InterSemiBoldWOFF2}) format('woff2'), 
        url(${InterSemiBoldTTF}) format('truetype');
      }
      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        src: url(${InterBoldWOFF2}) format('woff2'), 
        url(${InterBoldTTF}) format('truetype');
      }
    `;

export const components: Components<Theme> = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
            fontFaceDeclarations,
        },
    },
    MuiButton: {
        defaultProps: {
            variant: 'contained',
        },
    },
    MuiContainer: {
        defaultProps: {
            maxWidth: 'lg',
        },
        styleOverrides: {
            root: ({ theme }) => ({
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
                gap: theme.spacing(2),
                [theme.breakpoints.up('md')]: {
                    paddingTop: theme.spacing(6),
                    paddingBottom: theme.spacing(6),
                },
            }),
        },
    },
};
