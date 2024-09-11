import { faPenToSquare, faTableList, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Chip, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InforGrid from '../../../components/datagrid/InforGrid'
import ShadowBox from '../../../components/ShadowBox'
import { ProductServices } from '../../../services/product/productServices'
import { toastServices } from '../../../services/toast/toastServices'
import { ProductGridData, ResProductIngredient } from '../../../types/product'
import { numberToPrice } from '../../../utils/formatNumber'
import ModalIngredientList from './sections/ModalIngredientList'

export const Wrapper = styled(Stack)(({ theme }) => ({
    padding: '24px'
}))

const ProductPage = () => {

    const [dataSource, setDataSource] = useState<ProductGridData[]>([])
    const [rowCount, setRowCount] = useState(0)
    const [searchParams] = useSearchParams()
    const [ingredientData, setIngredientData] = useState<ResProductIngredient[]>([])

    const columns: GridColDef[] = [
        {
            field: 'no',
            width: 50,
            headerName: 'STT',
            hideSortIcons: true,
            align: 'center',
            resizable: false,
        },
        {
            field: 'name',
            width: 150,
            headerName: 'Tên sản phẩm',
            flex: 1,
            resizable: false,
            hideSortIcons: true,
        },
        {
            field: 'img',
            width: 150,
            headerName: 'Ảnh',
            headerAlign: "center",
            align: "center",
            resizable: false,
            hideSortIcons: true,
            renderCell: (params) => {
                return (
                    <Stack alignItems='center' justifyItems='center' height='100%'>
                        <Avatar sx={{
                            width: "50px",
                            height: "50px",
                            mt: 1
                        }} src={params.value} variant='rounded' />
                    </Stack>
                )
            }
        },
        {
            field: 'price',
            width: 200,
            headerName: 'Giá',
            headerAlign: "center",
            align: "center",
            resizable: false,
            hideSortIcons: true,
            renderCell: (params) => {
                const { row } = params
                if (row.priceType === 0)
                    return <Chip color='info' label={numberToPrice(row.singlePrice)} />
                return (
                    <Stack gap={0.5} py={1}>
                        {
                            row.priceBySize.map((price: any, index: number) =>
                                <Chip key={index} color='info' label={`${price.size.name}: ${numberToPrice(price.price)}`} />
                            )
                        }
                    </Stack>
                )
            },
        },
        {
            field: 'category',
            width: 150,
            headerName: 'Danh mục',
            headerAlign: "center",
            align: "center",
            resizable: false,
            hideSortIcons: true,
        },
        {
            field: 'ingredients',
            width: 150,
            headerName: 'Nguyên liệu',
            headerAlign: "center",
            align: "center",
            resizable: false,
            hideSortIcons: true,
            renderCell: (params) => {
                return <Stack height='100%' justifyContent='center' alignItems='center'>
                    <Tooltip title="Mở bản nguyên liệu">
                        <IconButton color="warning" onClick={() => setIngredientData(params.value)}>
                            <FontAwesomeIcon icon={faTableList} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            }
        },
        {
            field: 'status',
            width: 150,
            headerName: 'Trạng thái',
            align: 'center',
            headerAlign: "center",
            resizable: false,
            hideSortIcons: true,
            renderCell: (params) => <Stack alignItems='center' justifyContent='center' height='100%'>
                <Chip color={params.value ? 'success' : 'error'} label={params.value ? "Đang hoạt động" : "Đóng"} />
            </Stack>
        },
        {
            field: 'action',
            width: 150,
            headerName: 'Hành động',
            resizable: false,
            hideSortIcons: true,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <Stack direction='row' alignItems='center' justifyContent='center' height='100%'>
                        <Tooltip title="Sửa thông tin">
                            <IconButton color='info'>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa sản phẩm">
                            <IconButton color='error'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )
            }
        },
    ]

    const handleGetGridData = async (signal: any) => {
        try {
            const params = Object.fromEntries([...searchParams])
            const res = await ProductServices.getGridData({ signal, params })
            const { data, meta, status } = res
            if (status === 'success') {
                const mappedData: ProductGridData[] = data.map((item, index) => ({ ...item, id: item._id, category: item.category.name, no: index + 1 }))
                setDataSource(mappedData)
                setRowCount(meta.total)
            }
        } catch (error: any) {
            toastServices.error(error.message)
        }
    }

    useEffect(() => {
        const abortControler = new AbortController()
        const { signal } = abortControler
        handleGetGridData(signal)

        return () => {
            abortControler.abort()
        }
    }, [searchParams])

    const resetIngredientData = () => setIngredientData([])

    return (
        <ShadowBox sx={{ borderRadius: '20px' }}>
            <Wrapper gap={2}>
                <Typography variant='h2'>Danh sách sản phẩm</Typography>
                <InforGrid
                    columns={columns}
                    rows={dataSource}
                    rowCount={rowCount}
                    sx={{
                        minHeight: '200px'
                    }}
                    getRowHeight={() => 'auto'}
                />
                {
                    ingredientData && ingredientData.length > 0 &&
                    <ModalIngredientList ingredientData={ingredientData} resetIngredientData={resetIngredientData} />
                }
            </Wrapper>
        </ShadowBox>
    )
}

export default ProductPage