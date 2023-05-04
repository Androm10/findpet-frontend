import AnimalCard from 'components/animal/animal-card';
import { AnimalEntity } from 'core/entities/animal.entity';
import { FC } from 'react';

const PetsPage: FC = () => {
  const pets: AnimalEntity[] = [
    {
      id: 1,
      name: 'vasya',
      type: 'cat',
      description: 'a very lovely cat',
      photos: [],
      age: 2,
      sex: 'M',
    },
  ];
  return (
    <div>
      <h1>Pets page</h1>
      <div>
        {pets.map((pet) => (
          <AnimalCard animal={pet} />
        ))}
      </div>
    </div>
  );
};
PetsPage.displayName = 'PetsPage';

export default PetsPage;
