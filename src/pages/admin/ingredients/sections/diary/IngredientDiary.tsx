import { Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useSearchParams } from 'react-router-dom'
import { LoadingComponent } from '../../../../../components/Loading'
import ShadowBox from '../../../../../components/ShadowBox'
import InforGrid from '../../../../../components/datagrid/InforGrid'
import useIngredientDiary from '../../../../../hooks/swr/useIngredientDiary'
import { formatDate } from '../../../../../types/time'
import { Wrapper } from '../../../product'

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
        width: 150,
        resizable: false,
        hideSortIcons: true,
    },
    {
        field: 'content',
        headerName: 'Nội dung',
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
    const [searchParams,] = useSearchParams()

    const params = Object.fromEntries([...searchParams])
    const { data, error, isLoading } = useIngredientDiary({ params })

    if (error) return "An error has occurred.";
    if (isLoading) return <LoadingComponent />;

    return (
        <ShadowBox sx={{ borderRadius: "20px" }}>
            <Wrapper gap={2}>
                <Typography variant='h2'>Nhật ký</Typography>
                <InforGrid
                    columns={cols}
                    rows={data.dataSource}
                    rowCount={data.rowCount}
                />
            </Wrapper>
        </ShadowBox>
    )
}

export default IngredientDiary