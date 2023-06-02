import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cameraIcon, crossIcon } from '@shared/font-awesome-icons';
import { readImageUrl } from '@shared/utils/read-file';
import Button from '@ui/button';
import Input from '@ui/input';
import { FC, useId, useRef, useState } from 'react';
import s from './avatar-input.module.scss';

interface AvatarInputProps {
  value: any;
  setValue: (v: any) => void;
}

const AvatarInput: FC<AvatarInputProps> = (props: AvatarInputProps) => {
  const { value, setValue } = props;

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const photoInputId = useId();
  const [avatarUrl, setAvatarUrl] = useState('');

  const avatarClearHandler = () => {
    setValue(undefined);
    setAvatarUrl('');
    if (avatarInputRef.current) {
      console.log(avatarInputRef.current);
      avatarInputRef.current.value = '';
      avatarInputRef.current.files = null;
    }
  };

  const avatarChangeHandler = (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      console.log(file);

      setValue(file);
      readImageUrl(file).then((res) => setAvatarUrl(res));
    }
  };

  return (
    <div className={s['avatar-input']}>
      <label htmlFor={photoInputId} className={s['avatar-input__photo']}>
        {avatarUrl ? <img src={avatarUrl} /> : <FontAwesomeIcon icon={cameraIcon} size="10x" />}
      </label>
      <div className={s['avatar-input__input']}>
        <Input
          ref={avatarInputRef}
          onChange={avatarChangeHandler}
          fullWidth
          type="file"
          accept="image/png, image/gif, image/jpeg"
          htmlId={photoInputId}
        />
        {value && (
          <Button onClick={avatarClearHandler} as="a" round size="medium">
            <FontAwesomeIcon icon={crossIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

AvatarInput.displayName = 'AvatarInput';

export default AvatarInput;
