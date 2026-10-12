import api from '@/lib/api';
import type { SearchResponse } from '@/types/search';
import type { UserConnection, UserDetail } from '@/types/user';

const githubService = api.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query<
            SearchResponse,
            { searchQuery: string; page: number; perPage: number }
        >({
            query: ({ searchQuery, page, perPage }) =>
                `/search/users?q=${searchQuery}&page=${page}&per_page=${perPage}`,
        }),
        getUser: builder.query<UserDetail, string>({
            query: (username) => `/users/${username}`,
        }),
        getUserFollowers: builder.query<
            UserConnection[],
            { username: string; page: number; perPage: number }
        >({
            query: ({ username, page, perPage }) =>
                `/users/${username}/followers?page=${page}&per_page=${perPage}`,
        }),
        getUserFollowing: builder.query<
            UserConnection[],
            { username: string; page: number; perPage: number }
        >({
            query: ({ username, page, perPage }) =>
                `/users/${username}/following?page=${page}&per_page=${perPage}`,
        }),
    }),
});

export const {
    useGetUserQuery,
    useSearchUsersQuery,
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
} = githubService;
