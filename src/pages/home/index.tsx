import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import homeBackgroundImage from 'assets/images/home-background.jpg';
import s from './home.module.scss';
import Button from '@ui/button';
import { routes } from '@shared/constants/routes';
import { ShelterEntity } from 'core/entities/shelter.entity';
import { useGetNearestSheltersQuery } from '@shared/store/api/shelter.api';
import Spinner from '@ui/spinner';
import ShelterList from 'components/shelter/shelter-list';
import { useGetAnimalsQuery } from '@shared/store/api/animal.api';
import AnimalList from 'components/animal/animal-list';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { useUserLocation } from '@shared/hooks/use-user-location.hook';

const HomePage: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const location = useUserLocation();

  const {
    data: sheltersData,
    isLoading: isSheltersLoading,
    isFetching: isSheltersFetching,
  } = useGetNearestSheltersQuery(
    location ? { lat: location.latitude, lng: location.longitude } : { lat: 30.2, lng: 55.192 },
  );
  const { data: animalsData, isLoading: isAnimalsLoading, isFetching: isAnimalsFetching } = useGetAnimalsQuery({});

  return (
    <div className={s['home-page']}>
      <div className={s['home-page__preview']}>
        <img src={homeBackgroundImage} />
        <div className={s['home-page__preview-text']}>
          <h3>Find Pets</h3>
          <div>Save animal lives, find your new pet</div>
          <div className={s['home-page__preview-button']}>
            <Link to={routes.pets}>
              <Button as="button" size="medium">
                Find pet
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={s['home-page__section']}>
        <h2>Look for nearest shelters</h2>
        {isSheltersLoading || isSheltersFetching || !sheltersData ? (
          <Spinner />
        ) : (
          <>
            <div className={s['home-page__list']}>
              <ShelterList shelters={sheltersData.result} />
            </div>
            <Link to={routes.shelters}>
              <Button as="button" size="medium" className={s['home-page__more-button']}>
                More
              </Button>
            </Link>
          </>
        )}
      </div>
      <div className={s['home-page__section']}>
        <h2>Pets</h2>
        {isAnimalsLoading || isAnimalsFetching || !animalsData ? (
          <Spinner />
        ) : (
          <>
            <div className={s['home-page__list']}>
              <AnimalList animals={animalsData.result} />
            </div>
            <Link to={routes.pets}>
              <Button as="button" size="medium" className={s['home-page__more-button']}>
                More
              </Button>
            </Link>
          </>
        )}
      </div>
      <div className={s['home-page__section']}>
        <h2>Find new home for your pet</h2>
        <p>
          If you are worker of some shelter, or you looking for a new home for your pet for some reasons,
          <Link to={routes.signup}> sign up </Link>
          to add your shelter
        </p>
        <div>
          <Link
            to={user ? (user.shelterId ? `/${routes.shelter}${user.shelterId}` : routes.createShelter) : routes.login}
          >
            <Button as="button" size="medium">
              {user && user.shelterId ? 'My shelter' : 'Register shelter'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
HomePage.displayName = 'HomePage';

export default HomePage;
