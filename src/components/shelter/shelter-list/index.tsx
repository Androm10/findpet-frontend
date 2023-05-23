import { ShelterEntity } from 'core/entities/shelter.entity';
import { FC } from 'react';
import ShelterCard from '../shelter-card';
import s from './shelter-list.module.scss';

interface ShelterListProps {
  shelters: ShelterEntity[];
}

const ShelterList: FC<ShelterListProps> = (props: ShelterListProps) => {
  const { shelters } = props;

  return (
    <div className={s['shelter-list']}>
      {shelters.map((shelter) => (
        <div key={shelter.id} className={s['shelter-list__item']}>
          <ShelterCard shelter={shelter} />
        </div>
      ))}
    </div>
  );
};

ShelterList.displayName = 'ShelterList';

export default ShelterList;
