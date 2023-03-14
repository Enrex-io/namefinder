import { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";
import classes from "./Button.module.scss";
import Loader from "../Loader/Loader";

interface Props extends Omit<ComponentProps<"button">, "disabled"> {
  isDisabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined";
  isSubmitting?: boolean;
}

const Button = ({
  children,
  className,
  isDisabled,
  size = "medium",
  variant = "contained",
  isSubmitting,
  ...rest
}: PropsWithChildren<Props>) => {
  const computed = clsx(
    classes.button,
    classes[variant],
    classes[size],
    {
      [classes.disabled]: isDisabled,
      [classes.submitting]: isSubmitting,
    },
    className
  );

  return (
    <button disabled={isDisabled} className={computed} {...rest}>
      {isSubmitting ? <Loader height={21} /> : children}
    </button>
  );
};

export default Button;
