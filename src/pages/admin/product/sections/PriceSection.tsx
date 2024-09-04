import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RHFTextField from "../../../../components/RHF/RHFTextField";
import { BaseProductSize } from "../../../../types/product";
import { toastServices } from "../../../../services/toast/toastServices";
import { ProductServices } from "../../../../services/product/productServices";

// const sizeOpts = [
//     {
//         id: "1",
//         name: "Size S",
//         code: "priceS",
//     },
//     {
//         id: "2",
//         name: "Size M",
//         code: "priceM",
//     },
//     {
//         id: "3",
//         name: "Size L",
//         code: "priceL",
//     },
// ];

type PropsTypes = {
    methods: UseFormReturn;
    additionalValue: any;
    setAdditionalValue: Dispatch<any>;
    isSubmitSuccess: boolean;
};

const PriceSection = ({ methods, additionalValue, setAdditionalValue, isSubmitSuccess }: PropsTypes) => {
    const [priceType, setPriceType] = useState(0);
    const [listSize, setListSize] = useState<BaseProductSize[]>([]);
    const [sizeOpts, setSizeOpts] = useState<BaseProductSize[]>([])

    const {
        clearErrors,
        setValue,
        formState: { isSubmitted },
    } = methods;

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
            setAdditionalValue({
                ...additionalValue,
                priceBySize: null,
            });
        } else if (value === 1) {
            clearErrors("singlePrice");
            setValue("singlePrice", 0);
        }
    };

    const handleChangeSize = (event: any, values: any) => {
        setListSize(values);
        const priceBySize: any = {};
        values.forEach((value: any) => {
            const field = value.code;
            const price = additionalValue.priceBySize;
            if (price && Object.keys(price).length > 0) {
                if (price[field]) {
                    priceBySize[field] = {
                        ...price[field],
                    };
                } else {
                    priceBySize[field] = {
                        value: null,
                        label: value.name,
                    };
                }
            } else {
                priceBySize[field] = {
                    value: null,
                    label: value.name,
                };
            }
        });
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

    const setPriceBySizeValue = (e: ChangeEvent<HTMLInputElement>, size: any) => {
        const value = parseInt(e.target.value);
        setAdditionalValue({
            ...additionalValue,
            priceBySize: {
                ...additionalValue.priceBySize,
                [size.code]: {
                    value,
                    label: size.name,
                    id: size._id
                },
            },
        });
    };

    const validatePriceBySize = (code: string) => {
        const priceBySize = additionalValue.priceBySize;
        if (priceBySize && isSubmitted) {
            const price = priceBySize[code].value;
            if (!price) {
                return {
                    isError: true,
                    message: "Nhập giá theo size",
                };
            } else if (price <= 0) {
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

    const handleGetProductSize = async () => {
        try {
            const res = await ProductServices.getListSize()
            if (res.status === 'success') {
                setSizeOpts(res.data)
            }
        } catch (error: any) {
            toastServices.error(error.message)
        }
    }

    useEffect(() => {
        handleGetProductSize()
    }, [])

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
                    <Grid item xs={12} md={4}>
                        <RHFTextField
                            type="number"
                            name="singlePrice"
                            label="Giá đơn"
                            placeholder="Giá sản phẩm"
                            inputProps={{ inputMode: "numeric" }}
                            disabled={disablePriceField("single") || isSubmitSuccess}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
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
                                    limitTags={2}
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
                                        {listSize.map((size, index) => (
                                            <TimelineItem key={size._id}>
                                                <TimelineSeparator>
                                                    <TimelineDot />
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <TextField
                                                        type="number"
                                                        value={additionalValue?.priceBySize[size.code]?.value}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceBySizeValue(e, size)}
                                                        label={size.name}
                                                        helperText={validatePriceBySize(size.code).message}
                                                        error={validatePriceBySize(size.code).isError}
                                                        disabled={isSubmitSuccess}
                                                    />
                                                </TimelineContent>
                                            </TimelineItem>
                                        ))}
                                    </Timeline>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PriceSection;
