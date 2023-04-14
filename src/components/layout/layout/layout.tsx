import { FC, PropsWithChildren } from 'react';
import s from './layout.module.scss';
import FixedContainer from 'components/containers/fixed-container';
import LayoutHeader from '../header';
import LayoutFooter from '../footer';
import { Outlet } from 'react-router-dom';
import BaseContainer from 'components/containers/base-container';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.layout}>
      <FixedContainer fullWidth className={s['layout-header-container']}>
        <LayoutHeader />
      </FixedContainer>

      <div className={s['layout-body-container']}>
        <Outlet />
        {children}
      </div>
      <BaseContainer fullWidth className={s['layout-footer-container']}>
        <LayoutFooter />
      </BaseContainer>
    </div>
  );
};

Layout.displayName = 'Layout';

export default Layout;
