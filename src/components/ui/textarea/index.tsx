import { classNames } from '@shared/utils/class-names';
import { TextareaHTMLAttributes, ForwardedRef, forwardRef, useId, ChangeEvent, ReactNode } from 'react';
import s from './input.module.scss';

interface TextareaOwnProps {
  fullWidth?: boolean;
  label?: string;
  children?: ReactNode;
  htmlId?: string;
}

type TextareaProps = TextareaOwnProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextareaOwnProps>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { fullWidth = false, label, children, htmlId, className, ...other } = props;
    const id = useId();

    return (
      <div
        className={[
          s.input,
          classNames({
            [s['input_full-width']]: fullWidth,
          }),
          className,
        ].join(' ')}
      >
        {!!label && (
          <label className={s.input__label} htmlFor={htmlId || id}>
            {label}
          </label>
        )}
        <textarea {...other} id={htmlId || id} className={s.input__form} ref={ref} />
        {children}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
