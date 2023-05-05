import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './menu.module.scss';
import { classNames } from '@shared/utils/class-names';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MenuProps {
  value?: any;
  onChange: (value: any) => void;
  items: MenuItem[];
}

interface MenuItem {
  value: any;
  name: string;
  icon?: IconDefinition;
}

const Menu: FC<MenuProps> = (props: MenuProps) => {
  const { value: pickedValue, onChange, items } = props;

  return (
    <div>
      {items.map(({ value, name, icon }) => (
        <div
          key={name + value}
          onClick={() => onChange(value)}
          className={[
            s['menu-item'],
            classNames({
              [s['menu-item_picked']]: pickedValue === value,
            }),
          ].join(' ')}
        >
          {!!icon && (
            <div>
              <FontAwesomeIcon icon={icon} />
            </div>
          )}

          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

Menu.displayName = 'Menu';

export default Menu;
