import { CircularProgress, Container, Stack } from '@mui/material'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { CustomBackdrop } from '../../components/Loading'
import Header from './Header'
import SideBar from './SideBar'

export const SIDEBAR_WIDTH = 300

const AdminLayout = () => {
    return (
        <Stack direction='row' width='100%'>
            <SideBar />
            <Stack sx={{ width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` } }} >
                <Header />
                <Container maxWidth='xl' sx={{ paddingY: '36px' }}>
                    <Suspense
                        fallback={
                            <CustomBackdrop
                                open={true}
                            >
                                <CircularProgress color="inherit" />
                            </CustomBackdrop>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </Container>
            </Stack>
        </Stack >
    )
}

export default AdminLayout