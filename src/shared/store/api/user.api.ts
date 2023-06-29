import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { UserEntity } from 'core/entities/user.entity';
import { Photo } from 'core/types/photo.type';
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
          dispatch(userActions.setAuth(true));
        } catch (error) {}
      },
      providesTags: ['User'],
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
    updateAvatar: builder.mutation<Photo, UpdateAvatar>({
      query: ({ formData }) => ({
        url: `user/profile/avatar`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UserEntity, UpdateUser>({
      query: ({ ...data }) => ({
        url: `user/profile`,
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
  useLazyGetMeQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
} = userApi;

type CreateUser = {
  username: string;
  login: string;
  password: string;
};

type UpdateAvatar = {
  formData: FormData;
};

type UpdateUser = {
  username?: string;
  login?: string;
};
