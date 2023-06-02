import { useDraggable } from '@shared/hooks/use-draggable.hook';
import { FC, ForwardedRef, forwardRef, HTMLAttributes, memo, ReactNode, useEffect, useRef } from 'react';

import s from './floating-menu.module.scss';

interface FloatingMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  element?: ReactNode;
  isHidden: boolean;
  setHidden: (value: boolean) => void;
  marginTop?: string;
  marginLeft?: string;
  closable?: boolean;
}

const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  (props: FloatingMenuProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, element, isHidden, setHidden, marginLeft, marginTop, closable } = props;
    const menuRef = useRef<HTMLDivElement>(null);

    const clickOutsideHandler = (event: MouseEvent) => {
      if (closable) return;

      if (event.target !== menuRef.current && !menuRef.current?.contains(event.target as Node)) {
        if (!isHidden) {
          setHidden(true);
        }
      }
    };

    useEffect(() => {
      document.documentElement.addEventListener('click', clickOutsideHandler);
      return () => {
        document.documentElement.removeEventListener('click', clickOutsideHandler);
      };
    }, [clickOutsideHandler]);

    if (!element) {
      return <>{children}</>;
    }

    return (
      <div ref={menuRef} className={s['floating-menu']}>
        {!isHidden && (
          <div style={{ marginTop, marginLeft }} className={s['menu-container']} ref={ref}>
            {element}
          </div>
        )}
        {children}
      </div>
    );
  },
);

FloatingMenu.displayName = 'FloatingMenu';

export default FloatingMenu;
