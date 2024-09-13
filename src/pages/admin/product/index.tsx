import { faPenToSquare, faTableList, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InforGrid from '../../../components/datagrid/InforGrid'
import ShadowBox from '../../../components/ShadowBox'
import ShowImage from '../../../components/ShowImage'
import Status from '../../../components/Status'
import { ProductServices } from '../../../services/product/productServices'
import { toastServices } from '../../../services/toast/toastServices'
import { ProductGridData, ResProductIngredient } from '../../../types/product'
import { numberToPrice } from '../../../utils/formatNumber'
import ModalIngredientList from './sections/ModalIngredientList'

export const Wrapper = styled(Stack)({
    padding: '24px'
})

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
            renderCell: (params) => <Stack height='100%' justifyContent='center'>{params.value}</Stack>
        },
        {
            field: 'name',
            width: 150,
            headerName: 'Tên sản phẩm',
            flex: 1,
            resizable: false,
            hideSortIcons: true,
            renderCell: (params) => {
                const { row, value } = params
                return (
                    <Stack direction='row' alignItems='center' height='100%' gap={1}>
                        <ShowImage
                            src={row.img}
                            sx={{
                                width: "50px",
                                height: "50px",
                            }}
                            variant='rounded'
                        />
                        <Typography variant='body2'>{value}</Typography>
                    </Stack>
                )
            }
        },
        {
            field: 'price',
            width: 180,
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
                    <Stack alignItems='center' gap={1} py={1}>
                        {
                            row.priceBySize.map((price: any, index: number) =>
                                <Stack direction='row' alignItems='center' gap={1} key={index}>
                                    <Typography
                                        sx={{
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            background: (theme) => theme.palette.text.primary,
                                            color: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontWeight: 700
                                        }}
                                        variant='body2'
                                    >
                                        {price.size.code !== 'normal' ? price.size.code.split('size')[1] : <>&#36;</>}
                                    </Typography>
                                    <Typography variant='body2' fontWeight={600}>{numberToPrice(price.price)}</Typography>
                                </Stack>
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
            renderCell: (params) => <Stack height='100%' justifyContent='center'>{params.value}</Stack>
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
                        <IconButton onClick={() => setIngredientData(params.value)}>
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
                <Status title={params.value ? 'Hoạt động' : 'Đóng'} type={params.value ? 'success' : 'error'} />
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
                            <IconButton>
                                <FontAwesomeIcon fontSize={18} icon={faPenToSquare} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa sản phẩm">
                            <IconButton color='error'>
                                <FontAwesomeIcon fontSize={18} icon={faTrashCan} />
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