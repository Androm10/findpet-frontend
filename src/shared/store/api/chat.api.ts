import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatEntity } from 'core/entities/chat.entity';
import { chatActions } from '../slices/chat.slice';
import customBaseQuery from './base-query';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Chat'],
  endpoints: (builder) => ({
    getChats: builder.query<ChatEntity[], undefined>({
      query: () => `chat/userChats`,
      providesTags: ['Chat'],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(chatActions.setChats(data));
        } catch (error) {}
      },
    }),
    getChat: builder.query<ChatEntity, number>({
      query: (id) => `chat/${id}`,
      providesTags: ['Chat'],
    }),
  }),
});

export const { useGetChatsQuery, useGetChatQuery } = chatApi;
