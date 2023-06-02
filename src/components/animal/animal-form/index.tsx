import { FC, useEffect, useId, useRef, useState } from 'react';
import s from './animal-form.module.scss';
import { cameraIcon, crossIcon, plusIcon } from '@shared/font-awesome-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimalEntity, AnimalTypes } from 'core/entities/animal.entity';
import { routes } from '@shared/constants/routes';
import Input from '@ui/input';
import Button from '@ui/button';
import AnimalTypeInput from 'components/inputs/animal-type-input';
import AnimalSexInput from 'components/inputs/animal-sex-input';
import { readImageUrl } from '@shared/utils/read-file';
import { useAddAnimalPhotosMutation, useCreateAnimalMutation } from '@shared/store/api/animal.api';
import { useAppSelector } from '@shared/hooks/app-selector.hook';
import Spinner from '@ui/spinner';
import { toast, ToastContainer } from 'react-toastify';
import AvatarInput from 'components/inputs/avatar-input';
import MorePhotosInput from 'components/inputs/more-photos-input';

const AnimalForm: FC = () => {
  const [createAnimal, { data, isLoading, isSuccess, isError }] = useCreateAnimalMutation();
  const [
    addPhotos,
    { data: dataPhotos, isLoading: isLoadingPhotos, isSuccess: isSuccessPhotos, isError: isErrorPhotos },
  ] = useAddAnimalPhotosMutation();

  const { user } = useAppSelector((state) => state.userReducer);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState<number>(0);
  const [avatar, setAvatar] = useState();
  const [type, setType] = useState<keyof typeof AnimalTypes | null>('cat');
  const [sex, setSex] = useState<'M' | 'G' | null>('M');
  const [orphanageDate, setOrphanageDate] = useState('');
  const [otherPhotos, setOtherPhotos] = useState<any[]>([]);

  //TODO: create proper notifications

  const createHandler = () => {
    if (!sex || !type) return;

    createAnimal({
      name,
      description,
      sex,
      type,
      age,
      orphanageDate: new Date(orphanageDate),
      shelterId: user.shelterId || undefined,
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
              // alert('Animal successfully created');
              toast.info('Animal successfully created');
            } else {
              // alert('Error while uploading photos');
              toast.error('Error while uploading photos');
            }
          });
        } else {
          // alert('Cannot create animal');
          toast.error('Cannot create animal');
        }
      })
      .catch((error) => toast.error('Cannot create animal'));
  };

  return (
    <div className={s['animal-form']}>
      <ToastContainer />
      <div className={s['animal-form__info']}>
        <AvatarInput value={avatar} setValue={setAvatar} />
        <div className={s['animal-form__props']}>
          <div className={s['animal-form__prop']}>
            <label className={s['animal-form__prop-name']}>Name</label>
            <label>
              <Input className={s['animal-form__input']} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div className={s['animal-form__prop']}>
            <label className={s['animal-form__prop-name']}>Orphanage date</label>
            <label>
              <Input
                type="date"
                className={s['animal-form__input']}
                value={orphanageDate}
                onChange={(e) => setOrphanageDate(e.target.value)}
              />
            </label>
          </div>

          <div className={s['animal-form__prop']}>
            <label className={s['animal-form__prop-name']}>Description</label>
            <Input
              className={s['animal-form__input']}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={s['animal-form__selections']}>
            <div className={s['animal-form__prop']}>
              <label className={s['animal-form__prop-name']}>Type</label>
              <AnimalTypeInput value={type} setValue={setType} />
            </div>
            <div className={s['animal-form__prop']}>
              <label className={s['animal-form__prop-name']}>Sex</label>
              <AnimalSexInput value={sex} setValue={setSex} />
            </div>
          </div>
        </div>
      </div>
      <div className={s['animal-form__prop']}>
        <label className={s['animal-form__prop-name']}>Age (in months)</label>
        <Input
          type="number"
          className={s['animal-form__input']}
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>
      <div>
        <h2>Add more photos</h2>
        <MorePhotosInput value={otherPhotos} setValue={setOtherPhotos} />
      </div>

      <div className={s['animal-form__buttons']}>
        <Button disabled={isLoading || isLoadingPhotos} as="button" size="medium" onClick={createHandler}>
          {isLoading || isLoadingPhotos ? <Spinner size="small" /> : <label>Create</label>}
        </Button>
      </div>
    </div>
  );
};

AnimalForm.displayName = 'AnimalForm';

export default AnimalForm;
