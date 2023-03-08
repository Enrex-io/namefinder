import { ComponentProps, PropsWithChildren, forwardRef } from "react";

interface Props extends ComponentProps<"div"> {
  spacing?: number;
  direction?: "row" | "column";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch"
    | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

const Stack = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (
    {
      spacing: gap = 0,
      direction: flexDirection = "row",
      alignItems = "stretch",
      justifyContent = "stretch",
      wrap: flexWrap = "nowrap",
      style,
      children,
      ...props
    }: Props,
    ref
  ) => {
    const innerStyle = {
      display: "flex",
      gap: `${gap}rem`,
      flexDirection,
      flexWrap,
      alignItems,
      justifyContent,
    };

    return (
      <div style={{ ...innerStyle, ...style }} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export default Stack;
