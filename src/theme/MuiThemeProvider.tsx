import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import React, { ReactNode } from 'react'
import palette from './palette'
import typography from './typography'
import breakpoint from './breakpoint'
import { viVN } from '@mui/material/locale'

const MuiThemeProvider = ({ children }: { children: ReactNode }) => {
    const muiTheme = createTheme(
        {
            typography,
            palette,
            breakpoints: breakpoint,
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: ({ theme }) => ({
                            variants: [
                                {
                                    props: { variant: 'contained' },
                                    style: {
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: theme.palette.primary.main,
                                            boxShadow: `0 2px 5px 5px ${theme.palette.primary.light}`
                                        }
                                    }
                                }
                            ]
                        })
                    }
                }
            }
        },
        viVN,
    )

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default MuiThemeProvider