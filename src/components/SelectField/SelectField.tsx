import {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import ClickAwayListener from "react-click-away-listener";
import NoOptions from "@/components/NoOptions/NoOptions";
import TextField from "@/components/TextField/TextField";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { debounce } from "@/utils/debounce";
import classes from "./SelectField.module.scss";

export type SelectOption = {
  label: string;
  value: string;
};

interface Props
  extends Omit<
    ComponentProps<typeof TextField>,
    "onChange" | "endAdornment" | "valueClassName"
  > {
  options: Array<SelectOption>;
  onChange?: (value: string) => void;
}

const SelectField = ({
  label,
  onChange,
  value,
  options: defaultOptions,
  onFocus,
  ...props
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SelectOption[]>(defaultOptions);
  const [searchValue, setSearchValue] = useState<string>(String(value || ""));

  const toggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const value = event.currentTarget.dataset.value;
    if (value) {
      setSearchValue(
        options.find((option) => option.value === value)?.label || ""
      );
      setOptions(defaultOptions);
      onChange?.(value);
    }
    toggle();
  };

  const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      setIsOpen(false);
      (event.target as HTMLInputElement).blur();
    }
  };

  const updateOptions = useCallback(
    debounce((value: string) => {
      if (!value) {
        setOptions(defaultOptions);
        return;
      }
      const filteredOptions = defaultOptions.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setOptions(filteredOptions);
    }, 300),
    [defaultOptions]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isOpen) setIsOpen(true);
    updateOptions(value);
    setSearchValue(value);
    onChange?.(value);
  };

  const onClickToggleButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggle();
  };

  const open = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    open();
    onFocus?.(event);
  };

  const handleClickAway = (event: any) => {
    event?.target?.name !== props.name && setIsOpen(false);
  };

  return (
    <TextField
      onKeyDown={handlePressEnter}
      onFocus={handleFocus}
      onClick={open}
      label={label}
      onChange={handleSearch}
      valueClassName={classes.selectField}
      value={searchValue}
      inputMode="none"
      endAdornment={
        <ToggleButton isToggled={isOpen} onToggle={onClickToggleButton} />
      }
      {...props}
    >
      {isOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.options}>
            {!options.length ? (
              <NoOptions />
            ) : (
              options.map((option) => (
                <div
                  key={option.value}
                  data-value={option.value}
                  onClick={handleSelect}
                  className={classes.option}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </ClickAwayListener>
      )}
    </TextField>
  );
};

export default SelectField;
