import { classNames } from '@shared/utils/class-names';
import { Message } from 'core/types/chatbot-message.type';
import { FC } from 'react';
import s from './chatbot-message.module.scss';

interface ChatbotMessageProps {
  message: Message;
}

const ChatbotMessage: FC<ChatbotMessageProps> = (props: ChatbotMessageProps) => {
  const { message } = props;

  return (
    <div
      className={classNames({
        [s['chatbot-message']]: true,
        [s['chatbot-message_bot']]: message.isBot,
      })}
    >
      <div className={s['chatbot-message__container']}>
        <label className={s['chatbot-message__text']}>{message.text}</label>
        {/* <small className={s['chatbot-message__date']}>{message.date?.toTimeString()}</small> */}
      </div>
    </div>
  );
};

ChatbotMessage.displayName = 'ChatbotMessage';

export default ChatbotMessage;
