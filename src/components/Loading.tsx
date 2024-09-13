import { Backdrop, CircularProgress, Stack, styled } from '@mui/material'
import { useAppSelector } from '../redux/hook'

export const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
    color: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(5px)'
}))

const LoadingFullScreen = () => {
    const { isShow } = useAppSelector(state => state.loading)
    return (
        <CustomBackdrop
            open={isShow}
        >
            <CircularProgress color="inherit" />
        </CustomBackdrop>
    )
}

export const LoadingComponent = () => {
    return (
        <Stack
            sx={{
                width: '100%',
                height: '100%',
                color: (theme) => theme.palette.primary.main,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)'
            }}
            alignItems='center'
            justifyContent='center'
        >
            <CircularProgress color="inherit" />
        </Stack>
    )
}

export default LoadingFullScreen