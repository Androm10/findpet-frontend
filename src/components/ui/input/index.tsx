import { InputHTMLAttributes, ForwardedRef, forwardRef, useId, ChangeEvent } from 'react';
import s from './input.module.scss';

interface InputOwnProps {
  fullWidth?: boolean;
  label?: string;
}

type InputProps = InputOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>;

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { fullWidth, label, ...other } = props;
  const id = useId();

  return (
    <div className={s.input}>
      {!!label && (
        <label className={s.input__label} htmlFor={id}>
          {label}
        </label>
      )}
      <input {...other} id={id} className={s.input__form} ref={ref} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
