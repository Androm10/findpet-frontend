import { Message } from 'core/types/chatbot-message.type';
import { FC } from 'react';
import s from './chatbot-message-list.module.scss';
import ChatbotMessage from '../chatbot-message';

interface ChatbotMessageListProps {
  messages: Message[];
}

const ChatbotMessageList: FC<ChatbotMessageListProps> = (props: ChatbotMessageListProps) => {
  const { messages } = props;

  return (
    <div className={s['chatbot-message-list']}>
      {messages.map((m, index) => (
        <div key={m.text + index} className={s['chatbot-message-list__item']}>
          <ChatbotMessage message={m} />
        </div>
      ))}
    </div>
  );
};

export default ChatbotMessageList;

ChatbotMessageList.displayName = 'ChatbotMessageList';
