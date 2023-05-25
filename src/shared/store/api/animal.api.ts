import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { AnimalEntity } from 'core/entities/animal.entity';
import { Paginated } from 'core/types/paginated.type';
import customBaseQuery from './base-query';

export const animalApi = createApi({
  reducerPath: 'animalApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Animal'],
  endpoints: (builder) => ({
    getAnimal: builder.query<AnimalEntity, number>({
      query: (id) => `animal/${id}`,
      providesTags: ['Animal'],
    }),
    getAnimals: builder.query<Paginated<AnimalEntity>, undefined>({
      query: () => `animal/`,
      providesTags: ['Animal'],
    }),
    createAnimal: builder.mutation<AnimalEntity, CreateAnimal>({
      query: (data) => ({
        url: `animal/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Animal'],
    }),
    updateAnimal: builder.mutation<AnimalEntity, UpdateAnimal>({
      query: ({ id, ...data }) => ({
        url: `animal/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Animal'],
    }),
    deleteAnimal: builder.mutation<AnimalEntity, number>({
      query: (id) => ({
        url: `animal/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Animal'],
    }),
  }),
});

export const {
  useGetAnimalsQuery,
  useGetAnimalQuery,
  useDeleteAnimalMutation,
  useCreateAnimalMutation,
  useUpdateAnimalMutation,
} = animalApi;

type CreateAnimal = {
  name: string;
  type: string;
  age: number;
  sex: string;
};

type UpdateAnimal = {
  id: string;
  name?: string;
  type?: string;
  age?: number;
  sex?: string;
};
