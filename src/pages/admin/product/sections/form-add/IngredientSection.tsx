import { Autocomplete, Checkbox, Grid, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dispatch, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BaseIngredient } from "../../../../../types/ingredient";
import { deepCopy } from "../../../../../utils/deepCopy";
import { useParams } from "react-router-dom";
import { formatToThousandSeparator } from "../../../../../utils/formatNumber";

type PropsTypes = {
  methods: UseFormReturn;
  additionalValue: any;
  setAdditionalValue: Dispatch<any>;
  isSubmitSuccess: boolean;
  listIngredientOtps: BaseIngredient[]
};

const IngredientSection = ({ methods, additionalValue, setAdditionalValue, isSubmitSuccess, listIngredientOtps }: PropsTypes) => {
  const [listIngredient, setListIngredient] = useState([]);
  const [quantityGrid, setQuantityGrid] = useState<{
    cols: GridColDef[];
    rows: any;
  }>({
    cols: [],
    rows: [],
  });

  const { productCode } = useParams()

  const {
    formState: { isSubmitted },
    getValues,
    watch,
  } = methods;

  const priceType = watch("priceType");

  const handleChangeIngredient = (event: any, values: any) => {
    setListIngredient(values);
  };

  const getGridCols = (ingredients: any, priceType: number) => {
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
      valueFormatter: (value: any) => `${formatToThousandSeparator(+value ? +value : 0)} gram`,
    }));

    if (priceType === 1) {
      cols.unshift({
        field: "size",
        headerName: "Size",
        width: 100,
        hideSortIcons: true,
        resizable: false,
      });
    }
    return cols
  }

  const getGridRows = (ingredients: any, priceType: number) => {
    let rows = quantityGrid.rows
    if (priceType === 0) {
      if (rows.length === 0) {
        const row: any = {}
        ingredients.forEach((val: any) => {
          row[val.code] = 0;
          row.sizeCode = "normal";
          row.size = "Normal";
          row._id = val._id
        });
        rows.push(row)
      }
      else {
        const row = rows[0]
        ingredients.forEach((val: any) => {
          if (!row[val.code]) {
            row[val.code] = 0;
          }
        })
      }
    }
    else if (priceType === 1) {
      const priceBySize = additionalValue.priceBySize;
      if (priceBySize !== null) {
        if (rows.length === 0) {
          const rowsByPrice = Object.keys(priceBySize).map((key: any) => {
            const row: any = {};
            ingredients.forEach((val: any) => {
              row[val.code] = 0;
              row.size = priceBySize[key].label;
              row.sizeCode = key;
              row._id = val._id
            });
            return {
              ...row,
            };
          })
          rows = [...rowsByPrice]
        }
        else {
          rows.forEach((row: any) => {
            ingredients.forEach((val: any) => {
              if (!row[val.code]) {
                row[val.code] = 0;
              }
            })
          })
        }
      }
    }
    return rows
  }
  //   if (ingredients.length > 0) {
  //     const cols = getGridCols(ingredients, priceType)

  //     if (priceType === 0) {
  //       const row: any = {
  //         id: 1,
  //       };
  //       ingredients.forEach((val: any) => {
  //         row[val.code] = 0;
  //         row.sizeCode = "singlePrice";
  //         row.size = "Giá đơn";
  //         row._id = val._id
  //       });
  //       setQuantityGrid({ cols, rows: [row] });
  //       updateAdditionalData(row, { cols, rows: [row] });
  //     } else if (priceType === 1) {
  //       const priceBySize = additionalValue.priceBySize;
  //       if (priceBySize !== null) {
  //         const rows = Object.keys(priceBySize).map((key: any) => {
  //           const row: any = {};
  //           ingredients.forEach((val: any) => {
  //             row[val.code] = 0;
  //             row.id = `${key}-${val.code}-${val.id}`;
  //             row.size = priceBySize[key].label;
  //             row.sizeCode = key;
  //             row._id = val._id
  //           });
  //           return {
  //             ...row,
  //           };
  //         });
  //         setQuantityGrid({ cols, rows });
  //         rows.forEach((row) => updateAdditionalData(row, { cols, rows }));
  //       }
  //     }
  //   } else {
  //     setAdditionalValue({
  //       ...additionalValue,
  //       ingredient: null,
  //     });
  //     setQuantityGrid({ cols: [], rows: [] });
  //   }
  // };

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
    handleSetAdditionalData(cloneRow)
    return newRow;
  };

  const handleSetAdditionalData = (newRow?: any) => {
    let rows = deepCopy(quantityGrid.rows)
    if (newRow) {
      rows = rows.map((item: any) => {
        if (item.id === newRow.id) {
          return newRow
        }
        return item
      })
    }


    const data = rows.map((row: any) => {
      const ingredients = Object.keys(row).filter((key: any) => listIngredient.find((p: any) => p.code === key)).map((key: any) => {
        const detailIngre = listIngredient.find((p: any) => p.code === key)
        if (detailIngre) {
          return {
            quantity: row[key],
            ingredients: detailIngre
          }
        }
      })

      return {
        type: {
          code: row.sizeCode,
          label: row.size
        },
        ingredients
      }
    })

    setAdditionalValue({
      ...additionalValue,
      ingredients: data
    })
  }

  const handleGetGridData = () => {
    const cols = getGridCols(listIngredient, priceType)
    const rows = getGridRows(listIngredient, priceType)
    setQuantityGrid({ cols, rows });
  }

  const handleGetIngredient = () => {
    const { ingredients } = additionalValue
    if (ingredients && ingredients.length > 0) {
      const listIngre = ingredients[0].ingredients.map((item: any) => ({ ...item.ingredients }))
      const gridRows = ingredients.map((ingre: any) => {
        const quantityData: any = {}
        ingre.ingredients.forEach((item: any) => {
          quantityData[item.ingredients.code] = item.quantity
          quantityData._id = item.ingredients._id
        })
        return {
          sizeCode: ingre.type.code,
          size: ingre.type.label,
          ...quantityData
        }

      })
      setListIngredient(listIngre)
      setQuantityGrid({
        ...quantityGrid,
        rows: gridRows
      })
    }
  }

  useEffect(() => {
    setListIngredient([])
  }, [priceType, productCode])

  useEffect(() => {
    if (listIngredient.length > 0) {
      handleGetGridData()
    }
    else {
      setQuantityGrid({ cols: [], rows: [] });
    }
    handleSetAdditionalData()
  }, [listIngredient])

  useEffect(() => {
    if (productCode) {
      handleGetIngredient()
    }
  }, [additionalValue.ingredients])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          options={listIngredientOtps}
          disableCloseOnSelect
          value={listIngredient}
          disabled={isSubmitSuccess}
          getOptionLabel={(option) => option.name}
          onChange={handleChangeIngredient}
          limitTags={7}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={option._id} {...optionProps}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </li>
            );
          }}
          isOptionEqualToValue={(options, value) => {
            return options._id === value._id
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
            getRowId={(row) => {
              return `${row.sizeCode}${row._id}`
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default IngredientSection;
