import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
type PropsType = {
  dataSource: any
  cols: GridColDef[]
}

const DataGridEditable = ({ dataSource, cols }: PropsType) => {
  return (
    <DataGrid rows={dataSource} columns={cols} />
  )
}

export default DataGridEditable