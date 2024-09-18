import { faFileArrowDown, faFileExcel, faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, IconButton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShadowBox from "../../../../../components/ShadowBox";
import { CONSTANTS } from "../../../../../constants";
import { hideLoading, showLoading } from "../../../../../redux/feature/loadingSlice";
import { useAppDispatch } from "../../../../../redux/hook";
import { IngredientServices } from "../../../../../services/ingredient/ingredientServices";
import { toastServices } from "../../../../../services/toast/toastServices";
import { BaseIngredient, IngredientDataSource } from "../../../../../types/ingredient";
import { deepCopy } from "../../../../../utils/deepCopy";
import { Wrapper } from "../../../product";
import ModalAlertValidate from "../modals/ModalAlertValidate";

const defaultIngredientValues = [
  {
    no: 1,
    name: "",
    id: 1,
    unit: "",
    quantity: 0,
    category: "",
    status: true,
    code: "",
    isEdit: false,
  },
  {
    no: 2,
    name: "",
    id: 2,
    unit: "",
    quantity: 0,
    category: "",
    status: true,
    code: "",
    isEdit: false,
  },
  {
    no: 3,
    name: "",
    id: 3,
    unit: "",
    quantity: 0,
    category: "",
    status: true,
    code: "",
    isEdit: false,
  },
  {
    no: 4,
    name: "",
    id: 4,
    unit: "",
    quantity: 0,
    category: "",
    status: true,
    code: "",
    isEdit: false,
  },
  {
    no: 5,
    name: "",
    id: 5,
    unit: "",
    quantity: 0,
    category: "",
    status: true,
    code: "",
    isEdit: false,
  },
];

const IngredientGrid = () => {
  const theme = useTheme();
  const [gridCols, setGridCols] = useState<GridColDef[]>([
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
      cellClassName: (params) => {
        const { value, row, id } = params;
        if ((row.isEdit && !value) || validateDuplicateName(value, id)) return "error-cell";
        return "";
      },
      flex: 1,
    },
    {
      field: "unit",
      headerName: "Đơn vị định lượng",
      width: 150,
      editable: true,
      resizable: false,
      hideSortIcons: true,
      type: "singleSelect",
      valueOptions: CONSTANTS.LOCAL_OPTIONS.UNIT_OPTIONS,
      cellClassName: (params) => {
        const { value, row } = params;
        if (row.isEdit && !value) return "error-cell";
        return "";
      },
    },
    {
      field: "quantity",
      headerName: "Định lượng",
      width: 200,
      editable: true,
      resizable: false,
      hideSortIcons: true,
      headerAlign: "center",
      align: "center",
      type: "number",
      cellClassName: (params) => {
        const { value, row } = params;
        if (row.isEdit && !value) return "error-cell";
        return "";
      },
    },
    {
      field: "category",
      headerName: "Danh mục",
      width: 200,
      editable: true,
      resizable: false,
      hideSortIcons: true,
      cellClassName: (params) => {
        const { value, row } = params;
        if (row.isEdit && !value) return "error-cell";
        return "";
      },
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
        const { value } = params;
        return <Checkbox disabled value={value} checked={value} />;
      },
      renderEditCell: (params) => {
        const { value, api } = params;
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const newVal = e.target.value === "true" ? true : false;
          api.setEditCellValue({ ...params, value: !newVal });
        };
        return <Checkbox value={value} checked={value} onChange={handleChange} />;
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
      renderCell: (params: GridCellParams) => {
        const { id } = params;
        return (
          <Tooltip title="Xóa dòng">
            <IconButton color="error" onClick={(e: any) => handleDeleteRow(id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ]);
  const [dataSource, setDataSource] = useState<IngredientDataSource[]>(defaultIngredientValues);
  const [listGridErrors, setListGridErrors] = useState<any>([]);
  const [isGridLoading, setIsGridLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsGridLoading(true);
    handleGetIngredientCategory();
  }, []);

  const handleGetIngredientCategory = async () => {
    try {
      const res = await IngredientServices.getIngredientCategories("/get-list");
      if (res.status === "success") {
        const categoryOpts = res.data.map((item) => ({
          label: item.name,
          value: item._id,
        }));

        const colsUpdate = gridCols.map((col: any) => {
          if (col.field === 'category') {
            col.type = "singleSelect"
            col.valueOptions = categoryOpts
          }
          return col
        })

        setGridCols(colsUpdate)
      }
    } catch (error: any) {
      toastServices.error(error.message);
    } finally {
      setIsGridLoading(false);
    }
  };

  const handleAddBlankRow = () => {
    const newId = dataSource.length + 1;
    const newBlankData = {
      no: newId,
      name: "",
      id: newId,
      unit: "",
      quantity: 0,
      category: "",
      status: true,
      code: "",
      isEdit: false,
    };

    setDataSource([...dataSource, newBlankData]);
  };

  const handleDeleteRow = (rowId: any) => {
    const filterRow = dataSource.filter((p: any) => p.id !== rowId).map((p: any, index: number) => ({ ...p, id: index + 1, no: index + 1 }));
    setDataSource(filterRow);
  };

  const onProcessRowUpdate = (newRow: IngredientDataSource, oldRow: IngredientDataSource) => {
    const cloneRow = deepCopy<IngredientDataSource>(newRow);
    Object.keys(cloneRow).forEach((key) => {
      let fieldKey = key as keyof typeof cloneRow
      if (typeof cloneRow[fieldKey] === "string") {
        cloneRow[fieldKey] = cloneRow[fieldKey].trim();
      }
    });
    if (JSON.stringify(cloneRow) === JSON.stringify(oldRow)) {
      return cloneRow;
    }
    const listValidates = getValidateRowValue(cloneRow);
    listValidates.forEach((item: any) => {
      const { message, field, defaultValue } = item;
      toastServices.error(message);
      cloneRow[field as keyof typeof cloneRow] = defaultValue;
    });
    cloneRow.isEdit = true;
    handleRowUpdate(cloneRow);
    return cloneRow;
  };

  const handleRowUpdate = (rowValue: IngredientDataSource) => {
    const cloneDataSource = deepCopy(dataSource);
    cloneDataSource[rowValue.no - 1] = rowValue;
    setDataSource(cloneDataSource);
  };

  const getValidateRowValue = (rowValue: any) => {
    const listValidates: any = [];
    Object.keys(rowValue).forEach((key: string) => {
      if (key === "quantity") {
        if (+rowValue[key] < 0) {
          listValidates.push({
            field: key,
            defaultValue: 0,
            message: "Khối lượng phải lớn hơn 0!",
          });
        }
      }
      if (key === "name") {
        if (validateDuplicateName(rowValue[key], rowValue.id)) {
          listValidates.push({
            field: key,
            defaultValue: rowValue[key],
            message: "Tên nguyên liệu không được trùng",
          });
        }
      }
    });

    return listValidates;
  };

  const handleSubmitData = () => {
    const cloneDataSource = deepCopy(dataSource);
    const datas = cloneDataSource.filter((p: IngredientDataSource) => p.isEdit === true);
    if (datas.length === 0) {
      return toastServices.error("Chưa nhập dữ liệu");
    }
    const listErrors = getValidateDataSubmit(datas);
    if (listErrors.length > 0) {
      setListGridErrors(listErrors);
      return;
    }
    handleCreateData(datas);
  };

  const handleCreateData = async (data: IngredientDataSource[]) => {
    dispatch(showLoading());
    try {
      const convertData: Omit<BaseIngredient, "_id">[] = deepCopy<IngredientDataSource[]>(data).map((p: IngredientDataSource) => ({
        name: p.name,
        unit: p.unit,
        quantity: p.quantity,
        status: p.status,
        category: p.category,
        code: p.code
      }));

      const res = await IngredientServices.createIngredients(convertData);
      if (res.status === "success") {
        toastServices.success(res.message);
        navigate("/admin/ingredient");
      }
    } catch (error: any) {
      toastServices.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const getValidateDataSubmit = (datas: any) => {
    const requiredField = ["name", "category", "quantity", "unit"];
    const listError: any = [];
    datas.forEach((data: any) => {
      const errors: {
        message: string;
        field: string;
      }[] = [];
      Object.keys(data).forEach((key) => {
        if (requiredField.includes(key)) {
          if (!data[key]) {
            errors.push({
              field: key,
              message: "Chưa nhập dữ liệu.",
            });
          }
        }
        if (key === "quantity") {
          if (data[key] <= 0) {
            errors.push({
              field: key,
              message: "Định lượng lớn hơn 0.",
            });
          }
        }
        if (key === "name") {
          if (validateDuplicateName(data[key], data.id)) {
            errors.push({
              field: key,
              message: "Bị trùng.",
            });
          }
        }
      });

      if (errors.length > 0) {
        listError.push({
          row: data.no,
          errors,
        });
      }
    });

    return listError;
  };

  const validateDuplicateName = (name: string, rowId: any) => {
    if (name) {
      const existName = dataSource.find((data) => data.name === name && data.id !== rowId);
      return !!existName;
    }
    return false;
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
              <FontAwesomeIcon
                onClick={(e: any) => handleAddBlankRow()}
                cursor="pointer"
                fontSize="24px"
                color={theme.palette.primary.main}
                icon={faPlusCircle}
              />
            </Tooltip>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <DataGrid
            rows={dataSource}
            columns={gridCols}
            disableColumnMenu={true}
            rowSelection={false}
            hideFooter={true}
            loading={isGridLoading}
            processRowUpdate={onProcessRowUpdate}
            onProcessRowUpdateError={(error: any) => {
              console.log(error);
            }}
            autoHeight={true}
            sx={{
              "& .error-cell": {
                background: "red",
              },
              WebkitUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
          />
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant="body2" color="text.secondary">
              *Lưu ý: Những ô dữ liệu báo đỏ khi chưa nhập đủ dữ liệu hoặc sai định dạng dữ liệu.
            </Typography>
            <Button variant="contained" sx={{ alignSelf: "flex-end" }} onClick={(e: any) => handleSubmitData()}>
              Lưu dữ liệu
            </Button>
          </Stack>
        </Stack>
      </Wrapper>
      {listGridErrors.length > 0 && <ModalAlertValidate listErrors={listGridErrors} />}
    </ShadowBox>
  );
};

export default IngredientGrid;
