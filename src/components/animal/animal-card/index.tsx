import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '@shared/constants/routes';
import { getAnimalTypeIcon } from '@shared/utils/get-animal-type-icon';
import Avatar from '@ui/avatar';
import Button from '@ui/button';
import { AnimalEntity } from 'core/entities/animal.entity';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './animal-card.module.scss';
import animalAvatar from 'assets/images/animal-avatar.jpg';

interface AnimalCardProps {
  animal: AnimalEntity;
}

const AnimalCard: FC<AnimalCardProps> = (props: AnimalCardProps) => {
  const { animal } = props;
  const { name, description, shelterId, age, type, sex, photos } = animal;

  return (
    <div className={s['animal-card']}>
      <div className={s['animal-card__header']}>
        <Avatar url={photos && photos.length > 0 ? photos[0].url : animalAvatar} label={name[0]} />
        <div className={s['animal-card__info-container']}>
          <div className={s['animal-card__info']}>
            <label>
              {name} <FontAwesomeIcon icon={getAnimalTypeIcon(type)} />
            </label>
            <label className={s['animal-card__info-params']}>
              {sex == 'G' ? 'G' : 'M'}, {age} {age === 1 ? 'год' : age > 4 ? 'лет' : 'года'}
            </label>
          </div>
        </div>
      </div>
      <div className={s['animal-card__photos']}>
        {photos && photos.length > 1 ? (
          <>
            {photos.slice(1, 4).map((photo, index) => (
              <div key={photo.url} className={s['animal-card__photo-container']}>
                <img src={photo.url} />
              </div>
            ))}
          </>
        ) : (
          <div className={s['animal-card__photo-container']}>
            <img src={animalAvatar} />
          </div>
        )}
      </div>
      <div className={s['animal-card__description']}>{description}</div>
      <div className={s['animal-card__footer']}>
        <Link to={'/' + routes.animal + animal.id}>
          <Button size="medium" as="button">
            Take
          </Button>
        </Link>
      </div>
    </div>
  );
};

AnimalCard.displayName = 'AnimalCard';

export default AnimalCard;
