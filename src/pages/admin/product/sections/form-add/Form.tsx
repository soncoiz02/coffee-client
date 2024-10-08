import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import RHFProvider from "../../../../../components/RHF/RHFProvider";
import RHFSelect from "../../../../../components/RHF/RHFSelect";
import RHFTextField from "../../../../../components/RHF/RHFTextField";
import { BaseProductSize, BaseProductType, ProductType } from "../../../../../types/product";
import IngredientSection from "./IngredientSection";
import PriceSection from "./PriceSection";
import UploadImg from "./UploadImg";
import useDebounce from "../../../../../hooks/useDebounce";
import { toastServices } from "../../../../../services/toast/toastServices";
import { useAppDispatch } from "../../../../../redux/hook";
import { hideLoading, showLoading } from "../../../../../redux/feature/loadingSlice";
import { ProductServices } from "../../../../../services/product/productServices";
import { CategoryServices } from "../../../../../services/category/categoryServices";
import { BaseCategory } from "../../../../../types/category";
import { IngredientServices } from "../../../../../services/ingredient/ingredientServices";
import { BaseIngredient } from "../../../../../types/ingredient";
import { useParams } from "react-router-dom";
import { stringThounsandToNumber } from "../../../../../utils/formatNumber";

export interface DataType extends Omit<BaseProductType, '_id'> {
  priceType: 0 | 1;
  singlePrice?: string;
}

const initialData: DataType = {
  name: "",
  img: "",
  category: "",
  priceType: 0,
  singlePrice: "0",
  status: true,
};

const formSchema = yup.object().shape<any>({
  name: yup.string().trim().required("Vui lòng nhập tên sản phẩm"),
  category: yup.string().required("Vui lòng chọn danh mục"),
  img: yup.string().trim(),
  priceType: yup.number(),
  singlePrice: yup
    .string()
    .when("priceType", (priceType, schema) => {
      if (priceType[0] === 0) {
        return schema.required("Nhập giá sản phẩm")
          .test("positive", "Nhập giá lớn hơn 0", (value) => {
            if (!value) return
            return stringThounsandToNumber(value) > 0
          });
      }
      return schema;
    }),
  status: yup.boolean(),
});

type PropsType = {
  formId: string;
  setProductName: (id: string, name: string) => void;
};

const statusOpts = [
  {
    id: 1,
    value: true,
    text: "Mở bán",
  },
  {
    id: 2,
    value: false,
    text: "Ngừng bán",
  },
];

