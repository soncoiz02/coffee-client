import { DataGrid, DataGridProps, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import React, { Dispatch, useEffect, useState } from 'react'
import { getQueryString } from '../../utils/queryString'
import { useSearchParams } from 'react-router-dom'


export type GridStateType = {
    page: number
    pageSize: number
}

type PropsType = {
    columns: GridColDef[]
    rows: any
    rowCount: number
}


type InforGridType = PropsType & DataGridProps

const InforGrid = ({ columns, rows, rowCount, ...other }: InforGridType) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [gridState, setGridState] = useState<GridStateType>({
        page: 0,
        pageSize: 10,
    })

    useEffect(() => {
        setQueryParams(gridState)
    }, [])

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
        <DataGrid
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
            rowCount={rowCount}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10, 20, 50]}
        />
    )
}

export default InforGrid