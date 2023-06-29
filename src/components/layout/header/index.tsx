import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Themes } from '@shared/constants/themes';
import { useAppTheme } from '@shared/hooks/use-theme';
import { ForwardedRef, forwardRef, memo, useEffect, useRef, useState, MouseEvent } from 'react';
import s from './header.module.scss';
import {
  whiteMoonIcon,
  sunIcon,
  burgerIcon,
  crossIcon,
  homeIcon,
  petsIcon,
  searchIcon,
  sheltersIcon,
  plusIcon,
  editIcon,
  chatIcon,
} from '@shared/font-awesome-icons';
import FlexContainer from 'components/containers/flex-container';
import Button from '@ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '@shared/constants/routes';
import Toggle from '@ui/toggle';
import Input from '@ui/input';
import { classNames } from '@shared/utils/class-names';
import logo from 'assets/images/logo.png';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import Avatar from '@ui/avatar';
import { useAppDispatch } from '@shared/hooks/app-dispatch.hook';
import { animalsFilterActions } from '@shared/store/slices/animals-filter.slice';
import ChatbotDraggable from 'components/chatbot/chatbot-draggable';
import FloatingMenu from '@ui/floating-menu';
import UserProfileMenu from 'components/user/user-profile-menu';
import ChatPanel from 'components/chat/chat-panel';

const LayoutHeader = forwardRef<HTMLDivElement, any>((props, ref: ForwardedRef<HTMLDivElement>) => {
  const [theme, setTheme] = useAppTheme();
  const [isMenu, setMenu] = useState(false);
  const [isUserMenu, setUserMenu] = useState(true);
  const [isChatMenu, setChatMenu] = useState(true);

  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setName } = animalsFilterActions;
  const [searchText, setSearchText] = useState('');

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

  const searchHandler = () => {
    dispatch(setName(searchText));
    navigate(routes.pets);
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
        <div className={s['header__logo']}>
          <img src={logo} height="50" />
        </div>

        <nav className={s['header__navigation']}>
          {user ? (
            <div className={s['header__user-section']}>
              <div className={s['header__user-property']}>
                {!!user.shelterId && (
                  <Link to={'/' + routes.shelter + user.shelterId}>
                    <FontAwesomeIcon icon={sheltersIcon} />
                  </Link>
                )}
                <ChatbotDraggable />
              </div>
              <FloatingMenu marginTop="20px" element={<ChatPanel />} isHidden={isChatMenu} setHidden={setChatMenu}>
                <div className={s['header__user-property']} onClick={() => setChatMenu(!isChatMenu)}>
                  <FontAwesomeIcon icon={chatIcon} />
                </div>
              </FloatingMenu>
              <FloatingMenu
                marginTop="70px"
                element={<UserProfileMenu />}
                isHidden={isUserMenu}
                setHidden={setUserMenu}
              >
                <div className={s.header__user} onClick={() => setUserMenu(!isUserMenu)}>
                  {user.login} <Avatar url={user?.avatar?.url} label={user.login[0]} />
                </div>
              </FloatingMenu>
            </div>
          ) : (
            <Link to={routes.login}>
              <Button as="button" size="medium">
                Login
              </Button>
            </Link>
          )}
          <div className={s['header__menu-button']}>
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
        </nav>
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
            <Input
              placeholder="Search pets..."
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            >
              <Button as="button" onClick={searchHandler}>
                <FontAwesomeIcon icon={searchIcon} />
              </Button>
            </Input>
          </div>
        </div>

        {!!user && (
          <div>
            <Link
              to={user.shelterId ? `/${routes.shelter}${user.shelterId}` : routes.createShelter}
              className={s.header__link}
            >
              <div className={s['header__menu-item']}>
                <div className={s['header__compose-icons']}>
                  <FontAwesomeIcon icon={sheltersIcon} />
                  <FontAwesomeIcon className={s['header__plus-icon']} icon={user.shelterId ? editIcon : plusIcon} />
                </div>
                {user.shelterId ? 'MY SHELTER' : 'ADD SHELTER'}
              </div>
            </Link>
            <Link to={routes.createAnimal} className={s.header__link}>
              <div className={s['header__menu-item']}>
                <div className={s['header__compose-icons']}>
                  <FontAwesomeIcon icon={petsIcon} />
                  <FontAwesomeIcon className={s['header__plus-icon']} icon={plusIcon} />
                </div>
                ADD ANIMAL
              </div>
            </Link>
          </div>
        )}

        <Link to={routes.home} className={s.header__link}>
          <div className={s['header__menu-item']}>
            <FontAwesomeIcon icon={homeIcon} /> HOME
          </div>
        </Link>

        <Link to={routes.pets} className={s.header__link}>
          <div className={s['header__menu-item']}>
            <FontAwesomeIcon icon={petsIcon} /> PETS
          </div>
        </Link>
        <Link to={routes.shelters} className={s.header__link}>
          <div className={s['header__menu-item']}>
            <FontAwesomeIcon icon={sheltersIcon} /> SHELTERS
          </div>
        </Link>
      </div>
    </>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default memo(LayoutHeader);
