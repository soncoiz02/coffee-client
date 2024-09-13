import { Avatar, AvatarProps } from '@mui/material'
import React from 'react'
import noImage from '../assets/imgs/no-image.png'

type PropsType = {
    src: string
} & AvatarProps

const ShowImage = ({ src, ...other }: PropsType) => {
    return (
        <Avatar
            {...other}
            src={src ? src : noImage}
        />
    )
}

export default ShowImage