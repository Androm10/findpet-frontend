import { useAppSelector } from '@shared/hooks/app-selector.hook';
import { classNames } from '@shared/utils/class-names';
import { MessageEntity } from 'core/entities/message.entity';
import { FC } from 'react';
import s from './chatbot-message.module.scss';

interface ChatMessageProps {
  message: MessageEntity;
}

const ChatMessage: FC<ChatMessageProps> = (props: ChatMessageProps) => {
  const { message } = props;
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <div
      className={classNames({
        [s['chat-message']]: true,
        [s['chat-message_other-user']]: message.userId !== user.id,
      })}
    >
      <div className={s['chat-message__container']}>
        <label className={s['chat-message__text']}>{message.text}</label>
        {/* <small className={s['chatbot-message__date']}>{message.date?.toTimeString()}</small> */}
      </div>
    </div>
  );
};

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
