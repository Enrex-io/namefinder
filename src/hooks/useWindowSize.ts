import React from 'react';

interface ISizes {
    width: number | null;
    height: number | null;
}

export default function useWindowSize(): ISizes {
    const [size, setSize] = React.useState<ISizes>({
        width: null,
        height: null,
    });

    React.useLayoutEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return size;
}
