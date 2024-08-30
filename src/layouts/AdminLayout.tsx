import { faBell, faBowlRice, faBoxesStacked, faChartSimple, faGear, faHouse, faList, faRightFromBracket, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Container, Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Popover, Stack, styled, Typography, useTheme } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom'
import ShadowBox from '../components/ShadowBox'
import { activeLink } from '../utils/activeLink'
import { CUSTOM_STYLE_PROPERTY } from '../constants/styleProperty'

type SidebarTypes = {
    title: string,
    children: {
        title: string
        path: string
        activePath: string[]
        icon: IconDefinition
    }[]
}


const SIDEBAR_WIDTH = 300

const SIDEBAR_ITEM: SidebarTypes[] = [
    {
        title: 'Quản lý sản phẩm',
        children: [
            {
                title: 'Trang chủ',
                path: '/admin',
                activePath: ['/admin'],
                icon: faHouse
            },
            {
                title: 'Danh mục sản phẩm',
                path: '/admin/product-category',
                activePath: ['/admin/product-category'],
                icon: faList
            },
            {
                title: 'Danh sách sản phẩm',
                path: '/admin/product-list',
                activePath: ['/admin/product-list', '/admin/product-form'],
                icon: faBoxesStacked
            },
            {
                title: 'Danh sách nguyên liệu',
                path: '/admin/ingredient-list',
                activePath: ['/admin/ingredient-list'],
                icon: faBowlRice
            }
        ]
    },
    {
        title: 'Thống kê',
        children: [
            {
                title: 'Tổng quát',
                path: '/admin/statistical',
                activePath: ['/admin/statistical'],
                icon: faChartSimple
            }
        ]
    }
]

const SideBarWrapper = styled(Stack)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    height: '100vh',
    position: 'sticky',
    top: 0,
    left: 0,
    padding: '16px',
    background: '#fff',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    zIndex: 100
}))

const CustomLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0 14px',
    padding: '10px 14px',
    borderRadius: '8px',
    '&.active': {
        background: theme.palette.primary.light
    },
    '&:hover': {
        background: CUSTOM_STYLE_PROPERTY.hoverBg
    }
}))

const SidebarHead = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
    borderRadius: '14px',
    padding: '24px'
}))

const HeaderWrapper = styled(Stack)(({ theme }) => ({
    width: '100%',
    position: 'sticky',
    top: 0,
    right: 0,
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(6px)',
    borderRadius: '0 24px',
    boxShadow: CUSTOM_STYLE_PROPERTY.boxShadow,
    padding: '16px 24px',
    zIndex: 90
}))

const UserAction = styled(Stack)(({ theme }) => ({
    width: '180px',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
        background: CUSTOM_STYLE_PROPERTY.hoverBg
    }
}))

const AdminLayout = () => {
    const theme = useTheme()
    const { pathname } = useLocation()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getActiveColor = (paths: string[]) => {
        return activeLink(pathname, paths) ? theme.palette.primary.main : theme.palette.text.secondary
    }

    return (
        <Stack direction='row' width='100%'>
            <SideBarWrapper sx={{ position: { xs: 'fixed', md: 'sticky' } }} gap={4}>
                <SidebarHead>
                    <Typography color='#fff' textTransform='uppercase' fontWeight={800} letterSpacing={1.1} variant='h3'>Quản trị</Typography>
                </SidebarHead>
                <Stack gap={3}>
                    {
                        SIDEBAR_ITEM.map((item: SidebarTypes, index: number) => (
                            <Stack key={index} gap='4px'>
                                <Typography fontWeight='bold' textTransform='uppercase' color='text.secondary' variant='h6'>{item.title}</Typography>
                                <Stack gap='8px'>
                                    {
                                        item.children.map((child, i) => (
                                            <CustomLink underline='none' className={activeLink(pathname, child.activePath) ? 'active' : ''} key={i} component={RouterLink} to={child.path}>
                                                <div className="icon">
                                                    <FontAwesomeIcon fontSize='18px' color={getActiveColor(child.activePath)} icon={child.icon} />
                                                </div>
                                                <Typography variant='h6' fontWeight='600' color={getActiveColor(child.activePath)}>{child.title}</Typography>
                                            </CustomLink>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
            </SideBarWrapper >
            <Stack sx={{ width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` } }} >
                <HeaderWrapper direction='row' justifyContent='flex-end' alignItems='center' gap="20px">
                    <IconButton>
                        <FontAwesomeIcon icon={faBell} />
                    </IconButton>
                    <Avatar
                        src=""
                        sx={{ width: '40px', height: '40px', cursor: 'pointer' }}
                        variant='circular'
                        onClick={handleClick}
                    />
                    <Popover
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{ boxShadow: 'none' }}
                    >
                        <ShadowBox sx={{ borderRadius: '10px' }}>
                            <Stack padding='8px' gap='4px'>
                                <UserAction direction='row' alignItems='center' gap='10px'>
                                    <FontAwesomeIcon fontSize={14} color={theme.palette.text.secondary} icon={faUser} />
                                    <Typography color='text.secondary' variant='body2'>Thông tin</Typography>
                                </UserAction>
                                <UserAction direction='row' alignItems='center' gap='10px'>
                                    <FontAwesomeIcon fontSize={14} color={theme.palette.text.secondary} icon={faGear} />
                                    <Typography color='text.secondary' variant='body2'>Cài đặt</Typography>
                                </UserAction>
                                <Divider />
                                <UserAction direction='row' alignItems='center' gap='10px'>
                                    <FontAwesomeIcon fontSize={14} color={theme.palette.error.main} icon={faRightFromBracket} />
                                    <Typography color='error' variant='body2'>Đăng xuất</Typography>
                                </UserAction>
                            </Stack>
                        </ShadowBox>
                    </Popover>
                </HeaderWrapper>
                <Container maxWidth='xl' sx={{ paddingY: '36px' }}>
                    <Outlet />
                </Container>
            </Stack>
        </Stack >
    )
}

export default AdminLayout