import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import s from './shelter.module.scss';
import { checkIcon, emailIcon, locationIcon, phoneIcon, plusIcon } from '@shared/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimalMiniCard from 'components/animal/animal-mini-card';
import { AnimalEntity } from 'core/entities/animal.entity';
import { routes } from '@shared/constants/routes';
import { useGetShelterQuery, useLazyGetShelterQuery, useLazyGetWorkersQuery } from '@shared/store/api/shelter.api';
import {
  useGetAnimalsQuery,
  useLazyGetAnimalsByShelterIdQuery,
  useLazyGetAnimalsQuery,
} from '@shared/store/api/animal.api';
import { ShelterEntity } from 'core/entities/shelter.entity';
import Spinner from '@ui/spinner';
import shelterAvatar from 'assets/images/shelter-avatar.png';
import { addressByCoords } from '@shared/utils/address-by-coords';
import { useUserLocation } from '@shared/hooks/use-user-location.hook';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { UserEntity } from 'core/entities/user.entity';
import UserList from 'components/user/user-list';
import Button from '@ui/button';
import Modal from '@ui/modal';
import AddWorkerForm from 'components/user/add-worker-form';

const ShelterPage: FC = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.userReducer);
  const [shelter, setShelter] = useState<ShelterEntity | undefined>();
  const [animals, setAnimals] = useState<AnimalEntity[] | undefined>();
  const [workers, setWorkers] = useState<UserEntity[] | undefined>();
  const [address, setAddress] = useState('');
  const [isModalHidden, setModalHidden] = useState<boolean>(true);
  const location = useUserLocation();

  const {
    data: shelterData,
    isLoading: isShelterLoading,
    isFetching: isShelterFetching,
    isSuccess: isShelterSuccess,
  } = useGetShelterQuery(Number(id));

  const [
    getAnimals,
    { data: animalsData, isLoading: isAnimalsLoading, isFetching: isAnimalsFetching, isSuccess: isAnimalsSuccess },
  ] = useLazyGetAnimalsByShelterIdQuery();

  const [
    getWorkers,
    { data: workersData, isLoading: isWorkersLoading, isFetching: isWorkersFetching, isSuccess: isWorkersSuccess },
  ] = useLazyGetWorkersQuery();

  useEffect(() => {
    if (isShelterSuccess && shelterData) {
      setShelter(shelterData);
      addressByCoords(shelterData.coords).then(setAddress);
      getAnimals({
        shelterId: shelterData.id,
      });
      getWorkers(shelterData.id);
    }
  }, [isShelterFetching, isShelterLoading]);

  useEffect(() => {
    if (isAnimalsSuccess && animalsData) {
      setAnimals(animalsData.result);
    }
  }, [isAnimalsFetching, isAnimalsLoading]);

  useEffect(() => {
    if (isWorkersSuccess && workersData) {
      setWorkers(workersData);
    }
  });

  if (isShelterLoading || isShelterFetching) {
    return <Spinner />;
  }

  if (!shelter) {
    return null;
  }

  return (
    <div className={s['shelter-page']}>
      <div className={s['shelter-page__info']}>
        <div className={s['shelter-page__photos']}>
          <div className={s['shelter-page__avatar']}>
            <img src={shelter.photos && shelter.photos.length ? shelter.photos[0].url : shelterAvatar} />
          </div>
          <div className={s['shelter-page__other-photos']}>
            {!!shelter.photos &&
              !!shelter.photos.length &&
              shelter.photos.slice(1, 4).map((photo) => (
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
            <label>{address}</label>
          </div>
          <div className={s['shelter-page__prop']}>
            <label className={s['shelter-page__prop-name']}>Description</label>
            <label>{shelter.description}</label>
          </div>
        </div>
      </div>
      <div>
        <div>
          {<h2>Contact</h2>}
          <div className={s['shelter-page__contact-info']}>
            {!!shelter.contactEmail && (
              <div className={s['shelter-page__contact']}>
                <FontAwesomeIcon icon={emailIcon} />
                <label>{shelter.contactEmail}</label>
              </div>
            )}
            {!!shelter.contactPhone && (
              <div className={s['shelter-page__contact']}>
                <FontAwesomeIcon icon={phoneIcon} />
                <label>{shelter.contactPhone}</label>
              </div>
            )}
            {!!shelter.coords && !!address && (
              <div className={s['shelter-page__contact']}>
                <FontAwesomeIcon icon={locationIcon} />
                <label>{address}</label>
              </div>
            )}
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
              {!!location && <Placemark geometry={[location.longitude, location.latitude]} />}
            </Map>
          </YMaps>
        </div>
        <div>
          <h2>Animals</h2>
          <div className={s['shelter-page__animals-view']}>
            <div className={s['shelter-page__animals']}>
              {!!user && user.shelterId == id && (
                <Link to={'/' + routes.createAnimal}>
                  <label className={s['shelter-page__add-animal']}>
                    <FontAwesomeIcon icon={plusIcon} size="4x" />
                  </label>
                </Link>
              )}
              {isAnimalsFetching || isAnimalsLoading ? (
                <Spinner />
              ) : (
                <>
                  {!!animals &&
                    animals.map((animal) => (
                      <Link to={'/' + routes.animal + animal.id} key={animal.id}>
                        <AnimalMiniCard key={animal.id} animal={animal} />
                      </Link>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className={s['shelter-page__section-header']}>
            <h2>Workers</h2>
            {!!user && !!user.shelterId && (
              <Button as="button" size="medium" onClick={() => setModalHidden(false)}>
                Add
              </Button>
            )}
          </div>
          {isWorkersFetching || isWorkersLoading ? (
            <Spinner />
          ) : (
            <>
              {!!workers && (
                <div className={s['shelter-page__worker-list']}>
                  <UserList users={workers} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Modal isHidden={isModalHidden} setHidden={setModalHidden}>
        <AddWorkerForm onSuccess={() => setModalHidden(true)} />
      </Modal>
    </div>
  );
};

ShelterPage.displayName = 'ShelterPage';

export default ShelterPage;
