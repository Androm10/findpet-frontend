import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { buildQuery } from '@shared/utils/build-query';
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
    getAnimals: builder.query<Paginated<AnimalEntity>, GetAnimals>({
      query: ({ limit, page, filter }) => `animal?limit=${limit || 20}&page=${page || 1}&${buildQuery(filter)}`,
      providesTags: ['Animal'],
    }),
    getAnimalsByShelterId: builder.query<Paginated<AnimalEntity>, GetAnimalsByShelterId>({
      query: ({ limit, page, shelterId }) =>
        `animal/getByShelterId/${shelterId}?limit=${limit || 20}&page=${page || 1}`,
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
    addAnimalPhotos: builder.mutation<AnimalEntity, UpdateAnimalPhotos>({
      query: ({ id, formData }) => ({
        url: `animal/${id}/photos`,
        method: 'PUT',
        body: formData,
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
  useLazyGetAnimalsQuery,
  useGetAnimalQuery,
  useGetAnimalsByShelterIdQuery,
  useLazyGetAnimalsByShelterIdQuery,
  useDeleteAnimalMutation,
  useCreateAnimalMutation,
  useUpdateAnimalMutation,
  useAddAnimalPhotosMutation,
} = animalApi;

type GetAnimals = {
  limit?: number;
  page?: number;
  filter?: {
    name?: string;
    sex?: string;
    type?: string;
  };
};

type GetAnimalsByShelterId = {
  limit?: number;
  page?: number;
  shelterId: number;
};

type CreateAnimal = {
  name: string;
  description?: string;
  shelterId?: string;
  orphanageDate?: Date;
  type: string;
  age: number;
  sex: string;
};

type UpdateAnimal = {
  id: string;
} & Partial<CreateAnimal>;

type UpdateAnimalPhotos = {
  id: number;
  formData: FormData;
};
