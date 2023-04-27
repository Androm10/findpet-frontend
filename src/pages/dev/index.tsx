import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { whiteMoonIcon } from '@shared/font-awesome-icons';
import Avatar from '@ui/avatar';
import Button from '@ui/button';
import Input from '@ui/input';
import Toggle from '@ui/toggle';
import { FC } from 'react';

const DevPage: FC = () => {
  return (
    <div>
      <h1>Dev page</h1>
      <div>
        <Button as="button"> Click me</Button>
      </div>
      <div>
        <Button as="button" size="medium">
          Click me
        </Button>
      </div>
      <Button as="a" size="medium" round>
        <FontAwesomeIcon icon={whiteMoonIcon} />
      </Button>
      <Input placeholder="Write something..." />
      <Toggle text="fdsfsfdf" />
      <Avatar label="H" />
    </div>
  );
};
DevPage.displayName = 'DevPage';

export default DevPage;
