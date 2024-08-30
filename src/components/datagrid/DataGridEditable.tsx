import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
type PropsType = {
  dataSource: any
  cols: GridColDef[]
}

const DataGridEditable = ({ dataSource, cols }: PropsType) => {
  return (
    <DataGrid
      rows={dataSource}
      columns={cols}
      disableColumnMenu={true}
      rowSelection={false}
      localeText={{
        footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} trên ${totalCount.toLocaleString()}`,
        footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString()} hàng được chọn`
            : `${count.toLocaleString()} hàng được chọn`,
      }}
    />
  )
}

export default DataGridEditable