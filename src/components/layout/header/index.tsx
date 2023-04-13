import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Themes } from '@shared/constants/themes';
import { useAppTheme } from '@shared/hooks/use-theme';
import { ForwardedRef, forwardRef } from 'react';
import s from './header.module.scss';
import { whiteMoonIcon, sunIcon } from '@shared/font-awesome-icons';
import FlexContainer from 'components/containers/flex-container';

const LayoutHeader = forwardRef<HTMLDivElement, any>((props, ref: ForwardedRef<HTMLDivElement>) => {
  const [theme, setTheme] = useAppTheme();

  const changeThemeHandler = () => {
    const newTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(newTheme);
  };

  return (
    <FlexContainer ref={ref} className={s.header}>
      <div>Hello</div>
      <div>
        <a onClick={changeThemeHandler} className={s['header__theme-button']}>
          <FontAwesomeIcon icon={theme === Themes.light ? whiteMoonIcon : sunIcon} />
        </a>
      </div>
    </FlexContainer>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
