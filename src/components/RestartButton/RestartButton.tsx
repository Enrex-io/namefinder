import { ComponentProps } from "react";
import clsx from "clsx";
import { RestartIcon } from "@/assets/icons/RestartIcon";
import classes from "./RestartButton.module.scss";

const RestartButton = ({
  onClick,
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      onClick={onClick}
      className={clsx(classes.restartButton, className)}
      {...props}
    >
      <RestartIcon />
    </button>
  );
};

export default RestartButton;
