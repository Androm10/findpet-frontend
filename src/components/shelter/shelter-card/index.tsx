import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { YANDEX_API_KEY } from '@shared/constants/api';
import { routes } from '@shared/constants/routes';
import { checkIcon, emailIcon, locationIcon, phoneIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import { ShelterEntity } from 'core/entities/shelter.entity';
import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './shelter-card.module.scss';
import shelterAvatar from 'assets/images/shelter-avatar.png';
import { addressByCoords } from '@shared/utils/address-by-coords';

interface ShelterCardProps {
  shelter: ShelterEntity;
}

const ShelterCard: FC<ShelterCardProps> = (props: ShelterCardProps) => {
  const { shelter } = props;
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!shelter.coords) return;

    addressByCoords(shelter.coords).then(setAddress);
  }, [shelter]);

  return (
    <div className={s['shelter-card']}>
      <div className={s['shelter-card__header']}>
        <div className={s['shelter-card__avatar']}>
          <img src={shelter.photos && shelter.photos[0] ? shelter.photos[0].url : shelterAvatar} />
        </div>
        <div className={s['shelter-card__info']}>
          <div className={s['shelter-card__name']}>
            {shelter.name}
            {shelter.isVerified && <FontAwesomeIcon color="#fff" icon={checkIcon} />}
          </div>
          {/* TODO: get address by coords */}
          <div className={s['shelter-card__location']}>
            <FontAwesomeIcon icon={locationIcon} />
            <label>{address}</label>
          </div>
          {!!shelter.contactPhone && (
            <div className={s['shelter-card__phone']}>
              <FontAwesomeIcon icon={phoneIcon} />
              <label>{shelter.contactPhone}</label>
            </div>
          )}
          {!!shelter.contactEmail && (
            <div className={s['shelter-card__email']}>
              <FontAwesomeIcon icon={emailIcon} />
              <label>{shelter.contactEmail}</label>
            </div>
          )}
          <div className={s['shelter-card__photos']}>
            {shelter.photos &&
              shelter.photos.slice(1, 3).map((photo) => (
                <div key={photo.url + photo.name} className={s['shelter-card__photo']}>
                  <img src={photo.url} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={s['shelter-card__body']}>
        <div className={s['shelter-card__description']}>{shelter.description}</div>
        <div className={s['shelter-card__buttons']}>
          <Link to={'/' + routes.shelter + shelter.id}>
            <Button as="button" size="medium">
              Open
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ShelterCard.displayName = 'ShelterCard';

export default ShelterCard;
