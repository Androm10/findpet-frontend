import { ForwardedRef, forwardRef } from 'react';
import BaseContainer, { BaseContainerProps } from '../base-container';
import s from './fixed-container.module.scss';

const FixedContainer = forwardRef<HTMLDivElement, BaseContainerProps>(
  (props: BaseContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, className, ...other } = props;

    return (
      <BaseContainer className={[s['fixed-container'], className || ''].join(' ')} ref={ref} {...other}>
        {children}
      </BaseContainer>
    );
  },
);

FixedContainer.displayName = 'FixedContainer';

export default FixedContainer;
