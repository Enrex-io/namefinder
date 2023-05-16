import { ComponentProps, forwardRef, PropsWithChildren, useRef } from 'react';
import clsx from 'clsx';
import classes from './TextField.module.scss';

interface Props extends ComponentProps<'input'> {
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
}

const TextField = forwardRef<HTMLInputElement, PropsWithChildren<Props>>(
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
      autoComplete = 'off',
      inputMode = 'text',
      ...props
    }: PropsWithChildren<Props>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const computedLabel = `${label}${hasAsterisk ? ' *' : ''}`;

    return (
      <label className={clsx(classes.field, fieldClassName)}>
        {label && <span className={classes.label}>{computedLabel}</span>}
        <div
          className={clsx(valueClassName, classes.input, className, {
            [classes.error]: isError,
          })}
        >
          {startAdornment}
          <input
            autoComplete={autoComplete}
            {...props}
            inputMode={inputMode}
            ref={ref}
          />
          {children}
          {endAdornment}
        </div>
        <span
          className={clsx(classes.helperText, {
            [classes.error]: isError,
          })}
        >
          {helperMessage}
        </span>
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
