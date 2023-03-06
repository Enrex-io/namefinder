import { ComponentProps, PropsWithChildren } from "react";

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

const Stack = ({
  spacing: gap = 0,
  direction: flexDirection = "row",
  alignItems = "stretch",
  justifyContent = "stretch",
  wrap: flexWrap = "nowrap",
  style,
  children,
  ...props
}: Props) => {
  const innerStyle = {
    display: "flex",
    gap: `${gap}rem`,
    flexDirection,
    flexWrap,
    alignItems,
    justifyContent,
  };

  return (
    <div style={{ ...innerStyle, ...style }} {...props}>
      {children}
    </div>
  );
};

export default Stack;
