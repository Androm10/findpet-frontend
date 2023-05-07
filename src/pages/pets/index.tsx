import { FC } from 'react';
import s from './pets.module.scss';
import AnimalCard from 'components/animal/animal-card';
import { AnimalEntity, AnimalTypes } from 'core/entities/animal.entity';
import Input from '@ui/input';
import Button from '@ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { searchIcon } from '@shared/font-awesome-icons';
import Select from '@ui/select';
import SearchOptions from 'components/animal/search-options';
import AnimalList from 'components/animal/animal-list';

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
      id: 2,
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
      id: 3,
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
    <div className={s['pet-page']}>
      <SearchOptions />
      <h1>Find a pet for yourself!</h1>
      <AnimalList animals={pets} />
    </div>
  );
};
PetsPage.displayName = 'PetsPage';

export default PetsPage;
