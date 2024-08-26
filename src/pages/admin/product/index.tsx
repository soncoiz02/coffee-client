import React from 'react'
import ShadowBox from '../../../components/ShadowBox'
import { Button, IconButton, Stack, styled, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled(Stack)(({ theme }) => ({
    padding: '24px'
}))

const cols: GridColDef[] = [
    {
        field: 'id',
        width: 50,
        headerName: 'STT'
    },
    {
        field: 'name',
        width: 150,
        headerName: 'Tên sản phẩm'
    },
    {
        field: 'price',
        headerName: 'Mức giá'
    },
    {
        field: 'img',
        headerName: 'Ảnh'
    },
    {
        field: 'status',
        headerName: 'Trạng thái'
    },
    {
        field: 'action',
        headerName: 'Hành động',
        renderCell: (params) => {
            return (
                <Stack direction='row' alignItems='center' justifyContent='center'>
                    <IconButton color='info'>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </IconButton>
                    <IconButton color='error'>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </IconButton>
                </Stack>
            )
        }
    },
]

const fakeData = [
    {
        id: 1,
        name: '',
        price: '',
        img: '',
        status: ''
    },
    {
        id: 2,
        name: '',
        price: '',
        img: '',
        status: ''
    },
    {
        id: 3,
        name: '',
        price: '',
        img: '',
        status: ''
    },
    {
        id: 4,
        name: '',
        price: '',
        img: '',
        status: ''
    },
    {
        id: 5,
        name: '',
        price: '',
        img: '',
        status: ''
    }
]

const ProductPage = () => {
    return (
        <ShadowBox sx={{ borderRadius: '20px' }}>
            <Wrapper>
                <Typography variant='h2'>Danh sách sản phẩm</Typography>
                <Button variant='contained'>Lưu dữ liệu</Button>
                <DataGrid
                    rows={fakeData}
                    columns={cols}
                    disableColumnMenu={true}
                    localeText={{
                        footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} trên ${totalCount.toLocaleString()}`
                    }}
                />
            </Wrapper>
        </ShadowBox>
    )
}

export default ProductPage