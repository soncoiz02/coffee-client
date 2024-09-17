import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Modal, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import RHFProvider from '../../../../../components/RHF/RHFProvider';
import RHFTextField from '../../../../../components/RHF/RHFTextField';
import { setUpdateQuantity, updateGridQuantity } from '../../../../../redux/feature/ingredientSlice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hook';
import { IngredientServices } from '../../../../../services/ingredient/ingredientServices';
import { toastServices } from '../../../../../services/toast/toastServices';
import { CustomContentModal } from '../../../../../theme/styled-components/modal';
import { UpdateQuantityData } from '../../../../../types/ingredient';
import { ModalContent, ModalTitle } from '../grid/ModalAlertValidate';

const ModalUpdateQuantity = ({ mutateData }: any) => {
    const { updateQuantity } = useAppSelector(state => state.ingredient)
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [isShowLoading, setIsShowLoading] = useState(false)

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
        setIsShowLoading(false)
    }

    const onSubmit = (values: any) => {
        const data: UpdateQuantityData = {
            currentQuantity: updateQuantity.quantity,
            additionalQuantity: +values.quantity,
            type: updateQuantity.type
        }
        setIsShowLoading(true)
        handleUpdateQuantity(data);
    }

    const handleUpdateQuantity = async (data: UpdateQuantityData) => {
        try {
            const res = await IngredientServices.updateIngredientQuantity(updateQuantity.id, data)
            if (res.status === 'success') {
                toastServices.success(res.message)
                mutateData()
                handleClose()
            }
        } catch (error: any) {
            toastServices.error(error.message)
        }
        finally {
            setIsShowLoading(false)
        }
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
                    py: 2
                }}>
                    <RHFProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
                        <Stack gap={2}>
                            <Typography variant='h4'>{updateQuantity.name}</Typography>
                            <RHFTextField type='number' name='quantity' label={`Khối lượng (${updateQuantity.unit})`} />
                            <Stack direction='row' alignItems='center' justifyContent='space-between' gap={2}>
                                <Button
                                    sx={{ borderRadius: '8px' }}
                                    size='small' variant='outlined'
                                    color='error'
                                    onClick={() => handleClose()}
                                >
                                    Hủy
                                </Button>
                                {
                                    isShowLoading ? <CircularProgress size={30} color="primary" /> :
                                        <Button
                                            sx={{ borderRadius: '8px' }}
                                            size='small'
                                            variant='contained'
                                            type='submit'
                                            disabled={isShowLoading}
                                        >
                                            Cập nhật
                                        </Button>
                                }
                            </Stack>
                        </Stack>
                    </RHFProvider>
                </ModalContent>
            </CustomContentModal>
        </Modal>
    )
}

export default ModalUpdateQuantity