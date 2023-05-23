import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '@shared/constants/routes';
import {
  catIcon,
  devIcon,
  dogIcon,
  emailIcon,
  homeIcon,
  petsIcon,
  phoneIcon,
  whiteMoonIcon,
} from '@shared/font-awesome-icons';
import { classNames } from '@shared/utils/class-names';
import Button from '@ui/button';
import { FC, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import s from './footer.module.scss';

export const LayoutFooter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={s.footer}>
      <div className={s.footer__section}>
        <h2 className={s.footer__name}>Find pets</h2>
        <div className={s.footer__media}>
          <Button as="a" round>
            <FontAwesomeIcon icon={phoneIcon} />
          </Button>
          <Button as="a" round>
            <FontAwesomeIcon icon={catIcon} />
          </Button>
          <Button as="a" round>
            <FontAwesomeIcon icon={dogIcon} />
          </Button>
        </div>
      </div>
      <div className={s.footer__navigation}>
        <div className={s['footer__navigation-block']}>
          <div>Resources</div>
          <Link to={routes.home}>Home</Link>
          <Link to={routes.pets}>Pets</Link>
          <Link to={routes.shelters}>Shelters</Link>
        </div>
        <div className={s['footer__navigation-block']}>
          Company
          <a>About us</a>
          <a>Socials</a>
        </div>
        <div className={s['footer__navigation-block']}>
          Other
          <a>Partners</a>
          <a>Ads</a>
        </div>
        <div className={s['footer__navigation-block']}>
          Contact
          <a>
            <FontAwesomeIcon icon={emailIcon} />
            example@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
export default memo(LayoutFooter);
