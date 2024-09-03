import { FormControlLabel, FormControlLabelProps, Switch, SwitchProps } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
}

export type RHFSwitchProps = IProps & any;

const RHFSwitch = ({ name, ...other }: RHFSwitchProps) => {
  const { control } = useFormContext();
  return <Controller control={control} name={name} render={({ field }) => <FormControlLabel {...other} control={<Switch {...field} checked={field.value} />} />} />;
};

export default RHFSwitch;
