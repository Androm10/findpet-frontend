import { classNames } from '@shared/utils/class-names';
import { FC, ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import s from './base-container.module.scss';

interface BaseContainerOwnProps {
  fullWidth?: boolean;
  hidden?: boolean;
  children: ReactNode;
}

export type BaseContainerProps = BaseContainerOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BaseContainerOwnProps>;

const BaseContainer = forwardRef<HTMLDivElement, BaseContainerProps>(
  (props: BaseContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { fullWidth = false, hidden = false, children, className, ...other } = props;

    return (
      <div
        ref={ref}
        className={[
          classNames({
            [s['container_full-width']]: fullWidth,
            [s['container_hidden']]: hidden,
          }),
          className || '',
        ].join(' ')}
        {...other}
      >
        {children}
      </div>
    );
  },
);

BaseContainer.displayName = 'BaseContainer';

export default BaseContainer;
