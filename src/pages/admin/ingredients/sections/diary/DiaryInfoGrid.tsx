import React from 'react'
import InforGrid from '../../../../../components/datagrid/InforGrid'
import useIngredientDiary from '../../../../../hooks/swr/useIngredientDiary'
import { useSearchParams } from 'react-router-dom'
import { LoadingComponent } from '../../../../../components/Loading'
import { formatDate } from '../../../../../utils/time'
import { GridColDef } from '@mui/x-data-grid'

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

const DiaryInfoGrid = () => {
    const [searchParams,] = useSearchParams()

    const params = Object.fromEntries([...searchParams])
    const { data, error, isLoading } = useIngredientDiary({ params })

    if (error) return "An error has occurred.";
    if (isLoading) return <LoadingComponent />;
    return (
        <InforGrid
            columns={cols}
            rows={data.dataSource}
            rowCount={data.rowCount}
        />
    )
}

export default DiaryInfoGrid