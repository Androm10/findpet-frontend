import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Themes } from '@shared/constants/themes';
import { useAppTheme } from '@shared/hooks/use-theme';
import { ForwardedRef, forwardRef, memo, SyntheticEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import s from './header.module.scss';
import {
  whiteMoonIcon,
  sunIcon,
  burgerIcon,
  crossIcon,
  homeIcon,
  petsIcon,
  devIcon,
  searchIcon,
} from '@shared/font-awesome-icons';
import FlexContainer from 'components/containers/flex-container';
import Button from '@ui/button';
import { Link } from 'react-router-dom';
import { routes } from '@shared/constants/routes';
import Toggle from '@ui/toggle';
import Input from '@ui/input';
import { classNames } from '@shared/utils/class-names';

const LayoutHeader = forwardRef<HTMLDivElement, any>((props, ref: ForwardedRef<HTMLDivElement>) => {
  const [theme, setTheme] = useAppTheme();
  const [isMenu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const changeThemeHandler = () => {
    const newTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(newTheme);
  };

  const clickOutsideHandler = (event: Event) => {
    if (!menuRef.current) return;
    if (event.target != menuRef.current && !menuRef?.current.contains(event.target as Element)) {
      setMenu(false);
    }
  };

  const menuClickHandler = (event: MouseEvent) => {
    setMenu(!isMenu);
    event.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);
    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [clickOutsideHandler]);

  return (
    <>
      <FlexContainer ref={ref} className={s.header}>
        <div>Put logo here</div>
        <div>
          <Button
            as="a"
            size="medium"
            round
            onClick={menuClickHandler}
            className={s['header__theme-button']}
            data-cy="burger-button"
          >
            <FontAwesomeIcon size="lg" icon={!isMenu ? burgerIcon : crossIcon} />
          </Button>
        </div>
      </FlexContainer>
      <div
        className={[
          s.header__menu,
          classNames({
            [s.header__menu_active]: isMenu,
          }),
        ].join(' ')}
        ref={menuRef}
      >
        <div className={s.header__theme}>
          <Toggle checked={theme === Themes.light} onChange={changeThemeHandler} />
          <FontAwesomeIcon size="lg" icon={theme === Themes.light ? whiteMoonIcon : sunIcon} />
        </div>
        <div className={s.header__search}>
          <div className={s['header__input-container']}>
            <Input placeholder="Search pets..." fullWidth>
              <FontAwesomeIcon icon={searchIcon} />
            </Input>
          </div>
        </div>
        <Link to={routes.home} className={s.header__link}>
          <div className={s['header__menu-item']}>
            <FontAwesomeIcon icon={homeIcon} /> HOME
          </div>
        </Link>
        <Link to={routes.dev} className={s.header__link}>
          <div className={s['header__menu-item']}>
            <FontAwesomeIcon icon={devIcon} /> DEV
          </div>
        </Link>
        <Link to={routes.pets} className={s.header__link}>
          <div className={s['header__menu-item']}>
            <FontAwesomeIcon icon={petsIcon} /> PETS
          </div>
        </Link>
      </div>
    </>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default memo(LayoutHeader);
