import { Autocomplete, Checkbox, Grid, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dispatch, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { deepCopy } from "../../../../utils/deepCopy";

type PropsTypes = {
  methods: UseFormReturn;
  additionalValue: any;
  setAdditionalValue: Dispatch<any>;
  isSubmitSuccess: boolean;
};

const ingredientOpts = [
  {
    id: "1",
    name: "Bột cà phê",
    code: "botCaPhe",
  },
  {
    id: "2",
    name: "Sữa tươi không đường",
    code: "suaTuoiKhongDuong",
  },
  {
    id: "3",
    name: "Sữa đặc",
    code: "suaDac",
  },
  {
    id: "4",
    name: "Bột Onemix",
    code: "botOnemix",
  },
  {
    id: "5",
    name: "Bột cacao",
    code: "botCacao",
  },
];

const IngredientSection = ({ methods, additionalValue, setAdditionalValue, isSubmitSuccess }: PropsTypes) => {
  const [listIngredient, setListIngredient] = useState([]);
  const [quantityGrid, setQuantityGrid] = useState<{
    cols: GridColDef[];
    rows: any;
  }>({
    cols: [],
    rows: [],
  });

  const {
    formState: { isSubmitted },
    getValues,
    watch,
  } = methods;

  const priceType = watch("priceType");

  const handleChangeIngredient = (event: any, values: any) => {
    setListIngredient(values);
    const priceType = getValues("priceType");
    getIngredientQuantity(priceType, values);
  };

  const getIngredientQuantity = (priceType: number, ingredients: any) => {
    if (ingredients.length > 0) {
      const cols = ingredients.map((val: any) => ({
        field: val.code,
        headerName: val.name,
        width: 150,
        editable: true,
        hideSortIcons: true,
        resizable: false,
        type: "number",
        align: "left",
        headerAlign: "left",
        valueFormatter: (value: any) => `${+value} gram`,
      }));

      if (priceType === 0) {
        const row: any = {
          id: 1,
        };
        ingredients.forEach((val: any) => {
          row[val.code] = 0;
          row.sizeCode = "singlePrice";
          row.size = "Giá đơn";
        });
        setQuantityGrid({ cols, rows: [row] });
        updateAdditionalData(row, { cols, rows: [row] });
      } else if (priceType === 1) {
        const priceBySize = additionalValue.price;
        if (priceBySize !== null) {
          const rows = Object.keys(priceBySize).map((key: any) => {
            const row: any = {};
            ingredients.forEach((val: any) => {
              row[val.code] = 0;
              row.id = `${key}-${val.code}-${val.id}`;
              row.size = priceBySize[key].label;
              row.sizeCode = key;
            });
            return {
              ...row,
            };
          });
          cols.unshift({
            field: "size",
            headerName: "Size",
            width: 100,
            hideSortIcons: true,
            resizable: false,
          });
          setQuantityGrid({ cols, rows });
          rows.forEach((row) => updateAdditionalData(row, { cols, rows }));
        }
      }
    } else {
      setAdditionalValue({
        ...additionalValue,
        ingredient: null,
      });
      setQuantityGrid({ cols: [], rows: [] });
    }
  };

  useEffect(() => {
    setQuantityGrid({ cols: [], rows: [] });
    getIngredientQuantity(priceType, listIngredient);
  }, [priceType, additionalValue.price]);

  const validateIngredient = () => {
    if (listIngredient.length === 0 && isSubmitted) {
      return {
        isError: true,
        message: "Vui lòng chọn các nguyên liệu",
      };
    }
    return {
      isError: false,
      message: "",
    };
  };

  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    const cloneRow = deepCopy(newRow);
    updateAdditionalData(cloneRow, quantityGrid);

    return newRow;
  };

  const updateAdditionalData = (data: any, quantityGrid: any) => {
    const fullData = quantityGrid.rows.map((row: any) => {
      if (row.id === data.id) {
        return {
          ...row,
          ...data,
        };
      }
      return row;
    });

    setQuantityGrid({ ...quantityGrid, rows: fullData });

    const listIngre = deepCopy(fullData).map((item: any) => {
      const cloneItem = deepCopy(item);
      delete cloneItem.id;
      delete cloneItem.sizeCode;
      if (cloneItem.size) delete cloneItem.size;
      const ingredients = Object.keys(cloneItem).map((key: string) => {
        const ingre = ingredientOpts.find((p) => p.code === key);
        return {
          ...ingre,
          quantity: cloneItem[key],
        };
      });
      return {
        ingredients,
        type: item.sizeCode,
        label: item.size,
      };
    });

    let additionalVal = null;
    if (priceType === 0) {
      additionalVal = [
        {
          type: {
            code: "singlePrice",
            label: "Giá đơn",
          },
          ingredients: listIngre[0].ingredients,
        },
      ];
    } else if (priceType === 1) {
      additionalVal = listIngre.map((ingre: any) => {
        return {
          type: {
            code: ingre.type,
            label: ingre.label,
          },
          ingredients: ingre.ingredients,
        };
      });
    }

    setAdditionalValue({
      ...additionalValue,
      ingredient: additionalVal,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={ingredientOpts}
          disableCloseOnSelect
          value={listIngredient}
          disabled={isSubmitSuccess}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeIngredient}
          limitTags={7}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={option.id} {...optionProps}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Chọn nguyên liệu" error={validateIngredient().isError} helperText={validateIngredient().message} />
          )}
        />
      </Grid>
      {quantityGrid.cols.length > 0 && (
        <Grid item xs={12}>
          <DataGrid
            rows={quantityGrid.rows}
            columns={quantityGrid.cols}
            disableColumnMenu={true}
            rowSelection={false}
            hideFooter={true}
            processRowUpdate={handleProcessRowUpdate}
            onProcessRowUpdateError={(error: any) => {
              console.log(error);
            }}
            sx={{
              ...(isSubmitSuccess && {
                pointerEvents: "none",
                opacity: 0.5,
              }),
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default IngredientSection;
