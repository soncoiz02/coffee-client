import React, { useState } from 'react'
import { LoadingComponent } from '../../../../../components/Loading';
import InforGrid from '../../../../../components/datagrid/InforGrid';
import useIngredientGridData from '../../../../../hooks/swr/useIngredientGridData';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { convertNumberWithCommas } from '../../../../../utils/convertNumber';
import { Button, Chip, IconButton, Popover, Stack, styled, Tooltip, Typography } from '@mui/material';
import Status from '../../../../../components/Status';
import { setUpdateQuantity } from '../../../../../redux/feature/ingredientSlice';
import { faCircleMinus, faCirclePlus, faCog, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../redux/hook';
import ModalUpdateQuantity from '../modals/ModalUpdateQuantity';


const ActionButton = styled(Button)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0 10px",
    minWidth: "150px",
    padding: "10px",
}));

const IngredientInfoGrid = () => {
    const columns: GridColDef[] = [
        {
            field: "no",
            headerName: "STT",
            width: 50,
            headerAlign: "center",
            align: "center",
            resizable: false,
            hideSortIcons: true,
        },
        {
            field: "name",
            headerName: "Tên nguyên liệu",
            resizable: false,
            hideSortIcons: true,
            flex: 1,
        },
        {
            field: "quantity",
            headerName: "Khối lượng",
            width: 150,
            resizable: false,
            hideSortIcons: true,
            headerAlign: "center",
            align: "center",
            valueFormatter: (value: number) => convertNumberWithCommas(value),
        },
        {
            field: "unit",
            headerName: "Đơn vị",
            width: 100,
            resizable: false,
            hideSortIcons: true,
            renderCell: (params) => <Chip label={params.value} />,
        },
        {
            field: "category",
            headerName: "Danh mục",
            width: 200,
            resizable: false,
            hideSortIcons: true,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 150,
            resizable: false,
            hideSortIcons: true,
            headerAlign: "center",
            align: "center",
            renderCell: (params) =>
                <Stack height='100%' justifyContent='center'>
                    <Status title={params.value ? "Hoạt động" : "Đóng"} type={params.value ? 'success' : 'error'} />
                </Stack>,
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 150,
            resizable: false,
            hideSortIcons: true,
            headerAlign: "center",
            align: "center",
            renderCell: (params: GridCellParams) => {
                const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

                const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                const open = Boolean(anchorEl);

                const { id, row } = params;
                const handleUpdateQuantity = (type: string) => {
                    handleClose()
                    dispatch(setUpdateQuantity({
                        id,
                        type,
                        unit: row.unit,
                        quantity: row.quantity,
                        name: row.name
                    }))
                }

                const listActions = [
                    {
                        title: 'Chỉnh sửa',
                        icon: faCog,
                        color: 'info'
                    },
                    {
                        title: 'Thêm khối lượng',
                        icon: faCirclePlus,
                        action: () => handleUpdateQuantity('add-quantity'),
                        color: 'success'
                    },
                    {
                        title: 'Bớt khối lượng',
                        icon: faCircleMinus,
                        action: () => handleUpdateQuantity('remove-quantity'),
                        color: 'error',
                        disabled: row.quantity === 0
                    }
                ]

                return (
                    <>
                        <Tooltip title="Hành động" placement="top">
                            <IconButton color="info" onClick={handleClick}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </IconButton>
                        </Tooltip>
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            sx={{
                                "& .MuiPaper-root": {
                                    boxShadow: "0 3px 5px 1px rgba(0,0,0,0.02)",
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "10px",
                                },
                            }}
                        >
                            <Stack gap={0.5}>
                                {
                                    listActions.map((item: any, index: number) => (
                                        <ActionButton disabled={item.disabled || false} color={item.color} key={index} onClick={item.action}>
                                            <FontAwesomeIcon icon={item.icon} />
                                            <Typography variant="subtitle1" fontWeight={500}>{item.title}</Typography>
                                        </ActionButton>
                                    ))
                                }
                            </Stack>
                        </Popover>
                    </>
                );
            },
        },
    ];
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const params = Object.fromEntries([...searchParams]);
    const { data, isLoading, error, mutate } = useIngredientGridData({ params })
    if (error) return "An error has occurred.";
    if (isLoading) return <LoadingComponent />;

    const mutateData = () => {
        mutate()
    }
    return (
        <>
            <InforGrid
                columns={columns}
                rows={data.dataSource}
                rowCount={data.rowCount}
                autoHeight={true}
            />
            <ModalUpdateQuantity
                mutateData={mutateData}
            />
        </>
    )
}

export default IngredientInfoGrid