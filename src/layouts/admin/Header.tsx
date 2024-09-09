
import { faBell, faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Divider, IconButton, Popover, Stack, styled, Typography, useTheme } from '@mui/material'
import { MouseEvent, useState } from 'react'
import ShadowBox from '../../components/ShadowBox'
import { CONSTANTS } from '../../constants'

const HeaderWrapper = styled(Stack)(({ theme }) => ({
    width: '100%',
    position: 'sticky',
    top: 0,
    right: 0,
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(6px)',
    borderRadius: '0 24px',
    boxShadow: CONSTANTS.CUSTOM_STYLE_PROPERTY.boxShadow,
    padding: '16px 24px',
    zIndex: 90
}))

const UserAction = styled(Stack)(({ theme }) => ({
    width: '180px',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
        background: CONSTANTS.CUSTOM_STYLE_PROPERTY.hoverBg
    }
}))

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme()

    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
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
    )
}

export default Header