import React, { ComponentProps, forwardRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import classes from './TextArea.module.scss';

interface Props extends ComponentProps<'textarea'> {
    label: Capitalize<string>;
    isError?: boolean;
    hasAsterisk?: boolean;
    helperMessage?: Capitalize<string>;
    containerProps?: ComponentProps<'div'>;
    className?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    fieldClassName?: string;
    valueClassName?: string;
    maxLength?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, PropsWithChildren<Props>>(
    (
        {
            label,
            isError,
            hasAsterisk,
            helperMessage,
            className,
            startAdornment,
            endAdornment,
            children,
            fieldClassName,
            valueClassName,
            maxLength,
            disabled,
            autoComplete = 'off',
            ...props
        }: PropsWithChildren<Props>,
        ref: React.Ref<HTMLTextAreaElement>
    ) => {
        const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        const computedLabel = `${label}${hasAsterisk ? ' *' : ''}`;
        return (
            <label className={clsx(classes.field, fieldClassName)}>
                {label && (
                    <span className={classes.label}>{computedLabel}</span>
                )}
                <div
                    className={clsx(
                        valueClassName,
                        classes.textarea,
                        className,
                        {
                            [classes.error]: isError,
                        }
                    )}
                >
                    {startAdornment}
                    <textarea
                        autoComplete={autoComplete}
                        rows={5}
                        ref={ref}
                        disabled={disabled}
                        onInput={handleInputChange}
                        {...props}
                    >
                        {endAdornment}
                    </textarea>
                    {children}
                </div>
                <span
                    className={clsx(classes.helperText, {
                        [classes.error]: isError,
                    })}
                >
                    {helperMessage}
                </span>
                <span
                    className={clsx(classes.helperCounter, {
                        [classes.error]: isError,
                    })}
                >{`${props?.value?.toString().length} / ${maxLength}`}</span>
            </label>
        );
    }
);

TextArea.displayName = 'TextArea';

export default TextArea;
