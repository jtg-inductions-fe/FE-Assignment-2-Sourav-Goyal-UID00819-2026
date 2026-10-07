import type { Components, Theme } from '@mui/material/styles';

// Local Font files
import InterRegularTTF from '@assets/fonts/inter/inter-regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/inter-regular.woff2';
import { COLORS } from '@constant';

// TODO: Add necessary font face declarations here
const fontFaceDeclarations = `
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      };
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
        styleOverrides: {
            root: {
                background: COLORS.PRIMARY.MAIN,
                color: 'white',
                '&:hover': {
                    opacity: 0.9,
                },
            },
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
