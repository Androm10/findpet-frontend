import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { UserEntity } from 'core/entities/user.entity';
import { userActions } from '../slices/user.slice';
import customBaseQuery from './base-query';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<UserEntity, void>({
      query: () => `user/profile`,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(userActions.setUser(data));
        } catch (error) {}
      },
    }),

    getUser: builder.query<UserEntity, number>({
      query: (id) => `user/${id}`,
      providesTags: ['User'],
    }),
    getUsers: builder.query<UserEntity[], undefined>({
      query: () => `user/`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<UserEntity, CreateUser>({
      query: (data) => ({
        url: `user/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UserEntity, UpdateUser>({
      query: ({ id, ...data }) => ({
        url: `user/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<UserEntity, number>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;

type CreateUser = {
  username: string;
  login: string;
  password: string;
};

type UpdateUser = {
  username?: string;
  login?: string;
  id: string;
};
