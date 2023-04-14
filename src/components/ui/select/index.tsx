import { SelectHTMLAttributes, ForwardedRef, forwardRef, useId, ReactNode, ReactElement } from 'react';
import s from './select.module.scss';

interface SelectOwnProps {
  children?: ReactNode[];
}

type SelectProps = SelectOwnProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof SelectOwnProps>;

const Select = (props: SelectProps) => {
  const { children, ...other } = props;

  return (
    <select className={s.select} {...other}>
      {children?.map((child) => (
        <option>{child}</option>
      ))}
    </select>
  );
};

Select.displayName = 'Select';

export default Select;
