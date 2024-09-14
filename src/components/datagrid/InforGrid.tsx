import { alpha, gridClasses, styled } from '@mui/material'
import { DataGrid, DataGridProps, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getQueryString } from '../../utils/queryString'
import CustomPagination from './CustomGridPagination'


export type GridStateType = {
    page: number
    pageSize: number
}

type PropsType = {
    columns: GridColDef[]
    rows: any
    rowCount?: number
}


type InforGridType = PropsType & DataGridProps

const CustomGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-container--top [role=row]': {
        background: theme.palette.grey[200],
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            color: theme.palette.text.secondary
        }
    },
    '& .MuiDataGrid-row': {
        '& .MuiDataGrid-cell': {
            borderBottom: '1px dashed rgba(0,0,0,0.1)',
            borderTop: 'none'
        },
    },
    '& .MuiTablePagination-displayedRows': {
        display: 'none'
    },
    '& .MuiDataGrid-filler > div': {
        border: 'none'
    },
}))

const InforGrid = ({ columns, rows, rowCount, ...other }: InforGridType) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [gridState, setGridState] = useState<GridStateType>({
        page: 0,
        pageSize: 10,
    })

    const handlePaginationModelChange = (model: GridPaginationModel, detail: GridCallbackDetails) => {
        const { page, pageSize } = model

        const newGridState = {
            ...gridState,
            page,
            pageSize
        }

        setGridState(newGridState)
        setQueryParams(newGridState)
    }

    const setQueryParams = (gridState: GridStateType) => {
        const { page, pageSize } = gridState
        const params = getQueryString({
            page: page + 1,
            limit: pageSize
        })
        setSearchParams(params)
    }

    return (
        <CustomGrid
            columns={columns}
            rows={rows}
            disableColumnMenu={true}
            rowSelection={false}
            paginationModel={{
                page: gridState.page,
                pageSize: gridState.pageSize
            }}
            {...other}
            paginationMode='server'
            rowCount={rowCount || 0}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10, 20, 50]}
            slots={{
                pagination: CustomPagination,
            }}
            localeText={{
                noRowsLabel: 'Không có dữ liệu'
            }}
        />
    )
}

export default InforGrid