import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'
import { CONSTANTS } from '../constants'

type PropsType = { children: ReactNode } & BoxProps

const ShadowBox = ({ children, ...other }: PropsType) => {
    return (
        <Box
            sx={{
                background: '#fff',
                boxShadow: CONSTANTS.CUSTOM_STYLE_PROPERTY.boxShadow,
                ...other.sx
            }}
        >{children}</Box>
    )
}

export default ShadowBox