import { ComponentProps } from "react";
import Stack from "@/components/Stack/Stack";

const REM = 16;

interface Props extends ComponentProps<typeof Stack> {
  elevation?: number;
  hasBorder?: boolean;
}

const Paper = ({
  elevation = 0,
  hasBorder = false,
  children,
  ...rest
}: Props) => {
  return (
    <Stack
      style={{
        boxShadow: `0px ${(elevation / 4) * REM}px ${
          (elevation / 2) * REM
        }px var(--clr-grey-light)`,
        border: hasBorder ? "1px solid var(--clr-grey-main)" : "none",
        borderRadius: "var(--border-radius-main)",
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Paper;
