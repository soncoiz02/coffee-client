import { Typography } from '@mui/material'
import { CONSTANTS } from '../constants'

type PropsType = {
    type: 'success' | 'error' | 'warning'
    title: string
}

const Status = ({ type, title }: PropsType) => {
    return (
        <Typography sx={{
            padding: '5px 15px',
            borderRadius: '5px',
            background: CONSTANTS.CUSTOM_STYLE_PROPERTY.EXTEND_PALETTE[type.toUpperCase()].lighter,
            color: (theme) => theme.palette[type].main,
            fontWeight: 500,
            alignSelf: 'center'
        }} variant='subtitle1'>
            {title}
        </Typography>
    )
}

export default Status