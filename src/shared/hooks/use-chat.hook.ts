import { SOCKET_URL } from '@shared/constants/api';
import { ClientEvents, ServerEvents } from '@shared/constants/socket-events';
import { JwtService } from '@shared/services/jwt.service';
import { SocketEmitter } from '@shared/services/socket.emitter';
import { useGetChatQuery } from '@shared/store/api/chat.api';
import { ChatEntity } from 'core/entities/chat.entity';
import { MessageEntity } from 'core/entities/message.entity';
import { useEffect, useState } from 'react';
import { useAppSelector } from './app-selector.hook';
import { useSocket } from './use-socket.hook';

export const useChat = (chatId: number) => {
  const [chat, setChat] = useState<ChatEntity>();
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [error, setError] = useState<any>();

  const emitter = useSocket();

  const { data, isFetching, isLoading, isSuccess, isError } = useGetChatQuery(chatId);
  const { user } = useAppSelector((state) => state.userReducer);

  const messageHandler = (message: MessageEntity) => {
    if (!chat) return;
    if (message.chatId == chat.id) {
      setMessages((prev) => [...prev, message]);
    }
  };

  const errorHandler = (error: any) => {
    setError(error);
  };

  const sendMessage = (text: string) => {
    if (!emitter) return;

    const message = {
      text,
      chatId,
      userId: user.id,
    };
    emitter.emit(ServerEvents.SEND_MESSAGE, message);
  };

  useEffect(() => {
    if (isSuccess && data) {
      setChat(data);
      setMessages(data.messages);
    }

    if (isError) {
      console.log('Cannot get chat ', chatId);
      setError(new Error('Cannot get chat'));
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (!emitter) return;

    emitter.subscribe(ClientEvents.NEW_MESSAGE, messageHandler).subscribe(ClientEvents.ERROR, errorHandler);

    return () => {
      emitter.unsubscribe(ClientEvents.NEW_MESSAGE, messageHandler).unsubscribe(ClientEvents.ERROR, errorHandler);
    };
  }, [emitter, messageHandler, emitter?.clientSocket]);

  return { chat, messages, error, sendMessage };
};
