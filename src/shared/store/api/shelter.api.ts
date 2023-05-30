import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@shared/constants/api';
import { buildQuery } from '@shared/utils/build-query';
import { ShelterEntity } from 'core/entities/shelter.entity';
import { UserEntity } from 'core/entities/user.entity';
import { Paginated } from 'core/types/paginated.type';
import customBaseQuery from './base-query';

export const shelterApi = createApi({
  reducerPath: 'shelterApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Shelter', 'Workers'],
  endpoints: (builder) => ({
    getShelter: builder.query<ShelterEntity, number>({
      query: (id) => `shelter/${id}`,
      providesTags: ['Shelter'],
    }),
    getWorkers: builder.query<UserEntity[], number>({
      query: (id) => `shelter/${id}/workers`,
      providesTags: ['Workers'],
    }),
    getShelters: builder.query<Paginated<ShelterEntity>, undefined>({
      query: () => `shelter/`,
      providesTags: ['Shelter'],
    }),
    addShelterPhotos: builder.mutation<ShelterEntity, UpdateShelterPhotos>({
      query: ({ id, formData }) => ({
        url: `shelter/${id}/photos`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Shelter'],
    }),
    addWorker: builder.mutation<ShelterEntity, AddWorker>({
      query: ({ id, ...other }) => ({
        url: `shelter/${id}/addWorker`,
        method: 'PATCH',
        body: other,
      }),
      invalidatesTags: ['Workers'],
    }),
    getNearestShelters: builder.query<Paginated<ShelterEntity>, GetNearest>({
      query: ({ limit, page, ...other }) =>
        `shelter/getNearest?limit=${limit || 20}&page=${page || 1}&${buildQuery(other)}`,
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
  useGetNearestSheltersQuery,
  useDeleteShelterMutation,
  useCreateShelterMutation,
  useUpdateShelterMutation,
  useAddShelterPhotosMutation,
  useLazyGetShelterQuery,
  useAddWorkerMutation,
  useGetWorkersQuery,
  useLazyGetWorkersQuery,
} = shelterApi;

type GetNearest = {
  lat: number;
  lng: number;
  limit?: number;
  page?: number;
};

type AddWorker = {
  id: number;
  email: string;
};

type CreateShelter = {
  name: string;
  coords: {
    longitude: number;
    latitude: number;
  };
  description?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactUrl?: string;
};

type UpdateShelter = {
  id: number;
} & Partial<CreateShelter>;

type UpdateShelterPhotos = {
  id: number;
  formData: FormData;
};
