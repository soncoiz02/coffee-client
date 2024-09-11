import React, { useEffect, useState } from "react";
import ShadowBox from "../../../components/ShadowBox";
import { Button, Chip, IconButton, Popover, Stack, styled, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faCog, faEllipsis, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "../product";
import { IngredientDataSource } from "../../../types/ingredient";
import { toastServices } from "../../../services/toast/toastServices";
import { useLocation, useSearchParams } from "react-router-dom";
import { IngredientServices } from "../../../services/ingredient/ingredientServices";
import queryString from "query-string";
import { getQueryString } from "../../../utils/queryString";
import { convertNumberWithCommas } from "../../../utils/convertNumber";
import { CONSTANTS } from "../../../constants";

type GridStateType = {
  isLoading: boolean;
  page: number;
  pageSize: number;
};

const ActionButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0 10px",
  minWidth: "150px",
  padding: "10px",
}));

const ListIngredients = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
      renderCell: (params) => <Chip color="warning" label={params.value} />,
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
      renderCell: (params) => <Chip color={params.value ? "success" : "error"} label={params.value ? "Hoạt động" : "Dừng hoạt động"} />,
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
        const { id } = params;
        return (
          <>
            <Tooltip title="Xóa dòng">
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
                <ActionButton color="info">
                  <FontAwesomeIcon icon={faCog} />
                  <Typography variant="h5">Chỉnh sửa</Typography>
                </ActionButton>
                <ActionButton>
                  <FontAwesomeIcon icon={faCirclePlus} />
                  <Typography variant="h5">Thêm khối lượng</Typography>
                </ActionButton>
                <ActionButton color="error">
                  <FontAwesomeIcon icon={faCircleMinus} />
                  <Typography variant="h5">Bớt khối lượng</Typography>
                </ActionButton>
                <ActionButton color="error">
                  <FontAwesomeIcon icon={faTrashCan} />
                  <Typography variant="h5">Xóa</Typography>
                </ActionButton>
              </Stack>
            </Popover>
          </>
        );
      },
    },
  ];

  const [dataSource, setDataSource] = useState<IngredientDataSource[]>([]);
  const [gridState, setGridState] = useState<GridStateType>({
    isLoading: false,
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGetListIngredient = async (signal: any) => {
    setGridState({ ...gridState, isLoading: true });
    try {
      const params = Object.fromEntries([...searchParams]);
      const res = await IngredientServices.getIngredientGridData({ signal, params: params });
      if (res.status === "success") {
        const data = res.data.map((item, index: number) => ({
          no: index + 1,
          id: item._id,
          category: item.category.name,
          name: item.name,
          unit: item.unit,
          quantity: item.quantity,
          status: item.status,
          isEdit: false,
          code: item.code,
        }));
        setDataSource(data);
        setRowCount(res.meta.total);
      }
    } catch (error: any) {
      toastServices.error(error.message);
    } finally {
      setGridState({ ...gridState, isLoading: false });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    handleGetListIngredient(signal);
    return () => {
      abortController.abort();
    };
  }, [searchParams]);

  const setQueryParams = (gridState: GridStateType) => {
    const { page, pageSize } = gridState;
    const params = getQueryString({
      page: page + 1,
      limit: pageSize,
    });
    setSearchParams(params);
  };

  const handlePaginationModelChange = (model: GridPaginationModel, detail: GridCallbackDetails) => {
    const { page, pageSize } = model;
    console.log(model);

    const newGridState = {
      ...gridState,
      page,
      pageSize,
    };

    setGridState(newGridState);
    setQueryParams(newGridState);
  };

  return (
    <ShadowBox sx={{ borderRadius: "20px" }}>
      <Wrapper gap={2}>
        <Typography variant="h2">Danh sách nguyên liệu</Typography>
        <DataGrid
          columns={columns}
          rows={dataSource}
          disableColumnMenu={true}
          rowSelection={false}
          loading={gridState.isLoading}
          paginationModel={{
            page: gridState.page,
            pageSize: gridState.pageSize,
          }}
          paginationMode="server"
          rowCount={rowCount}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[10, 20, 50]}
          autoHeight={true}
        />
      </Wrapper>
    </ShadowBox>
  );
};

export default ListIngredients;
