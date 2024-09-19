import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import FilterForm, { FilterField } from "../../../components/FilterForm";
import ShadowBox from "../../../components/ShadowBox";
import useIngredientCategory from "../../../hooks/swr/useIngredientCategory";
import { Wrapper } from "../product";
import IngredientInfoGrid from "./sections/grid/IngredientInfoGrid";

const filterFields: FilterField = {
  defaultValues: {
    name: "",
    unit: "",
    category: "",
    status: true
  },
  validateSchema: yup.object().shape({
    name: yup.string(),
    unit: yup.string(),
    category: yup.string(),
    status: yup.boolean()
  }),
  fields: [
    {
      fieldName: 'name',
      gridCol: {
        xs: 6,
        md: 4
      },
      label: "Tên nguyên liệu",
      type: "text"
    },
    {
      fieldName: 'category',
      gridCol: {
        xs: 6,
        md: 4
      },
      label: "Danh mục nguyên liệu",
      type: "select",
      valueOptions: []
    },
    {
      fieldName: 'unit',
      gridCol: {
        xs: 6,
        md: 2
      },
      label: "Đơn vị",
      type: "text",
    },
    {
      fieldName: 'status',
      gridCol: {
        xs: 6,
        md: 2
      },
      label: "Trạng thái",
      type: "select",
      valueOptions: [
        {
          label: "Hoạt động",
          value: true
        },
        {
          label: "Đóng",
          value: false
        }
      ]
    }
  ]
}

const ListIngredients = () => {
  const [filterFieldData, setFilterFieldData] = useState<FilterField>(filterFields)
  const { data: { valueOptions }, isLoading } = useIngredientCategory()

  useEffect(() => {
    const updateField = filterFields.fields.map(item => {
      if (item.fieldName === 'category') {
        valueOptions?.unshift({
          label: "Tất cả",
          value: ""
        })
        return {
          ...item,
          valueOptions: valueOptions
        }
      }
      return {
        ...item
      }
    })
    setFilterFieldData({
      ...filterFieldData,
      fields: updateField
    })
  }, [isLoading])

  return (
    <ShadowBox sx={{ borderRadius: "20px" }}>
      <Wrapper gap={2}>
        <Typography variant="h2">Danh sách nguyên liệu</Typography>
        <FilterForm filterFields={filterFieldData} />
        <IngredientInfoGrid />
      </Wrapper>
    </ShadowBox>
  );
};

export default ListIngredients;
