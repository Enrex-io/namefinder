import { ArrowUp } from '@/assets/icons/ArrowUpIcon';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import classes from './WindowScrollControls.module.scss';

const WindowScrollControls = () => {
    const [isScrollUpVisible, setIsScrollUpVisible] = useState<boolean>(false);
    const [isScrollDownVisible, setIsScrollDownVisible] =
        useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            const handleScroll = () => {
                const { scrollY } = window;
                const { clientHeight } = document.body;
                const { innerHeight } = window;
                const offset = innerHeight;

                setIsScrollUpVisible(scrollY > 0 + offset);
                setIsScrollDownVisible(
                    scrollY + innerHeight < clientHeight - offset
                );
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScrollUp = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const handleScrollDown = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <button
                className={clsx(classes.scrollButton, classes.onBottom, {
                    [classes.hidden]:
                        !isScrollUpVisible ||
                        (isScrollDownVisible &&
                            !(!isScrollDownVisible || isScrollUpVisible)),
                })}
                onClick={handleScrollUp}
            >
                <ArrowUp />
            </button>
            <button
                className={clsx(classes.scrollButton, classes.onTop, {
                    [classes.hidden]:
                        !isScrollDownVisible ||
                        (isScrollUpVisible &&
                            !(!isScrollUpVisible || isScrollDownVisible)),
                })}
                onClick={handleScrollDown}
            >
                <ArrowUp />
            </button>
        </>
    );
};

export default WindowScrollControls;
