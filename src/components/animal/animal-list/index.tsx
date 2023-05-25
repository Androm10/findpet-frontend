import { AnimalEntity } from 'core/entities/animal.entity';
import { FC } from 'react';
import AnimalCard from '../animal-card';
import s from './animal-list.module.scss';

interface AnimalListProps {
  animals: AnimalEntity[];
}

const AnimalList: FC<AnimalListProps> = (props: AnimalListProps) => {
  const { animals } = props;
  console.log(animals);

  return (
    <div className={s['animal-list']}>
      {animals.map((animal) => (
        <div key={animal.id} className={s['animal-list__item']}>
          <AnimalCard animal={animal} />
        </div>
      ))}
    </div>
  );
};

AnimalList.displayName = 'AnimalList';

export default AnimalList;
