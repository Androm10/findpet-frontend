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
      photos: [
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
      ],
      age: 2,
      sex: 'M',
    },
    {
      id: 1,
      name: 'vasya',
      type: 'cat',
      description: 'a very lovely cat',
      photos: [
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
      ],
      age: 2,
      sex: 'M',
    },
    {
      id: 1,
      name: 'vasya',
      type: 'cat',
      description: 'a very lovely cat',
      photos: [
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
        {
          name: 'fsf.png',
          url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
        },
      ],
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
