import { ComponentProps, forwardRef, PropsWithChildren, useRef } from 'react';
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
      autoComplete = 'off',
      ...props
    }: PropsWithChildren<Props>,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    const computedLabel = `${label}${hasAsterisk ? ' *' : ''}`;
    return (
      <label className={clsx(classes.field, fieldClassName)}>
        {label && <span className={classes.label}>{computedLabel}</span>}
        <div
          className={clsx(valueClassName, classes.textarea, className, {
            [classes.error]: isError,
          })}
        >
          {startAdornment}
          <textarea autoComplete={autoComplete} rows={10} ref={ref} {...props}>
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
      </label>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
