import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '@shared/constants/routes';
import { getAnimalTypeIcon } from '@shared/utils/get-animal-type-icon';
import Avatar from '@ui/avatar';
import Button from '@ui/button';
import { AnimalEntity } from 'core/entities/animal.entity';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './animal-mini-card.module.scss';
import animalAvatar from 'assets/images/animal-avatar.jpg';

interface AnimalMiniCardProps {
  animal: AnimalEntity;
}

const AnimalMiniCard: FC<AnimalMiniCardProps> = (props: AnimalMiniCardProps) => {
  const { animal } = props;
  const { name, description, shelterId, age, type, sex, photos } = animal;

  return (
    <div className={s['animal-mini-card']}>
      <div className={s['animal-mini-card__photo']}>
        <img src={photos.length > 0 ? photos[0].url : animalAvatar} />
      </div>
      <div className={s['animal-mini-card__info-container']}>
        <div className={s['animal-mini-card__info']}>
          <label>
            {name} <FontAwesomeIcon icon={getAnimalTypeIcon(type)} />
          </label>
          <label className={s['animal-mini-card__info-params']}>
            {sex == 'G' ? 'G' : 'M'}, {age} {age === 1 ? 'год' : age > 4 ? 'лет' : 'года'}
          </label>
        </div>
      </div>
    </div>
  );
};

AnimalMiniCard.displayName = 'AnimalMiniCard';

export default AnimalMiniCard;
