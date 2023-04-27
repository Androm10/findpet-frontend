import { FC } from 'react';
import s from './avatar.module.scss';

interface AvatarOwnProps {
  url?: string;
  label?: string;
}

type AvatarProps = AvatarOwnProps;

const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
  const { url, label } = props;

  return <div className={s.avatar}>{url ? <img src={url} /> : <div className={s['avatar-label']}>{label}</div>}</div>;
};

Avatar.displayName = 'Avatar';

export default Avatar;
