import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { FC, useEffect, useId, useRef, useState } from 'react';
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
  plusIcon,
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
import { readImageUrl } from '@shared/utils/read-file';
import Textarea from '@ui/textarea';
import { useAddShelterPhotosMutation, useCreateShelterMutation } from '@shared/store/api/shelter.api';

const ShelterForm: FC = () => {
  const [
    createShelter,
    { data: shelterData, isLoading: isShelterLoading, isSuccess: isShelterSuccess, isError: isShelterError },
  ] = useCreateShelterMutation();
  const [addPhotos, { data, isLoading, isSuccess, isError }] = useAddShelterPhotosMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactUrl, setContactUrl] = useState('');
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [address, setAddress] = useState('');
  const [otherPhotos, setOtherPhotos] = useState<any[]>([]);
  const [otherPhotosUrls, setOtherPhotosUrls] = useState<string[]>([]);
  const [coords, setCoords] = useState<Coords>({ longitude: 10, latitude: 10 });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const otherPhotosInputRef = useRef<HTMLInputElement>(null);
  const photoInputId = useId();
  const otherPhotosInputId = useId();

  const avatarChangeHandler = (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);

      setAvatar(file);
      readImageUrl(file).then((res) => setAvatarUrl(res));
    }
  };

  const otherPhotosChangeHandler = async (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        setOtherPhotos((prev) => [...prev, file]);

        readImageUrl(file).then((res) => setOtherPhotosUrls((prev) => [...prev, res as string]));
      }
      if (otherPhotosInputRef.current) {
        otherPhotosInputRef.current.value = '';
        otherPhotosInputRef.current.files = null;
      }
    }
  };

  const removeOtherPhotoHandler = (index: number) => {
    setOtherPhotos((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    setOtherPhotosUrls((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const avatarClearHandler = () => {
    setAvatar(undefined);
    setAvatarUrl('');
    if (avatarInputRef.current) {
      console.log(avatarInputRef.current);
      avatarInputRef.current.value = '';
      avatarInputRef.current.files = null;
    }
  };

  const fetchAddress = async () => {
    const result = await coordsByAddress(address);
    setCoords(result);
  };

  const createHandler = () => {
    createShelter({
      name,
      description,
      contactEmail,
      contactPhone,
      contactUrl,
      coords,
    })
      .then((res) => {
        if ('data' in res) {
          const formData = new FormData();
          const files = [avatar, ...otherPhotos];
          for (let i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i], files[i].name);
          }
          addPhotos({ id: res.data.id, formData }).then((photoRes) => {
            if ('data' in photoRes) {
              alert('Shelter successfully created');
            } else {
              alert('Error while uploading photos');
            }
          });
        } else {
          alert('Cannot create shelter');
        }
      })
      .catch((error) => alert('Cannot create shelter'));
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
              ref={avatarInputRef}
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
            <Input className={s['shelter-form__input']} value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={s['shelter-form__prop']}>
            <label className={s['shelter-form__prop-name']}>Description</label>
            <Textarea
              rows={4}
              className={s['shelter-form__input']}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2>Add more photos</h2>
          <div className={s['shelter-form__more-photos']}>
            <label htmlFor={otherPhotosInputId} className={s['shelter-form__more-photos-input']}>
              <FontAwesomeIcon icon={plusIcon} size="4x" />
            </label>
            {otherPhotosUrls.map((url, index) => (
              <div key={url + index} className={s['shelter-form__more-photo']}>
                <img src={url} />
                <div className={s['shelter-form__more-photo-remove']}>
                  <Button as="a" onClick={(e) => removeOtherPhotoHandler(index)} round>
                    <FontAwesomeIcon icon={crossIcon} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ visibility: 'hidden', display: 'none', opacity: 0 }}>
            <Input
              ref={otherPhotosInputRef}
              multiple
              type="file"
              htmlId={otherPhotosInputId}
              onChange={otherPhotosChangeHandler}
            />
          </div>
        </div>

        <div>
          <h2>Contact</h2>
          <div className={s['shelter-form__contact-info']}>
            <div className={s['shelter-form__contact']}>
              <label>Email</label>
              <Input
                className={s['shelter-form__input']}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              >
                <FontAwesomeIcon icon={emailIcon} />
              </Input>
            </div>
            <div className={s['shelter-form__contact']}>
              <label>Phone</label>
              <Input
                className={s['shelter-form__input']}
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              >
                <FontAwesomeIcon icon={phoneIcon} />
              </Input>
            </div>
            <div className={s['shelter-form__contact']}>
              <label>Site</label>
              <Input
                className={s['shelter-form__input']}
                value={contactUrl}
                onChange={(e) => setContactUrl(e.target.value)}
              >
                <FontAwesomeIcon icon={internetIcon} />
              </Input>
            </div>
            <div className={s['shelter-form__map']}>
              <label>Address</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} className={s['shelter-form__input']}>
                <FontAwesomeIcon icon={locationIcon} />
              </Input>
              <div className={s['shelter-form__map-wrapper']}>
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
      </div>
      <div className={s['shelter-form__buttons']}>
        <Button as="button" size="medium" onClick={createHandler}>
          Create
        </Button>
      </div>
    </div>
  );
};

ShelterForm.displayName = 'ShelterForm';

export default ShelterForm;
