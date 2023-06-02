import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { crossIcon, plusIcon } from '@shared/font-awesome-icons';
import { readImageUrl } from '@shared/utils/read-file';
import Button from '@ui/button';
import Input from '@ui/input';
import { FC, useId, useRef, useState } from 'react';
import s from './more-photos-input.module.scss';

interface MorePhotosInputProps {
  value: any[];
  setValue: (v: any) => void;
}

const MorePhotosInput: FC<MorePhotosInputProps> = (props: MorePhotosInputProps) => {
  const { value, setValue } = props;

  const otherPhotosInputId = useId();
  const [otherPhotosUrls, setOtherPhotosUrls] = useState<string[]>([]);

  const otherPhotosInputRef = useRef<HTMLInputElement>(null);

  const otherPhotosChangeHandler = async (event: any) => {
    event.preventDefault();

    if (event.target.files && event.target.files.length) {
      const files = event.target.files;

      for (let i = 0; i < files.length; i++) {
        let file = files.item(i);
        setValue((prev: any[]) => [...prev, file]);

        readImageUrl(file).then((res) => setOtherPhotosUrls((prev) => [...prev, res as string]));
      }
      if (otherPhotosInputRef.current) {
        otherPhotosInputRef.current.value = '';
        otherPhotosInputRef.current.files = null;
      }
    }
  };

  const removeOtherPhotoHandler = (index: number) => {
    setValue((prev: any[]) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    setOtherPhotosUrls((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  return (
    <>
      <div className={s['more-photos-input']}>
        <label htmlFor={otherPhotosInputId} className={s['more-photos-input__button']}>
          <FontAwesomeIcon icon={plusIcon} size="4x" />
        </label>
        {otherPhotosUrls.map((url, index) => (
          <div key={url + index} className={s['more-photos-input__photo']}>
            <img src={url} />
            <div className={s['more-photos-input__remove']}>
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
    </>
  );
};

MorePhotosInput.displayName = 'MorePhotosInput';

export default MorePhotosInput;
