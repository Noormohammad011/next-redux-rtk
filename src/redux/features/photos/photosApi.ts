import { apiSlice } from '../api/apiSlice'

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: () => `/photos?_limit=10`,
    }),
    getPhoto: builder.query({
      query: (id) => `/photos/${id}`,
    }),
  }),
})

export const {
  useGetPhotosQuery,
  useGetPhotoQuery,
  util: { getRunningQueriesThunk },
} = photosApi

export const { getPhotos, getPhoto } = photosApi.endpoints
