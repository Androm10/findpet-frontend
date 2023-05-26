import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { FC, useEffect, useId, useState } from 'react';
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
import { YANDEX_API_KEY } from '@shared/constants/api';
import { coordsByAddress } from '@shared/utils/coords-by-address';
import { useDebounce } from '@shared/hooks/use-debounce.hook';
import { Coords } from 'core/types/coords.type';

const ShelterForm: FC = () => {
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
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<Coords>({ longitude: 10, latitude: 10 });

  const fetchAddress = async () => {
    const result = await coordsByAddress(address);
    setCoords(result);
  };

  const debouncedFetchAddress = useDebounce(fetchAddress, 1000);

  useEffect(() => {
    if (!address) return;
    debouncedFetchAddress();
  }, [address]);

  return (
    <div className={s['shelter-form']}>
      <div className={s['shelter-form__info']}>
        <div className={s['shelter-form__photos']}>
          <label htmlFor={photoInputId} className={s['shelter-form__avatar']}>
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
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={s['shelter-form__input']}
              />
              <YMaps query={{ apikey: YANDEX_API_KEY }}>
                <Map
                  width="100%"
                  height="400px"
                  state={{ center: [coords.longitude, coords.latitude], zoom: 12 }}
                  defaultState={{ center: [coords.longitude, coords.latitude], zoom: 9 }}
                >
                  {coords && <Placemark geometry={[coords.longitude, coords.latitude]} />}
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
