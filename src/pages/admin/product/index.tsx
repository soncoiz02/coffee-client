import React from 'react'
import ShadowBox from '../../../components/ShadowBox'
import { Button, IconButton, Stack, styled, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DataGridEditable from '../../../components/datagrid/DataGridEditable'

export const Wrapper = styled(Stack)(({ theme }) => ({
    padding: '24px'
}))

const cols: GridColDef[] = [
    {
        field: 'id',
        width: 50,
        headerName: 'STT',
        hideSortIcons: true,
        align: 'center',
        resizable: false
    },
    {
        field: 'name',
        width: 150,
        headerName: 'Tên sản phẩm',
        editable: true
    },
    {
        field: 'price',
        flex: 1,
        headerName: 'Mức giá',
        align: 'center',
        renderCell: (params) => {
            return (
                <Stack>

                </Stack>
            )
        },
        editable: true,
        renderEditCell: (params) => {
            return (
                <Stack>
                    asdasdas
                </Stack>
            )
        }
    },
    {
        field: 'img',
        flex: 1,
        headerName: 'Ảnh',
        align: 'center'
    },
    {
        field: 'ingredient',
        flex: 1,
        headerName: 'Nguyên liệu',
        align: 'center'
    },
    {
        field: 'category',
        flex: 1,
        headerName: 'Danh mục',
        align: 'center'
    },
    {
        field: 'status',
        flex: 1,
        headerName: 'Trạng thái',
        align: 'center'
    },
    {
        field: 'action',
        flex: 1,
        headerName: 'Hành động',
        renderCell: (params) => {
            return (
                <Stack direction='row' alignItems='center'>
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
                {/* <Button variant='contained'>Lưu dữ liệu</Button> */}
                <DataGridEditable
                    dataSource={fakeData}
                    cols={cols}
                />
            </Wrapper>
        </ShadowBox>
    )
}

export default ProductPage