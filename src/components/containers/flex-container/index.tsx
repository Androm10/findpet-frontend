import { ForwardedRef, forwardRef } from 'react';
import BaseContainer, { BaseContainerProps } from '../base-container';
import s from './flex-container.module.scss';

const FlexContainer = forwardRef<HTMLDivElement, BaseContainerProps>(
  (props: BaseContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, className, ...other } = props;

    return (
      <BaseContainer className={[s['flex-container'], className || ''].join(' ')} ref={ref} {...other}>
        {children}
      </BaseContainer>
    );
  },
);

FlexContainer.displayName = 'FlexContainer';

export default FlexContainer;
