import { useEffect, useState } from 'react'
import { CustomContentModal, CustomModal } from '../../../../theme/styled-components/modal'
import { ResProductIngredient } from '../../../../types/product'
import { Button, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import InforGrid from '../../../../components/datagrid/InforGrid'

type PropsType = {
    ingredientData: ResProductIngredient[]
    resetIngredientData: () => void
}

const ModalIngredientList = ({ ingredientData, resetIngredientData }: PropsType) => {
    const [dataSource, setDataSource] = useState<any>([])
    const [gridCols, setGridCols] = useState<GridColDef[]>([])
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        resetIngredientData()
    };

    useEffect(() => {
        if (ingredientData && ingredientData.length > 0) {
            setOpen(true)
            getGridCols()
            getDataSource()
        }
        else {
            setOpen(false)
        }
    }, [])

    const getGridCols = () => {
        const productIngredients = ingredientData[0].data
        const cols: GridColDef[] = productIngredients.map((val) => ({
            field: val.ingredient.code,
            headerName: val.ingredient.name,
            width: 150,
            hideSortIcons: true,
            resizable: false,
            type: "number",
            align: "left",
            headerAlign: "left",
            valueFormatter: (value: any) => `${+value} (${val.ingredient.unit})`,
        }));
        if (ingredientData.length !== 1) {
            cols.unshift({
                field: "size",
                headerName: "Size",
                width: 100,
                hideSortIcons: true,
                resizable: false,
            });
        }
        setGridCols(cols)
    }

    const getDataSource = () => {
        const data = ingredientData.map((item, index: number) => {
            const ingredientQuantity: any = {}
            item.data.forEach((ingre) => {
                const field = ingre.ingredient.code
                ingredientQuantity[field] = ingre.quantity
            })

            return {
                ...(item.priceType !== "singlePrice" && {
                    size: item.priceType.split('size')[1]
                }),
                ...ingredientQuantity,
                id: `${item.priceType}-${index + 1}`
            }
        })
        setDataSource(data)
    }

    return (
        <CustomModal
            open={open}
            onClose={handleClose}
        >
            <CustomContentModal gap={2} sx={{ padding: '20px' }}>
                <Typography variant='h3'>Bảng nguyên liệu</Typography>
                <InforGrid
                    rows={dataSource}
                    columns={gridCols}
                    disableColumnMenu={true}
                    rowSelection={false}
                    hideFooter={true}
                />
            </CustomContentModal>
        </CustomModal>
    )
}

export default ModalIngredientList