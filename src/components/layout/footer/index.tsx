import { FC } from 'react';
import s from './footer.module.scss';

export const LayoutFooter: FC = () => {
  return <div className={s.footer}></div>;
};

LayoutFooter.displayName = 'LayoutFooter';
export default LayoutFooter;
