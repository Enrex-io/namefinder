import { ComponentProps, forwardRef } from 'react';
import Stack from '@/components/Stack/Stack';

const REM = 16;

interface Props extends ComponentProps<typeof Stack> {
    elevation?: number;
    hasBorder?: boolean;
}

const Paper = forwardRef<HTMLDivElement, Props>(
    ({ elevation = 0, hasBorder = false, children, ...rest }, ref) => {
        return (
            <Stack
                ref={ref}
                style={{
                    boxShadow: `0px ${(elevation / 4) * REM}px ${
                        (elevation / 2) * REM
                    }px var(--clr-grey-light)`,
                    border: hasBorder
                        ? '1px solid var(--clr-grey-main)'
                        : 'none',
                }}
                {...rest}
            >
                {children}
            </Stack>
        );
    }
);

Paper.displayName = 'Paper';

export default Paper;
