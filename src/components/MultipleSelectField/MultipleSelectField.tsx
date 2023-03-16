import {
  ComponentProps,
} from "react";
import Select from 'react-select';
import NoOptions from "@/components/NoOptions/NoOptions";
import TextField from "@/components/TextField/TextField";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import classes from "./MultipleSelectField.module.scss";
import { SustainabilityGoalsReasons } from "@/consts/sustainabilityGoalsReasons";
import clsx from "clsx";

export type SelectOption = {
  label: string;
  value: string;
};

interface Props
  extends Omit<
    ComponentProps<typeof TextField>,
    "value" | "onChange" | "endAdornment" | "valueClassName"
  > {
  value: Array<SelectOption>;
  options: Array<SelectOption>;
  onChange?: (value: Array<SelectOption>) => void;
}

const SelectField = ({
  label,
  hasAsterisk,
  onChange,
  value,
  options: defaultOptions,
  onFocus,
  isError,
  helperMessage,
  placeholder
}: Props) => {

  const computedLabel = `${label}${hasAsterisk ? " *" : ""}`;

  return (
    <label>
      {label && <span className={classes.label}>{computedLabel}</span>}
      <Select
        value={value}
        onChange={onChange as any}
        id="reason"
        placeholder={placeholder}
        options={defaultOptions}
        isMulti 
      />
      <span
        className={clsx(classes.helperText, {
          [classes.error]: (isError),
        })}
      >
        {helperMessage}
      </span>
    </label>
  );
};

export default SelectField;
