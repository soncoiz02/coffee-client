import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import RHFProvider from '../../../../../components/RHF/RHFProvider';
import RHFTextField from '../../../../../components/RHF/RHFTextField';
import { setUpdateQuantity } from '../../../../../redux/feature/ingredientSlice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { CustomContentModal } from '../../../../../theme/styled-components/modal';
import { ModalContent, ModalTitle } from '../grid/ModalAlertValidate';

const ModalUpdateQuantity = () => {
    const { updateQuantity } = useAppSelector(state => state.ingredient)
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const yupSchema = yup.object().shape({
        quantity: yup.number()
            .typeError('Vui lòng nhập khối lượng là số')
            .test("positive", "Khối lượng phải lớn hơn 0", (value) => !value || +value >= 0)
    })

    const methods = useForm({
        defaultValues: {
            quantity: 0
        },
        resolver: yupResolver(yupSchema)
    })

    const { handleSubmit, reset } = methods

    const handleClose = () => {
        dispatch(setUpdateQuantity({ id: '', type: '' }))
        reset()
    }

    const onSubmit = (values: any) => {
        console.log(values);

    }

    return (
        <Modal
            open={!!updateQuantity.id}
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
                    <FontAwesomeIcon color={theme.palette.primary.main} fontSize="20px" icon={faPlusCircle} />
                    <Typography variant="h4">
                        Thêm khối lượng
                    </Typography>
                </ModalTitle>
                <ModalContent sx={{
                    pt: 4,
                    pb: 2
                }}>
                    <RHFProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
                        <Stack gap={2}>
                            <RHFTextField type='number' name='quantity' label='Khổi lượng' />
                            <Stack direction='row' alignItems='center' justifyContent='space-between' gap={2}>
                                <Button size='small' variant='outlined' color='error' onClick={() => handleClose()}>Hủy</Button>
                                <Button size='small' variant='contained' type='submit'>Cập nhật</Button>
                            </Stack>
                        </Stack>
                    </RHFProvider>
                </ModalContent>
            </CustomContentModal>
        </Modal>
    )
}

export default ModalUpdateQuantity