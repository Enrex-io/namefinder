import clsx from "clsx";
import { ComponentProps } from "react";
import classes from "./Chip.module.scss";

interface Props extends Omit<ComponentProps<"div">, "onChange"> {
  label: string;
  isActive?: boolean;
  onChange?: (value: boolean) => void;
}

const Chip = ({
  label,
  isActive = false,
  onChange = () => {},
  className,
  onKeyDown,
  ...props
}: Props) => {
  const handleClick = () => {
    onChange(!isActive);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onChange(!isActive);
    }
    onKeyDown?.(event);
  };

  return (
    <div
      className={clsx(classes.chip, { [classes.active]: isActive }, className)}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
    >
      {label}
    </div>
  );
};

export default Chip;