const Form = ({ formId, setProductName }: PropsType) => {
  const [additionalValue, setAdditionalValue] = useState<any>({
    priceBySize: null,
    ingredients: null,
    img: null,
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const [categoryOpts, setCategoryOpts] = useState<BaseCategory[]>([]);
  const [sizeOpts, setSizeOpts] = useState<BaseProductSize[]>([])
  const [listIngredientOtps, setListIngredientOtps] = useState<BaseIngredient[]>([]);
  const [detailProduct, setDetailProduct] = useState<any>()
  const { productCode } = useParams()

  const dispatch = useAppDispatch();

  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    watch,
    reset,
  } = methods;

  const debounceProductName = useDebounce(watch("name"), 1500);

  const getAddtionalError = (data: any) => {
    let isValid = true;
    if (data.priceType === 1) {
      if (Object.keys(additionalValue.priceBySize).length === 0) {
        toastServices.error("Chưa nhập giá sản phẩm", {
          position: "top-center",
        });
        isValid = false;
      } else {
        const priceBySize = additionalValue.priceBySize;
        let isError = false;
        Object.keys(priceBySize).forEach((key: any) => {
          if (!priceBySize[key].value) {
            isError = true;
          }
        });
        if (isError) {
          toastServices.error("Chưa nhập đủ giá sản phẩm", {
            position: "top-center",
          });
          isValid = false;
        }
      }
    }

    if (!additionalValue.ingredients) {
      toastServices.error("Chưa nhập nguyên liệu cho sản phẩm", {
        position: "top-center",
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = (values: any) => {
    const isValid = getAddtionalError(values);
    if (isValid) {
      const ingredients = additionalValue.ingredients.map((ingre: any) => {
        return {
          priceType: ingre.type.code,
          ingredients: ingre.ingredients.map((p: any) => ({ ingredient: p._id, quantity: p.quantity })),
        }
      })

      const data: any = {
        product: {
          name: values.name,
          img: values.img,
          status: values.status,
          category: values.category
        },
        ingredients,
      }

      if (values.priceType === 1) {
        const priceBySize = additionalValue.priceBySize
        data.priceBySize = Object.keys(priceBySize).map((key: any) => ({ size: key, price: priceBySize[key].value }))
      }
      else {
        data.priceBySize = [{ size: 'normal', price: stringThounsandToNumber(values.singlePrice) }]
      }
      console.log(data);

      if (productCode) {
        handleUpdateProduct(data)
      }
      else {
        handleCreateProduct(data)
      }
    }
  };

  const handleUpdateProduct = (data: ProductType) => {
    getDataChange(data)
  }

  const getDataChange = (data: ProductType) => {
    console.log(detailProduct, data);

  }

  const handleCreateProduct = async (data: ProductType) => {
    dispatch(showLoading());
    try {
      const res = await ProductServices.createProduct(data)
      if (res.status === "success") {
        toastServices.success(res.message)
        setIsSubmitSuccess(true);
        dispatch(hideLoading());
      }
    } catch (error: any) {
      if (error.response) {
        toastServices.error(error.response.data.message)
      }
      dispatch(hideLoading());
    }
  }

  const handleDisableSubmitBtn = () => {
    if (isSubmitSuccess) return true;
    return false;
  };

  const handleGetListCategory = async (signal: any) => {
    try {
      const res = await CategoryServices.getList({ signal })
      if (res.status === "success") {
        setCategoryOpts(res.data);
      }
    } catch (error: any) {
      toastServices.error(error.message)
    }
  }

  const handleGetProductSize = async (signal: any) => {
    try {
      const res = await ProductServices.getListSize({ signal })
      if (res.status === 'success') {
        setSizeOpts(res.data)
      }
    } catch (error: any) {
      toastServices.error(error.message)
    }
  }

  const handleGetListIngredients = async (signal: any) => {
    try {
      const res = await IngredientServices.getListIngredients({ signal })
      if (res.status === "success")
        setListIngredientOtps(res.data);

    } catch (error: any) {
      toastServices.error(error.message)
    }
  }

  const handleResetForm = () => {
    reset({
      ...initialData
    })
    setAdditionalValue({
      priceBySize: null,
      ingredients: null,
      img: null
    })
  }

  const handleGetDetailProduct = async (code: string, signal: any) => {
    try {
      const res = await ProductServices.getByCode(`/get-by-code/${code}`, { signal })
      if (res.status === 'success') {
        const { data } = res
        setDetailProduct(data)
        const { priceBySize, ingredients } = data

        const additionalPriceBySize: any = {}

        priceBySize.forEach(price => {
          additionalPriceBySize[price.size.code] = {
            value: price.price,
            label: price.size.name,
            id: price.size._id
          }
        })

        const listSize = priceBySize.map((item) => item.size)

        const additionalIngredients = ingredients.map(ingre => {
          const listIngre = ingre.data.map(item => {
            return {
              quantity: item.quantity,
              ingredients: { ...item.ingredient }
            }
          })
          const obj = {
            type: {
              code: ingre.priceType,
              label: listSize.find(p => p.code === ingre.priceType)?.name
            },
            ingredients: listIngre
          }
          return {
            ...obj
          }
        })

        setAdditionalValue({
          ...additionalValue,
          priceBySize: { ...additionalPriceBySize },
          ingredients: additionalIngredients
        })

        reset({
          name: data.name,
          category: data.category._id,
          status: data.status,
          singlePrice: priceBySize.length === 1 ? priceBySize[0].price.toString() : "0",
          priceType: priceBySize.length > 1 ? 1 : 0
        })
      }
    } catch (error: any) {
      toastServices.error(error.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    Promise.all([
      handleGetListCategory(signal),
      handleGetProductSize(signal),
      handleGetListIngredients(signal)
    ])

    return () => {
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (productCode)
      handleGetDetailProduct(productCode, signal)
    else
      handleResetForm()

    return () => {
      abortController.abort()
    }
  }, [productCode])

  useEffect(() => {
    setProductName(formId, debounceProductName);
  }, [debounceProductName]);

  return (
    <Box sx={{ padding: "18px 0" }}>
      <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <RHFTextField disabled={isSubmitSuccess} name="name" label="Tên sản phẩm" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFSelect disabled={isSubmitSuccess} name="category" label="Danh mục">
              {
                !categoryOpts &&
                <MenuItem>Trống</MenuItem>
              }
              {categoryOpts && categoryOpts.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFSelect disabled={isSubmitSuccess} name="status" label="Trạng thái">
              {statusOpts && statusOpts.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={6}>
            <PriceSection
              isSubmitSuccess={isSubmitSuccess}
              methods={methods}
              additionalValue={additionalValue}
              setAdditionalValue={setAdditionalValue}
              sizeOpts={sizeOpts}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <UploadImg />
          </Grid>
          <Grid item xs={12}>
            <IngredientSection
              isSubmitSuccess={isSubmitSuccess}
              methods={methods}
              additionalValue={additionalValue}
              setAdditionalValue={setAdditionalValue}
              listIngredientOtps={listIngredientOtps}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack alignItems="flex-end">
              <Button type="submit" variant="contained" disabled={handleDisableSubmitBtn()}>
                Lưu sản phẩm
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </RHFProvider>
    </Box>
  );
};

export default Form;
