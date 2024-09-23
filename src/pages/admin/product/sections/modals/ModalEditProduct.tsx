import React, { useEffect, useState } from 'react'
import { CustomModal } from '../../../../../theme/styled-components/modal';
import { CustomContentModal } from '../../../ingredients/sections/modals/ModalAlertValidate';
import { Typography } from '@mui/material';
import useDetailProduct from '../../../../../hooks/swr/useDetailProduct';
import { LoadingComponent } from '../../../../../components/Loading';

type PropsType = {
    code: string
    resetCode: () => void
}

const ModalEditProduct = ({ code, resetCode }: PropsType) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        resetCode()
    };

    const { data, error, isLoading } = useDetailProduct(code)
    console.log(data);

    if (error) return "An error has occurred.";
    if (isLoading) return <LoadingComponent />;

    useEffect(() => {
        if (code) {
            setOpen(true)
        }
    }, [code])

    return (
        <CustomModal
            open={open}
            onClose={handleClose}
        >
            <CustomContentModal gap={2} sx={{ padding: '20px' }}>
                <Typography variant='h3'>Bảng nguyên liệu</Typography>
            </CustomContentModal>
        </CustomModal>
    )
}

export default ModalEditProduct