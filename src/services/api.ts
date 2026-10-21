import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Following'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('pat_token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            headers.set('Accept', 'application/vnd.github+json');
            return headers;
        },
    }),
    endpoints: () => ({}),
});

export default api;
