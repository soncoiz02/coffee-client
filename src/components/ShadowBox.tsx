import { Box, BoxProps } from '@mui/material'
import React, { ReactNode } from 'react'
import { CUSTOM_STYLE_PROPERTY } from '../constants/styleProperty'

type PropsType = { children: ReactNode } & BoxProps

const ShadowBox = ({ children, ...other }: PropsType) => {
    return (
        <Box
            sx={{
                background: '#fff',
                boxShadow: CUSTOM_STYLE_PROPERTY.boxShadow,
                ...other.sx
            }}
        >{children}</Box>
    )
}

export default ShadowBox