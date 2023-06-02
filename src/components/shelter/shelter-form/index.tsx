import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { FC, useEffect, useState } from 'react';
import s from './shelter.module.scss';
import { emailIcon, internetIcon, locationIcon, phoneIcon } from '@shared/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '@ui/input';
import Button from '@ui/button';
import { YANDEX_API_KEY } from '@shared/constants/api';
import { coordsByAddress } from '@shared/utils/coords-by-address';
import { useDebounce } from '@shared/hooks/use-debounce.hook';
import { Coords } from 'core/types/coords.type';
import Textarea from '@ui/textarea';
import { useAddShelterPhotosMutation, useCreateShelterMutation } from '@shared/store/api/shelter.api';
import { toast, ToastContainer } from 'react-toastify';
import AvatarInput from 'components/inputs/avatar-input';
import MorePhotosInput from 'components/inputs/more-photos-input';

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
  const [address, setAddress] = useState('');
  const [otherPhotos, setOtherPhotos] = useState<any[]>([]);
  const [coords, setCoords] = useState<Coords>({ longitude: 10, latitude: 10 });

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
              toast.info('Shelter successfully created');
              // alert('Shelter successfully created');
            } else {
              toast.error('Error while uploading photos');
              // alert('Error while uploading photos');
            }
          });
        } else {
          toast.error('Cannot create shelter');
          // alert('Cannot create shelter');
        }
      })
      .catch((error) => toast.error('Cannot create shelter'));
  };

  const debouncedFetchAddress = useDebounce(fetchAddress, 1000);

  useEffect(() => {
    if (!address) return;
    debouncedFetchAddress();
  }, [address]);

  return (
    <>
      <ToastContainer />
      <div className={s['shelter-form']}>
        <div className={s['shelter-form__info']}>
          <AvatarInput value={avatar} setValue={setAvatar} />
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
            <MorePhotosInput value={otherPhotos} setValue={setOtherPhotos} />
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
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={s['shelter-form__input']}
                >
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
    </>
  );
};

ShelterForm.displayName = 'ShelterForm';

export default ShelterForm;
