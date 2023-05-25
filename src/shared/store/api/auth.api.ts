import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JwtService } from '@shared/services/jwt.service';
import { UserEntity } from 'core/entities/user.entity';
import customBaseQuery from './base-query';
import { userApi } from './user.api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation<UserEntity, RegisterInput>({
      query(data) {
        return {
          url: `auth/signup`,
          method: 'POST',
          body: data,
        };
      },
    }),

    login: builder.mutation<LoginData, LoginInput>({
      query(data) {
        return {
          url: `auth/login`,
          method: 'POST',
          body: data,
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          JwtService.setAccessToken(data.accessToken);
          JwtService.setRefreshToken(data.refreshToken);
          await dispatch(userApi.endpoints.getMe.initiate(undefined));
        } catch (error) {}
      },
    }),
  }),
});

type RegisterInput = {
  login: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type LoginInput = {
  login: string;
  password: string;
};

type LoginData = {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
};

export const { useLoginMutation, useSignupMutation } = authApi;
