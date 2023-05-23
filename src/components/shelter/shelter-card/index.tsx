import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkIcon, emailIcon, locationIcon, phoneIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import { ShelterEntity } from 'core/entities/shelter.entity';
import { FC } from 'react';
import s from './shelter-card.module.scss';

interface ShelterCardProps {
  shelter: ShelterEntity;
}

const ShelterCard: FC<ShelterCardProps> = (props: ShelterCardProps) => {
  const { shelter } = props;

  return (
    <div className={s['shelter-card']}>
      <div className={s['shelter-card__header']}>
        <div className={s['shelter-card__avatar']}>
          <img src={shelter.photos[0].url} />
        </div>
        <div className={s['shelter-card__info']}>
          <div className={s['shelter-card__name']}>
            {shelter.name}
            {shelter.isVerified && <FontAwesomeIcon color="#fff" icon={checkIcon} />}
          </div>
          {/* TODO: get address by coords */}
          <div className={s['shelter-card__location']}>
            <FontAwesomeIcon icon={locationIcon} />
            <label>{shelter.coords.latitude}</label>
          </div>
          <div className={s['shelter-card__phone']}>
            <FontAwesomeIcon icon={phoneIcon} />
            <label>{shelter.contactPhone}</label>
          </div>
          <div className={s['shelter-card__email']}>
            <FontAwesomeIcon icon={emailIcon} />
            <label>{shelter.contactEmail}</label>
          </div>
          <div className={s['shelter-card__photos']}>
            {shelter.photos.slice(1, 3).map((photo) => (
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
          <Button as="a">Open</Button>
        </div>
      </div>
    </div>
  );
};

ShelterCard.displayName = 'ShelterCard';

export default ShelterCard;
