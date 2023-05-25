import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { ShelterEntity } from 'core/entities/shelter.entity';
import { Paginated } from 'core/types/paginated.type';
import customBaseQuery from './base-query';

export const shelterApi = createApi({
  reducerPath: 'shelterApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Shelter'],
  endpoints: (builder) => ({
    getShelter: builder.query<ShelterEntity, number>({
      query: (id) => `shelter/${id}`,
      providesTags: ['Shelter'],
    }),
    getShelters: builder.query<Paginated<ShelterEntity>, undefined>({
      query: () => `shelter/`,
      providesTags: ['Shelter'],
    }),
    createShelter: builder.mutation<ShelterEntity, CreateShelter>({
      query: (data) => ({
        url: `shelter/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Shelter'],
    }),
    updateShelter: builder.mutation<ShelterEntity, UpdateShelter>({
      query: ({ id, ...data }) => ({
        url: `shelter/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Shelter'],
    }),
    deleteShelter: builder.mutation<ShelterEntity, number>({
      query: (id) => ({
        url: `shelter/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shelter'],
    }),
  }),
});

export const {
  useGetSheltersQuery,
  useGetShelterQuery,
  useDeleteShelterMutation,
  useCreateShelterMutation,
  useUpdateShelterMutation,
} = shelterApi;

type CreateShelter = {
  name: string;
  coords: {
    logitude: number;
    latitude: number;
  };
  description?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactUrl?: string;
  city?: string;
};

type UpdateShelter = {
  id: number;
} & Partial<CreateShelter>;
