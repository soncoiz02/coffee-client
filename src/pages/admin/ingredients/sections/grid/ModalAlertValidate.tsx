import { Box, Modal, Stack, styled, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { CONSTANTS } from '../../../../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

type PropsType = {
    listErrors: any
}

const CustomContentModal = styled(Stack)(({ theme }) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    boxShadow: CONSTANTS.CUSTOM_STYLE_PROPERTY.boxShadow,
    borderRadius: '10px',
    outline: 'none',
    border: 'none'
}))

const ModalTitle = styled(Stack)(({ theme }) => ({
    width: '100%',
    padding: '10px 15px',
    borderBottom: `1px solid ${theme.palette.grey[300]}`
}))

const ModalContent = styled(Stack)(({ theme }) => ({
    padding: '10px 15px'
}))

const ModalAlertValidate = ({ listErrors }: PropsType) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (listErrors && listErrors.length > 0) {
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    }, [listErrors])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(0,0,0,0.1)',
                backdropFilter: 'blur(5px)',
                '& .MuiModal-backdrop': {
                    background: 'none'
                }
            }}
        >
            <CustomContentModal sx={{ width: { xs: '300px', md: '500px' } }}>
                <ModalTitle direction='row' alignItems='center' gap={1}>
                    <FontAwesomeIcon color={theme.palette.error.main} fontSize="20px" icon={faCircleExclamation} />
                    <Typography variant="h4">
                        Lỗi dữ liệu
                    </Typography>
                </ModalTitle>
                <ModalContent>
                    {
                        listErrors.length > 0 &&
                        listErrors.map((error: any, index: number) => (
                            <Stack key={index}>
                                <Typography variant='h5'>Dòng {error.row}:</Typography>
                                <Stack>
                                    {
                                        error.errors.map((err: any, i: number) =>
                                            <Stack key={`${err.field}-${index}-${i}`} direction='row' alignItems='center' gap={1}>
                                                <Typography variant='body2'>- {CONSTANTS.GRID_COL_NAME.INGREDIENT[err.field]}:</Typography>
                                                <Typography variant='body2' color='error'>{err.message}</Typography>
                                            </Stack>
                                        )
                                    }
                                </Stack>
                            </Stack>
                        ))
                    }
                </ModalContent>
            </CustomContentModal>
        </Modal>
    )
}

export default ModalAlertValidate