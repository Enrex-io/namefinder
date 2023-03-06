import { ComponentProps, MouseEvent } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { ChevronUpIcon } from "@/assets/icons/ChevronUpIcon";
import classes from "./ToggleButton.module.scss";

interface Props extends Omit<ComponentProps<"button">, "onClick"> {
  isToggled: boolean;
  onToggle: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ToggleButton = ({ isToggled, onToggle, className, ...props }: Props) => {
  return (
    <button
      onClick={onToggle}
      className={clsx(classes.button, className)}
      {...props}
    >
      {isToggled ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
  );
};

export default ToggleButton;
