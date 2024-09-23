import { faAngleRight, faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Collapse, Divider, IconButton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ShadowBox from "../../../components/ShadowBox";
import { Wrapper } from "./index";
import Form from "./sections/form-add/Form";

const ProductForm = () => {
  const [formId, setFormId] = useState<string[]>(["form-1"]);
  const [listHideForm, setListHideForm] = useState<string[]>([]);
  const [listProductName, setListProductName] = useState<any>([]);
  const theme = useTheme();

  const checkShowForm = (id: string) => {
    return !listHideForm.includes(id);
  };

  const handleVisibleForm = (id: string) => {
    const isExistId = listHideForm.find((p) => p === id);
    if (isExistId) {
      const newFormId = listHideForm.filter((p) => p !== id);
      setListHideForm(newFormId);
    } else {
      setListHideForm([...listHideForm, id]);
    }
  };

  const addForm = () => {
    setFormId([...formId, `form-${formId.length + 1}`]);
  };

  const removeForm = (id: string) => {
    const newFormId = formId.filter((p) => p !== id);
    const newHiddenForm = listHideForm.filter((p) => p !== id);
    setFormId(newFormId);
    setListHideForm(newHiddenForm);
  };

  const setProductName = (id: string, name: string) => {
    const existFormId = [...listProductName].find((p: any) => p.formId === id);
    if (existFormId) {
      existFormId.name = name;
      const cloneList = [...listProductName];
      const spliceIndex = formId.indexOf(id);
      cloneList.splice(spliceIndex, 1, existFormId);
      setListProductName(cloneList);
    } else {
      const newName = [...listProductName];
      newName.push({
        formId: id,
        name,
      });
      setListProductName(newName);
    }
  };

  const getProductName = (formId: string, index: number) => {
    if (listProductName.length > 0) {
      const obj = listProductName.find((p: any) => p.formId === formId);
      if (obj && obj.name) {
        return obj.name;
      }
      return `Sản phẩm ${index}`;
    }
    return `Sản phẩm ${index}`;
  };

  // useEffect(() => {

  // }, [formId])

  return (
    <ShadowBox sx={{ borderRadius: "20px" }}>
      <Wrapper sx={{ minHeight: "60vh" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">Tạo sản phẩm</Typography>
          <Stack direction="row" alignItems="center" gap={{ xs: 1, md: 2 }}>
            <Tooltip title="Thêm sản phẩm" placement="top">
              <IconButton color="primary" onClick={addForm}>
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack>
          {formId.map((id, index) => (
            <Stack gap={2} key={id}>
              <Stack direction="row" alignItems="center" width="100%" gap={1}>
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                    transition: "0.5s",
                    transform: `rotate(${checkShowForm(id) ? "90deg" : "0deg"})`,
                  }}
                  color={theme.palette.grey[500]}
                  icon={faAngleRight}
                  onClick={() => handleVisibleForm(id)}
                />
                <Divider sx={{ flex: 1 }}>
                  <Chip label={getProductName(id, index + 1)} />
                </Divider>
                {index > 0 && (
                  <IconButton color="error" onClick={() => removeForm(id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </IconButton>
                )}
              </Stack>
              <Collapse in={checkShowForm(id)}>
                <Form setProductName={setProductName} formId={id} />
              </Collapse>
            </Stack>
          ))}
        </Stack>
      </Wrapper>
    </ShadowBox>
  );
};

export default ProductForm;
