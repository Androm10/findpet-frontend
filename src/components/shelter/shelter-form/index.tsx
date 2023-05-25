import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { FC, useId, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import s from './shelter.module.scss';
import {
  cameraIcon,
  checkIcon,
  crossIcon,
  emailIcon,
  internetIcon,
  locationIcon,
  phoneIcon,
} from '@shared/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimalMiniCard from 'components/animal/animal-mini-card';
import { AnimalEntity } from 'core/entities/animal.entity';
import { routes } from '@shared/constants/routes';
import Input from '@ui/input';
import Button from '@ui/button';

const ShelterForm: FC = () => {
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

  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    if (fileReader.result) {
      setAvatarUrl(fileReader.result as string);
    }
  };

  const avatarChangeHandler = (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);

      setAvatar(file);
      fileReader.readAsDataURL(file);
    }
  };

  const avatarClearHandler = () => {
    setAvatar(undefined);
    setAvatarUrl('');
  };

  const photoInputId = useId();
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div className={s['shelter-form']}>
      <div className={s['shelter-form__info']}>
        <div className={s['shelter-form__photos']}>
          <label htmlFor={photoInputId} className={s['shelter-form__avatar']}>
            {/* <img src={shelter.photos[0].url} /> */}
            {avatarUrl ? <img src={avatarUrl} /> : <FontAwesomeIcon icon={cameraIcon} size="10x" />}
          </label>
          <div className={s['shelter-form__other-photos']}>
            <Input
              onChange={avatarChangeHandler}
              fullWidth
              type="file"
              accept="image/png, image/gif, image/jpeg"
              htmlId={photoInputId}
            />
            {avatar && (
              <Button onClick={avatarClearHandler} as="a" round size="medium">
                <FontAwesomeIcon icon={crossIcon} />
              </Button>
            )}
          </div>
        </div>
        <div className={s['shelter-form__props']}>
          <div className={s['shelter-form__prop']}>
            <label className={s['shelter-form__prop-name']}>Name</label>
            <label>
              <Input className={s['shelter-form__input']} />
            </label>
          </div>

          <div className={s['shelter-form__prop']}>
            <label className={s['shelter-form__prop-name']}>Description</label>
            <Input className={s['shelter-form__input']} />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Contact</h2>
          <div className={s['shelter-form__contact-info']}>
            <div className={s['shelter-form__contact']}>
              <label>Email</label>
              <Input className={s['shelter-form__input']}>
                <FontAwesomeIcon icon={emailIcon} />
              </Input>
            </div>
            <div className={s['shelter-form__contact']}>
              <label>Phone</label>
              <Input className={s['shelter-form__input']}>
                <FontAwesomeIcon icon={phoneIcon} />
              </Input>
            </div>
            <div className={s['shelter-form__contact']}>
              <label>Site</label>
              <Input className={s['shelter-form__input']}>
                <FontAwesomeIcon icon={internetIcon} />
              </Input>
            </div>
            <div className={s['shelter-form__map']}>
              <label>Address</label>
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
      <div className={s['shelter-form__buttons']}>
        <Button as="button" size="medium">
          Create
        </Button>
      </div>
    </div>
  );
};

ShelterForm.displayName = 'ShelterForm';

export default ShelterForm;
