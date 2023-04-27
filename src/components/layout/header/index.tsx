import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Themes } from '@shared/constants/themes';
import { useAppTheme } from '@shared/hooks/use-theme';
import { ForwardedRef, forwardRef, memo } from 'react';
import s from './header.module.scss';
import { whiteMoonIcon, sunIcon } from '@shared/font-awesome-icons';
import FlexContainer from 'components/containers/flex-container';
import Button from '@ui/button';

const LayoutHeader = forwardRef<HTMLDivElement, any>((props, ref: ForwardedRef<HTMLDivElement>) => {
  const [theme, setTheme] = useAppTheme();

  const changeThemeHandler = () => {
    const newTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(newTheme);
  };

  return (
    <FlexContainer ref={ref} className={s.header}>
      <div>Put logo here</div>
      <div>
        <Button
          as="a"
          size="medium"
          round
          onClick={changeThemeHandler}
          className={s['header__theme-button']}
          data-cy="change-theme-button"
        >
          <FontAwesomeIcon size="lg" icon={theme === Themes.light ? whiteMoonIcon : sunIcon} />
        </Button>
      </div>
    </FlexContainer>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default memo(LayoutHeader);
