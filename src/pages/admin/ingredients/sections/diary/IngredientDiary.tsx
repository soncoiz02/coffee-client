import { Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ShadowBox from '../../../../../components/ShadowBox'
import InforGrid from '../../../../../components/datagrid/InforGrid'
import { IngredientServices } from '../../../../../services/ingredient/ingredientServices'
import { toastServices } from '../../../../../services/toast/toastServices'
import { IngredienDiarytDataSource } from '../../../../../types/ingredient'
import { Wrapper } from '../../../product'
import { formatDate } from '../../../../../types/time'

const cols: GridColDef[] = [
    {
        field: 'no',
        headerName: "STT",
        align: 'center',
        headerAlign: 'center',
        width: 80,
        resizable: false,
        hideSortIcons: true,
    },
    {
        field: 'user',
        headerName: 'Người thực hiện',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        resizable: false,
        hideSortIcons: true,
    },
    {
        field: 'content',
        headerName: 'Nội dung',
        align: 'center',
        headerAlign: 'center',
        flex: 1,
        resizable: false,
        hideSortIcons: true,
    },
    {
        field: 'createdAt',
        headerName: 'Thời gian',
        align: 'center',
        headerAlign: 'center',
        width: 200,
        resizable: false,
        hideSortIcons: true,
        valueFormatter: (value) => formatDate(value, 'HH:ss dd/MM/yyyy')
    }
]

const IngredientDiary = () => {
    const [dataSource, setDataSource] = useState<IngredienDiarytDataSource[]>([])
    const [rowCount, setRowCount] = useState(0)
    const [searchParams,] = useSearchParams()

    useEffect(() => {
        const abortControler = new AbortController()
        const { signal } = abortControler
        handleGetDiary(signal)

        return () => {
            abortControler.abort()
        }
    }, [searchParams])

    const handleGetDiary = async (signal: any) => {
        try {
            const params = Object.fromEntries([...searchParams])
            const { status, data, meta } = await IngredientServices.getIngredientDiary({ signal, params })
            if (status === 'success') {
                const mappedData = data.map((item, index: number) => ({
                    ...item,
                    no: index + 1,
                    id: item._id
                }))

                setDataSource(mappedData)
                setRowCount(meta.total)
            }
        } catch (error: any) {
            toastServices.error(error.message)
        }
    }

    return (
        <ShadowBox sx={{ borderRadius: "20px" }}>
            <Wrapper gap={2}>
                <Typography variant='h2'>Nhật ký</Typography>
                <InforGrid
                    columns={cols}
                    rows={dataSource}
                    rowCount={rowCount}
                />
            </Wrapper>
        </ShadowBox>
    )
}

export default IngredientDiary