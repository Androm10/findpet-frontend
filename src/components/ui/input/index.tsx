import { classNames } from '@shared/utils/class-names';
import { InputHTMLAttributes, ForwardedRef, forwardRef, useId, ChangeEvent, ReactNode } from 'react';
import s from './input.module.scss';

interface InputOwnProps {
  fullWidth?: boolean;
  label?: string;
  children?: ReactNode;
}

type InputProps = InputOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>;

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { fullWidth = false, label, children, ...other } = props;
  const id = useId();

  return (
    <div
      className={[
        s.input,
        classNames({
          [s['input_full-width']]: fullWidth,
        }),
      ].join(' ')}
    >
      {!!label && (
        <label className={s.input__label} htmlFor={id}>
          {label}
        </label>
      )}
      <input {...other} id={id} className={s.input__form} ref={ref} />
      {children}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
