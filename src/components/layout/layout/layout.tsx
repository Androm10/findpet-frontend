import { FC, PropsWithChildren } from 'react';
import s from './layout.module.scss';
import FixedContainer from 'components/containers/fixed-container';
import LayoutHeader from '../header';
import LayoutFooter from '../footer';
import { Outlet } from 'react-router-dom';

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

      <LayoutFooter />
    </div>
  );
};

Layout.displayName = 'Layout';

export default Layout;
