import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAnimalTypeIcon } from '@shared/utils/get-animal-type-icon';
import Avatar from '@ui/avatar';
import Button from '@ui/button';
import { AnimalEntity } from 'core/entities/animal.entity';
import { FC } from 'react';
import s from './animal-card.module.scss';

interface AnimalCardProps {
  animal: AnimalEntity;
}

const AnimalCard: FC<AnimalCardProps> = (props: AnimalCardProps) => {
  const { animal } = props;
  const { name, description, shelterId, age, type, sex, photos } = animal;

  return (
    <div className={s['animal-card']}>
      <div className={s['animal-card__header']}>
        <Avatar url={photos.length > 0 ? photos[0].url : undefined} label={name[0]} />
        <div className={s['animal-card__info']}>
          <label>
            {name} <FontAwesomeIcon icon={getAnimalTypeIcon(type)} />
          </label>
          <label>
            {sex == 'G' ? 'Девочка' : 'Мальчик'},{age} {age === 1 ? 'год' : age > 4 ? 'лет' : 'года'}
          </label>
        </div>
      </div>
      <div className={s['animal-card__photos']}>
        {photos.slice(1, 4).map((photo) => (
          <img src={photo.url} />
        ))}
      </div>
      <div className={s['animal-card__description']}>{description}</div>
      <div className={s['animal-card__footer']}>
        <Button as="button">Take</Button>
      </div>
    </div>
  );
};

AnimalCard.displayName = 'AnimalCard';

export default AnimalCard;
