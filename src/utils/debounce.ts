type DebouncedFunction<F extends (...args: any[]) => any> = (
    ...args: Parameters<F>
) => void;

export function debounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
): DebouncedFunction<F> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function debouncedFunc(...args: Parameters<F>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    };
}
