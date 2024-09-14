
import { faBowlRice, faBoxesStacked, faChartSimple, faChevronRight, faHouse, faList, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Collapse, Link, Stack, styled, Typography, useTheme } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { SIDEBAR_WIDTH } from '.'
import { CONSTANTS } from '../../constants'
import { activeLink } from '../../utils/activeLink'

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
        background: theme.palette.primary.light,
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        borderRadius: '0 8px 8px 0'
    },
    '&:hover': {
        background: CONSTANTS.CUSTOM_STYLE_PROPERTY.hoverBg
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

const CustomChildLink = styled(Link)(({ theme }) => ({
    width: "90%",
    padding: '10px 14px',
    borderRadius: '8px',
    alignSelf: "flex-end",
    '&:hover': {
        background: CONSTANTS.CUSTOM_STYLE_PROPERTY.hoverBg
    },
}))

type ChildrenType = {
    title: string
    path: string
    activePath: string[]
    icon: IconDefinition
    children?: {
        title: string
        path: string
        activePath: string[]
    }[]
}

type SidebarNavTypes = {
    title: string,
    children: ChildrenType[]
}

const SIDEBAR_ITEM: SidebarNavTypes[] = [
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
                title: 'Danh mục',
                path: '/admin/product-category',
                activePath: ['/admin/product-category'],
                icon: faList,
                children: [
                    {
                        title: "Danh sách danh mục",
                        path: "/admin/product-category",
                        activePath: ["/admin/product-category"]
                    },
                    {
                        title: "Tạo danh mục",
                        path: "/admin/product-category-form",
                        activePath: ["/admin/product-category"]
                    }
                ]
            },
            {
                title: 'Sản phẩm',
                path: '/admin/product',
                activePath: ['/admin/product', '/admin/product/form'],
                icon: faBoxesStacked,
                children: [
                    {
                        title: "Danh sách sản phẩm",
                        path: "/admin/product",
                        activePath: ["/admin/product"]
                    },
                    {
                        title: "Tạo sản phẩm",
                        path: "/admin/product/form",
                        activePath: ["/admin/product/form"]
                    }
                ]
            },
            {
                title: 'Danh sách nguyên liệu',
                path: '/admin/ingredient',
                activePath: ['/admin/ingredient', "/admin/ingredient/grid", "/admin/ingredient/diary"],
                icon: faBowlRice,
                children: [
                    {
                        title: "Danh sách nguyên liệu",
                        path: "/admin/ingredient",
                        activePath: ["/admin/ingredient"]
                    },
                    {
                        title: "Tạo nguyên liệu",
                        path: "/admin/ingredient/grid",
                        activePath: ["/admin/ingredient/grid"]
                    },
                    {
                        title: "Nhật ký",
                        path: "/admin/ingredient/diary",
                        activePath: ["/admin/ingredient/diary"]
                    }
                ]
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


const SideBar = () => {
    const [listCollapse, setListCollapse] = useState<string[]>([])
    const theme = useTheme()
    const { pathname } = useLocation()


    const getActiveColor = (paths: string[]) => {
        return activeLink(pathname, paths) ? theme.palette.primary.main : theme.palette.text.secondary
    }

    const handleCollapse = (collapseId: string) => {
        if (listCollapse.includes(collapseId)) {
            const newList = listCollapse.filter(p => p != collapseId)
            setListCollapse(newList)
        }
        else {
            setListCollapse([...listCollapse, collapseId])
        }
    }

    const getCollapseStatus = (collapseId: string, paths: string[]): boolean => {
        return listCollapse.includes(collapseId) || activeLink(pathname, paths)
    }

    const handleNavClick = (e: MouseEvent, navItem: ChildrenType, index: number) => {
        if (navItem.children && navItem.children.length > 0) {
            e.preventDefault()
            handleCollapse(`parent-${index + 1}`)
        }
    }

    return (
        <SideBarWrapper sx={{ position: { xs: 'fixed', md: 'sticky' } }} gap={4}>
            <SidebarHead>
                <Typography color='#fff' textTransform='uppercase' fontWeight={800} letterSpacing={1.1} variant='h3'>Quản trị</Typography>
            </SidebarHead>
            <Stack gap={3}>
                {
                    SIDEBAR_ITEM.map((item: SidebarNavTypes, index: number) => (
                        <Stack key={index} gap='4px'>
                            <Typography fontWeight='bold' textTransform='uppercase' color='text.secondary' variant='h6'>{item.title}</Typography>
                            <Stack gap='8px'>
                                {
                                    item.children.map((child, i) => (
                                        <div key={`parent-${i + 1}`}>
                                            <CustomLink
                                                underline='none'
                                                className={activeLink(pathname, child.activePath) ? 'active' : ''}
                                                component={RouterLink}
                                                to={child.path}
                                                onClick={(e: MouseEvent) => handleNavClick(e, child, i)}
                                            >
                                                <div className="icon">
                                                    <FontAwesomeIcon fontSize='18px' color={getActiveColor(child.activePath)} icon={child.icon} />
                                                </div>
                                                <Typography variant='h6' fontWeight='600' color={getActiveColor(child.activePath)}>{child.title}</Typography>
                                                {
                                                    child.children && child.children.length > 0 &&
                                                    <FontAwesomeIcon
                                                        color={theme.palette.text.secondary}
                                                        icon={faChevronRight}
                                                        fontSize='14px'
                                                        style={{
                                                            marginLeft: 'auto',
                                                            transform: `rotate(${getCollapseStatus(`parent-${i + 1}`, child.activePath) ? 90 : 0}deg)`,
                                                            transition: '0.5s'
                                                        }} />
                                                }
                                            </CustomLink>
                                            {
                                                child.children && child.children.length > 0 &&
                                                <Collapse in={getCollapseStatus(`parent-${i + 1}`, child.activePath)}>
                                                    <Stack gap="8px">
                                                        {
                                                            child.children.map((item, itemIndex) =>
                                                                <CustomChildLink
                                                                    underline='none'
                                                                    className={activeLink(pathname, item.activePath) ? 'active' : ''}
                                                                    key={`child-${i + 1}-${itemIndex + 1}`}
                                                                    component={RouterLink}
                                                                    to={item.path}
                                                                >
                                                                    <Typography variant='h6' fontWeight='600' color={getActiveColor(item.activePath)}>{item.title}</Typography>
                                                                </CustomChildLink>
                                                            )
                                                        }
                                                    </Stack>
                                                </Collapse>
                                            }
                                        </div>
                                    ))
                                }
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </SideBarWrapper >
    )
}

export default SideBar