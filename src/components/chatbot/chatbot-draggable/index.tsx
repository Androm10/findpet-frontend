import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { crossIcon, userIcon } from '@shared/font-awesome-icons';
import { useDraggable } from '@shared/hooks/use-draggable.hook';
import { classNames } from '@shared/utils/class-names';
import Button from '@ui/button';
import FloatingMenu from '@ui/floating-menu';
import { FC, useRef, useState } from 'react';
import ChatbotWindow from '../chatbot-window';
import s from './chatbot-draggable.module.scss';

const ChatbotDraggable: FC = () => {
  const [isBotHidden, setBotHidden] = useState(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  useDraggable(chatbotRef, headerRef);

  return (
    <FloatingMenu
      ref={chatbotRef}
      element={
        <div className={s['chatbot-draggable__wrapper']}>
          <div className={s['chatbot-draggable__header']} ref={headerRef}>
            <div className={s['chatbot-draggable__draggable']}></div>
            <Button as="button" round onClick={() => setBotHidden(true)}>
              <FontAwesomeIcon icon={crossIcon} />
            </Button>
          </div>
          <ChatbotWindow />
        </div>
      }
      closable
      isHidden={isBotHidden}
      setHidden={setBotHidden}
    >
      <FontAwesomeIcon
        icon={userIcon}
        onClick={() => setBotHidden(!isBotHidden)}
        className={classNames({
          [s['chatbot-draggable__icon']]: true,
          [s['chatbot-draggable__icon_active']]: !isBotHidden,
        })}
      />
    </FloatingMenu>
  );
};

ChatbotDraggable.displayName = 'ChatbotDraggable';

export default ChatbotDraggable;
