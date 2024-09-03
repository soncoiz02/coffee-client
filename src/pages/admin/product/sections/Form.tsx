import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, MenuItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import RHFProvider from "../../../../components/RHF/RHFProvider";
import RHFSelect from "../../../../components/RHF/RHFSelect";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import { BaseProductType } from "../../../../types/product";
import IngredientSection from "./IngredientSection";
import PriceSection from "./PriceSection";
import UploadImg from "./UploadImg";
import useDebounce from "../../../../hooks/useDebounce";
import { toastServices } from "../../../../services/toast/toastServices";
import { useAppDispatch } from "../../../../redux/hook";
import { hideLoading, showLoading } from "../../../../redux/feature/loadingSlice";

const categoryOpts = [
  {
    label: "Cà phê",
    id: "1",
  },
  {
    label: "Trà hoa quả",
    id: "2",
  },
  {
    label: "Sữa chua",
    id: "3",
  },
];

export interface DataType extends BaseProductType {
  priceType: 0 | 1;
  singlePrice?: number;
}

const initialData: DataType = {
  name: "",
  img: "",
  category: "",
  priceType: 0,
  singlePrice: 0,
  status: true,
};

const formSchema = yup.object().shape<any>({
  name: yup.string().trim().required("Vui lòng nhập tên sản phẩm"),
  category: yup.string().required("Vui lòng chọn danh mục"),
  img: yup.string().trim(),
  priceType: yup.number(),
  singlePrice: yup
    .number()
    .typeError("Nhập giá sản phẩm")
    .when("priceType", (priceType, schema) => {
      if (priceType[0] === 0) {
        return schema.positive("Nhập giá lớn hơn 0").required("Nhập giá sản phẩm");
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
    price: null,
    ingredient: null,
    img: null,
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(formSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const debounceProductName = useDebounce(watch("name"), 1500);

  const getAddtionalError = (data: any) => {
    let isValid = true;
    if (data.priceType === 1) {
      if (Object.keys(additionalValue.price).length === 0) {
        toastServices.error("Chưa nhập giá sản phẩm", {
          position: "top-center",
        });
        isValid = false;
      } else {
        const priceBySize = additionalValue.price;
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

    if (!additionalValue.ingredient) {
      toastServices.error("Chưa nhập nguyên liệu cho sản phẩm", {
        position: "top-center",
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = (values: any) => {
    const data = {
      ...values,
      ...additionalValue,
    };
    const isValid = getAddtionalError(data);
    if (isValid) {
      dispatch(showLoading());
      setTimeout(() => {
        console.log(data);

        dispatch(hideLoading());
        setIsSubmitSuccess(true);
      }, 2000);
    }
  };

  const handleDisableSubmitBtn = () => {
    if (isSubmitSuccess) return true;
    return false;
  };

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
              {categoryOpts.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFSelect disabled={isSubmitSuccess} name="status" label="Trạng thái">
              {statusOpts.map((item) => (
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
