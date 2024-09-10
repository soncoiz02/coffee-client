import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Stack, styled, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import InforGrid from '../../../components/datagrid/InforGrid'
import ShadowBox from '../../../components/ShadowBox'
import { useSearchParams } from 'react-router-dom'

export const Wrapper = styled(Stack)(({ theme }) => ({
    padding: '24px'
}))

const ProductPage = () => {
    const columns: GridColDef[] = [
        {
            field: 'no',
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
            flex: 1
        },
        {
            field: 'img',
            width: 150,
            headerName: 'Ảnh',
            align: 'center'
        },
        {
            field: 'price',
            flex: 1,
            headerName: 'Giá',
            align: 'center',
            renderCell: (params) => {
                return (
                    <Stack>
                        asds
                    </Stack>
                )
            },
        },
        {
            field: 'category',
            width: 150,
            headerName: 'Danh mục',
            align: 'center'
        },
        {
            field: 'ingredient',
            width: 100,
            headerName: 'Nguyên liệu',
            align: 'center'
        },
        {
            field: 'status',
            width: 150,
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

    const [dataSource, setDataSource] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [searchParams] = useSearchParams()

    return (
        <ShadowBox sx={{ borderRadius: '20px' }}>
            <Wrapper gap={2}>
                <Typography variant='h2'>Danh sách sản phẩm</Typography>
                <InforGrid
                    columns={columns}
                    rows={dataSource}
                    rowCount={rowCount}
                />
            </Wrapper>
        </ShadowBox>
    )
}

export default ProductPage