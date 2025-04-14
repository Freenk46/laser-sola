import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PageContent } from './types';

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/content/' }),
    endpoints: (builder) => ({
        getPageContent: builder.query<PageContent, string>({
            query: (page) => `${page}.json`,
        }),
    }),
});

export const { useGetPageContentQuery } = contentApi;
