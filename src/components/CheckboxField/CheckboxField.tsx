import { forwardRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import classes from './CheckboxField.module.scss';

interface Props {
  label: string;
  value: boolean;
  name: string;
  onChange: (event: any) => void;
  initialChecked: boolean;
}

const CheckboxField = forwardRef<HTMLInputElement, PropsWithChildren<Props>>(
  (
    { label, name, value, onChange, initialChecked, ...props }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <label className={clsx(classes.field)}>
        <input
          type='checkbox'
          id={name}
          checked={value}
          onChange={onChange}
          defaultChecked={initialChecked}
        />
        {label && <span className={classes.label}>{label}</span>}
      </label>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
