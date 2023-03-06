import { ComponentProps, PropsWithChildren } from "react";
import clsx from "clsx";
import classes from "./Button.module.scss";

interface Props extends Omit<ComponentProps<"button">, "disabled"> {
  isDisabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined";
}

const Button = ({
  children,
  className,
  isDisabled,
  size = "medium",
  variant = "contained",
  ...rest
}: PropsWithChildren<Props>) => {
  const computed = clsx(
    classes.button,
    classes[variant],
    classes[size],
    {
      [classes.disabled]: isDisabled,
    },
    className
  );

  return (
    <button disabled={isDisabled} className={computed} {...rest}>
      {children}
    </button>
  );
};

export default Button;
