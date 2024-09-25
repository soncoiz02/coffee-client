import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFTextField from "../../../../../components/RHF/RHFTextField";
import { BaseProductSize } from "../../../../../types/product";
import { useParams } from "react-router-dom";
import { TextMaskCustomNumber } from "../../../../../components/TextMaskCustom";
import { stringThounsandToNumber } from "../../../../../utils/formatNumber";

type PropsTypes = {
    methods: UseFormReturn;
    additionalValue: any;
    setAdditionalValue: Dispatch<any>;
    isSubmitSuccess: boolean;
    sizeOpts: BaseProductSize[]
};

const PriceSection = ({ methods, additionalValue, setAdditionalValue, isSubmitSuccess, sizeOpts }: PropsTypes) => {
    const [priceType, setPriceType] = useState(0);
    const [listSize, setListSize] = useState<BaseProductSize[]>([]);
    const [priceBySizeValue, setPriceBySizeValue] = useState<any>()
    const { productCode } = useParams()

    const {
        clearErrors,
        setValue,
        getValues,
        formState: { isSubmitted },
    } = methods;

    const priceTypeFormVal = getValues("priceType")


    const disablePriceField = (type: string) => {
        if (type === "single") {
            if (priceType === 1) return true;
            else return false;
        } else if (type === "size") {
            if (priceType === 0) return true;
            else return false;
        }
        return false;
    };

    const handleChangePriceType = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        setValue("priceType", value);
        setPriceType(value);

        if (value === 0) {
            setListSize([]);
            if (!productCode) {
                setAdditionalValue({
                    ...additionalValue,
                    priceBySize: null,
                });
            }
        } else if (value === 1) {
            if (productCode) {
                getDetailPriceBySize()
            }
            else {
                clearErrors("singlePrice");
                setValue("singlePrice", "0");
            }
        }
    };

    const handleChangeSize = (event: any, values: any) => {
        setListSize(values);
        const priceBySize: any = {};
        const priceBySizeInputVal: any = {}
        values.forEach((value: any) => {
            const field = value.code;
            const price = additionalValue.priceBySize;
            priceBySizeInputVal[field] = ""
            if (price && Object.keys(price).length > 0) {
                if (price[field]) {
                    priceBySize[field] = {
                        ...price[field],
                    };
                } else {
                    priceBySize[field] = {
                        value: "",
                        label: value.name,
                    };
                }
            } else {
                priceBySize[field] = {
                    value: "",
                    label: value.name,
                };
            }
        });
        setPriceBySizeValue(priceBySizeInputVal)
        setAdditionalValue({
            ...additionalValue,
            priceBySize: {
                ...priceBySize,
            },
        });
    };

    const getErrorSelectPrice = () => {
        if (isSubmitted && priceType === 1) {
            if (listSize.length === 0)
                return {
                    isError: true,
                    message: "Vui lòng chọn size",
                };
        }
        return {
            isError: false,
            message: "",
        };
    };

    const onPriceBySizeChange = (e: ChangeEvent<HTMLInputElement>, size: any) => {
        const value = e.target.value
        setPriceBySizeValue({
            ...priceBySizeValue,
            [size.code]: value
        })
        setAdditionalValue({
            ...additionalValue,
            priceBySize: {
                ...additionalValue.priceBySize,
                [size.code]: {
                    value: stringThounsandToNumber(value),
                    label: size.name,
                    id: size._id
                },
            },
        });
    };

    const validatePriceBySize = (code: string) => {
        if (isSubmitted) {
            const price = priceBySizeValue[code]
            if (!price) {
                return {
                    isError: true,
                    message: "Nhập giá theo size",
                };
            } else if (stringThounsandToNumber(price) <= 0) {
                return {
                    isError: true,
                    message: "Nhập giá lớn hơn 0",
                };
            } else {
                return {
                    isError: false,
                    message: "",
                };
            }
        }

        return {
            isError: false,
            message: "",
        };
    };

    const getDetailPriceBySize = () => {
        const { priceBySize } = additionalValue
        if (priceBySize !== null) {
            const price: any = {}
            const size = Object.keys(priceBySize).map(key => {
                price[key] = priceBySize[key].value.toString()
                return {
                    _id: priceBySize[key].id,
                    name: priceBySize[key].label,
                    code: key
                }
            })
            if (size.length > 1) {
                setListSize(size)
                setPriceBySizeValue(price)
            }
        }
    }

    useEffect(() => {
        setPriceType(priceTypeFormVal)
        if (productCode) {
            getDetailPriceBySize()
        }
        else {
            if (priceTypeFormVal === 0) {
                setListSize([])
            }
        }
    }, [priceTypeFormVal])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack gap={1}>
                    <Typography variant="h4">Giá sản phẩm</Typography>
                    <FormControl>
                        <RadioGroup row value={priceType} onChange={handleChangePriceType}>
                            <FormControlLabel disabled={isSubmitSuccess} value={0} control={<Radio />} label="Giá đơn" />
                            <FormControlLabel disabled={isSubmitSuccess} value={1} control={<Radio />} label="Giá theo size" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {
                        priceType === 0 ?
                            <Grid item xs={12} md={8}>
                                <RHFTextField
                                    name="singlePrice"
                                    label="Giá đơn"
                                    placeholder="Giá sản phẩm"
                                    inputProps={{ inputMode: "numeric" }}
                                    disabled={disablePriceField("single") || isSubmitSuccess}
                                    InputProps={{
                                        inputComponent: TextMaskCustomNumber as any
                                    }}
                                />
                            </Grid> :
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            multiple
                                            options={sizeOpts}
                                            disableCloseOnSelect
                                            value={listSize}
                                            disabled={disablePriceField("size") || isSubmitSuccess}
                                            getOptionLabel={(option) => option.name}
                                            onChange={handleChangeSize}
                                            renderOption={(props, option, { selected }) => {
                                                const { key, ...optionProps } = props;
                                                return (
                                                    <li key={option._id} {...optionProps}>
                                                        <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                                        {option.name}
                                                    </li>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Chọn size" error={getErrorSelectPrice().isError} helperText={getErrorSelectPrice().message} />
                                            )}
                                        />
                                    </Grid>
                                    {listSize.length > 0 && (
                                        <Grid item xs={12}>
                                            <Timeline
                                                sx={{
                                                    [`& .${timelineItemClasses.root}:before`]: {
                                                        flex: 0,
                                                        padding: 0,
                                                    },
                                                }}
                                            >
                                                {listSize.map((size) => (
                                                    <TimelineItem key={size._id}>
                                                        <TimelineSeparator>
                                                            <TimelineDot />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            {
                                                                priceBySizeValue &&
                                                                <TextField
                                                                    value={priceBySizeValue[size.code]}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => onPriceBySizeChange(e, size)}
                                                                    label={size.name}
                                                                    helperText={validatePriceBySize(size.code).message}
                                                                    error={validatePriceBySize(size.code).isError}
                                                                    disabled={isSubmitSuccess}
                                                                    fullWidth
                                                                    InputProps={{
                                                                        inputComponent: TextMaskCustomNumber as any
                                                                    }}
                                                                />
                                                            }
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                ))}
                                            </Timeline>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PriceSection;
