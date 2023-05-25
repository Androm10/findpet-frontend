import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import s from './shelter.module.scss';
import { checkIcon, emailIcon, locationIcon, phoneIcon } from '@shared/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimalMiniCard from 'components/animal/animal-mini-card';
import { AnimalEntity } from 'core/entities/animal.entity';
import { routes } from '@shared/constants/routes';

const ShelterPage: FC = () => {
  const { id } = useParams();

  const animals: AnimalEntity[] = [
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
    {
      id: 4,
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

  const shelter = {
    id: 1,
    name: 'Pet home',
    coords: { latitude: 12, longitude: 12 },
    photos: [
      {
        name: 'photo',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
      },
      {
        name: 'photo',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
      },
      {
        name: 'photo',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
      },
      {
        name: 'photo',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
      },
      {
        name: 'photo',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAaUahe6u1LzbxEuBqO2h3_F8QZq-mHVcS-vfY7qc6Oq5rIDe0TnO9M3oqrsizq0Ya0U&usqp=CAU',
      },
    ],
    description: 'A home for every lost animal',
    contactPhone: '+880-555-35-35',
    contactEmail: 'email.contact@example.com',
    address: 'fsa rwer2 23 3 ',
    isVerified: true,
  };

  return (
    <div className={s['shelter-page']}>
      <div className={s['shelter-page__info']}>
        <div className={s['shelter-page__photos']}>
          <div className={s['shelter-page__avatar']}>
            <img src={shelter.photos[0].url} />
          </div>
          <div className={s['shelter-page__other-photos']}>
            {shelter.photos.slice(1, 4).map((photo) => (
              <div className={s['shelter-page__photo']} key={photo.url + photo.name}>
                <img src={photo.url} />
              </div>
            ))}
          </div>
        </div>
        <div className={s['shelter-page__props']}>
          <div className={s['shelter-page__prop']}>
            <label className={s['shelter-page__prop-name']}>Name</label>
            <label>
              {shelter.name} {shelter.isVerified && <FontAwesomeIcon color="#000" icon={checkIcon} />}{' '}
            </label>
          </div>

          <div className={s['shelter-page__prop']}>
            <label className={s['shelter-page__prop-name']}>Address</label>
            <label>{shelter.address}</label>
          </div>
          <div className={s['shelter-page__prop']}>
            <label className={s['shelter-page__prop-name']}>Description</label>
            <label>{shelter.description}</label>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Contact</h2>
          <div className={s['shelter-page__contact-info']}>
            <div className={s['shelter-page__contact']}>
              <FontAwesomeIcon icon={emailIcon} />
              <label>{shelter.contactEmail}</label>
            </div>
            <div className={s['shelter-page__contact']}>
              <FontAwesomeIcon icon={phoneIcon} />
              <label>{shelter.contactPhone}</label>
            </div>
            <div className={s['shelter-page__contact']}>
              <FontAwesomeIcon icon={locationIcon} />
              <label>{shelter.address}</label>
            </div>
          </div>
        </div>
        <div className={s['shelter-page__map']}>
          <YMaps>
            <Map
              width="100%"
              height="400px"
              defaultState={{ center: [shelter.coords.longitude, shelter.coords.latitude], zoom: 9 }}
            >
              <Placemark geometry={[shelter.coords.longitude, shelter.coords.latitude]} />
            </Map>
          </YMaps>
        </div>
        <div>
          <h2>Animals</h2>
          <div className={s['shelter-page__animals-view']}>
            <div className={s['shelter-page__animals']}>
              {animals.map((animal) => (
                <Link to={'/' + routes.animal + animal.id} key={animal.id}>
                  <AnimalMiniCard key={animal.id} animal={animal} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShelterPage.displayName = 'ShelterPage';

export default ShelterPage;
