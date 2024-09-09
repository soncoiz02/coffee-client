import { Backdrop, CircularProgress, styled } from '@mui/material'
import { useAppSelector } from '../redux/hook'

export const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
    color: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(5px)'
}))

const Loading = () => {
    const { isShow } = useAppSelector(state => state.loading)
    return (
        <CustomBackdrop
            open={isShow}
        >
            <CircularProgress color="inherit" />
        </CustomBackdrop>
    )
}

export default Loading