import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { circleIcon, emailIcon, locationIcon, marsIcon, phoneIcon, venusIcon } from '@shared/font-awesome-icons';
import { getAnimalTypeIcon } from '@shared/utils/get-animal-type-icon';
import { AnimalEntity, AnimalTypes } from 'core/entities/animal.entity';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './animal.module.scss';
import pawImage from 'assets/images/animal-paw.png';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { useGetAnimalQuery } from '@shared/store/api/animal.api';
import { ShelterEntity } from 'core/entities/shelter.entity';
import Spinner from '@ui/spinner';
import { useLazyGetShelterQuery } from '@shared/store/api/shelter.api';

const AnimalPage: FC = () => {
  const { id } = useParams();

  const {
    data: animalData,
    isFetching: isAnimalFetching,
    isLoading: isAnimalLoading,
    isSuccess: isAnimalSuccess,
  } = useGetAnimalQuery(Number(id));

  const [
    getShelter,
    { data: shelterData, isLoading: isShelterLoading, isFetching: isShelterFetching, isSuccess: isShelterSuccess },
  ] = useLazyGetShelterQuery();

  const [animal, setAnimal] = useState<AnimalEntity | undefined>(animalData);
  const [shelter, setShelter] = useState<ShelterEntity | undefined>(shelterData);

  useEffect(() => {
    if (isAnimalSuccess && animalData) {
      setAnimal(animalData);
      if (animalData.shelterId) {
        getShelter(animalData.shelterId);
      }
    }
  }, [isAnimalLoading, isAnimalFetching]);

  useEffect(() => {
    if (isShelterSuccess && shelterData) {
      setShelter(shelterData);
    }
  }, [isShelterLoading, isShelterFetching]);

  if (isAnimalLoading || isAnimalFetching || isShelterFetching || isShelterLoading) {
    return <Spinner />;
  }

  if (!animal || !shelter) return null;
  // const animal = {
  //   id: 1,
  //   name: 'vasya',
  //   type: 'cat' as keyof typeof AnimalTypes,
  //   description:
  //     'a very lovely cat Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, corrupti! Explicabo eum repellendus vitae vero qui harum ea ducimus dolor quasi. Aliquid et accusantium ullam, voluptatum eaque quis esse temporibus?',
  //   photos: [
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //     {
  //       name: 'fsf.png',
  //       url: 'https://images.unsplash.com/flagged/photo-1557427161-4701a0fa2f42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
  //     },
  //   ],
  //   age: 2,
  //   sex: 'M',
  // };

  // const shelter = {
  //   name: "Aleksandrov's pets",
  //   address: 'Washington D.C., 43 street, 24 d',
  //   contactPhone: '+992-232-323-22',
  //   contactEmail: 'tete@gmail.com',
  //   contactUrl: 'http://example.com',
  //   coords: {
  //     longitude: 12,
  //     latitude: 12,
  //   },
  // };

  return (
    <div className={s['animal-page']}>
      <div className={s['animal-page__content']}>
        <div className={s['animal-page__info']}>
          <div className={s['animal-page__avatar']}>
            <img src={animal.photos[0].url} />
          </div>

          <div className={s['animal-page__props']}>
            <div className={s['animal-page__paw']}>
              <img src={pawImage} />
            </div>
            <div className={s['animal-page__props-name']}>
              {animal.name} <FontAwesomeIcon icon={animal.type ? getAnimalTypeIcon(animal.type) : circleIcon} />{' '}
            </div>
            <div className={s['animal-page__props-sex']}>
              {animal.age} {animal.age === 1 ? 'год' : animal.age > 4 ? 'лет' : 'года'},{' '}
              {animal.sex == 'M' ? 'Boy' : 'Girl'}
              <FontAwesomeIcon icon={animal.sex === 'M' ? marsIcon : venusIcon} />
            </div>
            <hr className={s['animal-page__separator']} />
            <div>{animal.description}</div>
            <div>
              <div className={s['animal-page__shelter-data']}>
                <FontAwesomeIcon icon={locationIcon} />
                <label>YOUR ADDRESS</label>
              </div>
              {!!shelter.contactPhone && (
                <div className={s['animal-page__shelter-data']}>
                  <FontAwesomeIcon icon={phoneIcon} />
                  <label>{shelter.contactPhone}</label>
                </div>
              )}
              {!!shelter.contactEmail && (
                <div className={s['animal-page__shelter-data']}>
                  <FontAwesomeIcon icon={emailIcon} />
                  <label>{shelter.contactEmail}</label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={s['animal-page__other']}>
          <div className={s['animal-page__photos-view']}>
            <div className={s['animal-page__photos']}>
              {animal.photos.slice(1).map((photo) => (
                <div key={photo.url + photo.name} className={s['animal-page__photo']}>
                  <img src={photo.url} />
                </div>
              ))}
            </div>
          </div>
          <div className={s['animal-page__shelter']}>
            <div className={s['animal-page__shelter-name']}>{shelter.name}</div>
            <div>YOUR ADDRESS</div>
            <div className={s['animal-page__map']}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

AnimalPage.displayName = 'AnimalPage';

export default AnimalPage;
