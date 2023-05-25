import { FC, useId, useRef, useState } from 'react';
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

const AnimalForm: FC = () => {
  const avatarChangeHandler = (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      setAvatar(file);
      readImageUrl(file).then((res) => setAvatarUrl(res as string));
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
      avatarInputRef.current.value = '';
      avatarInputRef.current.files = null;
    }
  };

  const photoInputId = useId();
  const otherPhotosInputId = useId();
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState('');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [otherPhotos, setOtherPhotos] = useState<any[]>([]);
  const [otherPhotosUrls, setOtherPhotosUrls] = useState<string[]>([]);
  const otherPhotosInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<keyof typeof AnimalTypes>('cat');
  const [sex, setSex] = useState<'M' | 'G'>('M');

  return (
    <div className={s['animal-form']}>
      <div className={s['animal-form__info']}>
        <div className={s['animal-form__photos']}>
          <label htmlFor={photoInputId} className={s['animal-form__avatar']}>
            {avatarUrl ? <img src={avatarUrl} /> : <FontAwesomeIcon icon={cameraIcon} size="10x" />}
          </label>
          <div className={s['animal-form__other-photos']}>
            <Input
              onChange={avatarChangeHandler}
              fullWidth
              type="file"
              accept="image/png, image/gif, image/jpeg"
              htmlId={photoInputId}
              ref={avatarInputRef}
            />
            {avatar && (
              <Button onClick={avatarClearHandler} as="a" round size="medium">
                <FontAwesomeIcon icon={crossIcon} />
              </Button>
            )}
          </div>
        </div>
        <div className={s['animal-form__props']}>
          <div className={s['animal-form__prop']}>
            <label className={s['animal-form__prop-name']}>Name</label>
            <label>
              <Input className={s['animal-form__input']} />
            </label>
          </div>
          <div className={s['animal-form__prop']}>
            <label className={s['animal-form__prop-name']}>Orphanage date</label>
            <label>
              <Input type="date" className={s['animal-form__input']} />
            </label>
          </div>

          <div className={s['animal-form__prop']}>
            <label className={s['animal-form__prop-name']}>Description</label>
            <Input className={s['animal-form__input']} />
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
      <div>
        <h2>Add more photos</h2>
        <div className={s['animal-form__more-photos']}>
          <label htmlFor={otherPhotosInputId} className={s['animal-form__more-photos-input']}>
            <FontAwesomeIcon icon={plusIcon} size="4x" />
          </label>
          {otherPhotosUrls.map((url, index) => (
            <div key={url + index} className={s['animal-form__more-photo']}>
              <img src={url} />
              <div className={s['animal-form__more-photo-remove']}>
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

      <div className={s['animal-form__buttons']}>
        <Button as="button" size="medium">
          Create
        </Button>
      </div>
    </div>
  );
};

AnimalForm.displayName = 'AnimalForm';

export default AnimalForm;
