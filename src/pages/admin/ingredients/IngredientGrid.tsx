import React from "react";
import ShadowBox from "../../../components/ShadowBox";
import { Checkbox, FormControl, IconButton, MenuItem, Select, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Wrapper } from "../product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faFileExcel, faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, MuiEvent } from "@mui/x-data-grid";

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
    editable: true,
    resizable: false,
    hideSortIcons: true,
    flex: 1,
  },

  {
    field: "unit",
    headerName: "Đơn vị đo",
    width: 150,
    editable: true,
    resizable: false,
    hideSortIcons: true,
    type: "singleSelect",
    valueOptions: [
      {
        label: "Mililit (ml)",
        value: "ml",
      },
      {
        label: "Lít (l)",
        value: "l",
      },
      {
        label: "Gram (g)",
        value: "gram",
      },
      {
        label: "Kilogram (kg)",
        value: "kg",
      },
    ],
  },
  {
    field: "quantity",
    headerName: "Khối lượng",
    width: 200,
    editable: true,
    resizable: false,
    hideSortIcons: true,
    headerAlign: "center",
    align: "center",
    type: "number",
  },
  {
    field: "category",
    headerName: "Danh mục",
    width: 200,
    editable: true,
    resizable: false,
    hideSortIcons: true,
    type: "singleSelect",
    valueOptions: [
      {
        label: "Topping",
        value: "topping",
      },
      {
        label: "Nguyên liệu pha chế",
        value: "ingredient",
      },
    ],
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    editable: true,
    resizable: false,
    hideSortIcons: true,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return <Checkbox disabled value={params} />;
    },
    renderEditCell: (params) => {
      return <Checkbox />;
    },
  },
  {
    field: "action",
    headerName: "Hành động",
    width: 150,
    resizable: false,
    hideSortIcons: true,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
        <Tooltip title="Xóa dòng">
          <IconButton color="error">
            <FontAwesomeIcon icon={faTrashCan} />
          </IconButton>
        </Tooltip>
      );
    },
  },
];

const rows = [
  {
    no: 1,
    name: "",
    id: 1,
  },
  {
    no: 2,
    name: "",
    id: 2,
  },
  {
    no: 3,
    name: "",
    id: 3,
  },
  {
    no: 4,
    name: "",
    id: 4,
  },
  {
    no: 5,
    name: "",
    id: 5,
  },
];

const IngredientGrid = () => {
  const theme = useTheme();

  const handleCellKeyDown = (params: GridCellParams, event: MuiEvent, details: GridCallbackDetails) => {
    console.log(event);
  };

  return (
    <ShadowBox sx={{ borderRadius: "20px" }}>
      <Wrapper gap={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">Tạo danh sách nguyên liệu</Typography>
          <Stack direction="row" alignItems="center" gap={2}>
            <Tooltip title="Tải file mẫu">
              <FontAwesomeIcon cursor="pointer" fontSize="24px" color={theme.palette.primary.main} icon={faFileArrowDown} />
            </Tooltip>
            <Tooltip title="Nhập file excel">
              <FontAwesomeIcon cursor="pointer" fontSize="24px" color={theme.palette.primary.main} icon={faFileExcel} />
            </Tooltip>
            <Tooltip title="Thêm dòng">
              <FontAwesomeIcon cursor="pointer" fontSize="24px" color={theme.palette.primary.main} icon={faPlusCircle} />
            </Tooltip>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu={true}
            rowSelection={false}
            hideFooter={true}
            // processRowUpdate={handleProcessRowUpdate}
            onProcessRowUpdateError={(error: any) => {
              console.log(error);
            }}
            onCellKeyDown={handleCellKeyDown}
          />
        </Stack>
      </Wrapper>
    </ShadowBox>
  );
};

export default IngredientGrid;
