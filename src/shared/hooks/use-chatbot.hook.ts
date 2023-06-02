import { SocketEmitter } from '@shared/services/socket.emitter';
import { ChatbotMessage } from 'core/types/chatbot-message.type';
import { useEffect, useState } from 'react';

export const useChatbot = (url: string) => {
  const [emitter, setEmitter] = useState<SocketEmitter>();
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [isConnected, setConnected] = useState<boolean>(false);

  const messageHandler = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        isBot: true,
        text: message,
      },
    ]);
  };

  const sendMessage = (message: string) => {
    if (emitter) {
      emitter.emit('message', message);
      setMessages((prev) => [
        ...prev,
        {
          isBot: false,
          text: message,
          date: new Date(),
        },
      ]);
    }
  };

  useEffect(() => {
    if (url) {
      setEmitter(new SocketEmitter(url));
    }
  }, [url]);

  useEffect(() => {
    if (!emitter || !emitter.isConnected() || !emitter.clientSocket) {
      setConnected(false);
      return;
    }
    console.log('truuueee');
    setConnected(true);
    emitter.subscribe('message', messageHandler);

    return () => {
      emitter.unsubscribe('message', messageHandler);
    };
  }, [emitter, messageHandler, emitter?.clientSocket]);

  return { messages, sendMessage, isConnected };
};
