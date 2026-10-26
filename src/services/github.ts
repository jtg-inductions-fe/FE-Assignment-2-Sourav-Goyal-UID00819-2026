import { API_ROUTES } from '@/constants/apiRoutes';
import api from '@/services/api';
import type { SearchResponse } from '@/types/search';
import type { UserConnection, UserDetail } from '@/types/user';

const githubService = api.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query<
            SearchResponse,
            { searchQuery: string; page: number; perPage: number }
        >({
            query: ({ searchQuery, page, perPage }) => ({
                url: API_ROUTES.SEARCH_USERS,
                params: { q: searchQuery, page, per_page: perPage },
            }),
        }),
        getUser: builder.query<UserDetail, string>({
            query: (username) => API_ROUTES.userByUsername(username),
        }),
        getUserFollowers: builder.query<
            UserConnection[],
            { username: string; page: number; perPage: number }
        >({
            query: ({ username, page, perPage }) => ({
                url: API_ROUTES.userFollowers(username),
                params: {
                    page,
                    per_page: perPage,
                },
            }),
        }),
        getUserFollowing: builder.query<
            UserConnection[],
            { username: string; page: number; perPage: number }
        >({
            query: ({ username, page, perPage }) => ({
                url: API_ROUTES.userFollowing(username),
                params: {
                    page,
                    per_page: perPage,
                },
            }),
        }),
        getAuthenticatedUser: builder.query<UserDetail, void>({
            query: () => API_ROUTES.USER,
        }),
        getSuggestedUsers: builder.query<
            UserDetail[],
            { perPage?: number; since?: number }
        >({
            query: ({ perPage = 100, since }) => ({
                url: API_ROUTES.USERS,
                params: {
                    per_page: perPage,
                    ...(since !== undefined ? { since } : {}),
                },
            }),
        }),
        followUser: builder.mutation<undefined, { username: string }>({
            query: ({ username }) => ({
                url: API_ROUTES.followUser(username),
                method: 'PUT',
                body: undefined,
            }),
            invalidatesTags: ['Following'],
        }),
        isFollowingList: builder.query<
            Record<string, boolean>,
            { loggedInUser: string; usernames: string[] }
        >({
            async queryFn(
                { loggedInUser, usernames },
                _api,
                _extraOptions,
                baseQuery,
            ) {
                try {
                    const promises = usernames.map(async (username) => {
                        const result = await baseQuery(
                            API_ROUTES.checkFollowing(loggedInUser, username),
                        );

                        const isFollowing = !result.error;

                        return { username, isFollowing };
                    });

                    const resolvedResults = await Promise.all(promises);

                    const followMap = resolvedResults.reduce(
                        (followObj, curr) => {
                            followObj[curr.username] = curr.isFollowing;
                            return followObj;
                        },
                        {} as Record<string, boolean>,
                    );

                    return { data: followMap };
                } catch {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Unknown',
                        },
                    };
                }
            },
            providesTags: ['Following'],
        }),
        checkUserFollowing: builder.query<
            boolean,
            { loggedInUser: string; username: string }
        >({
            async queryFn(
                { loggedInUser, username },
                baseApi,
                _extraOptions,
                baseQuery,
            ) {
                try {
                    const result = await baseQuery({
                        url: API_ROUTES.checkFollowing(loggedInUser, username),
                        signal: baseApi.signal,
                    });

                    if (baseApi.signal.aborted) {
                        return {
                            error: {
                                status: 'CUSTOM_ERROR',
                                error: 'Aborted',
                            },
                        };
                    }

                    const isFollowing = !result.error;
                    return { data: isFollowing };
                } catch {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Unknown',
                        },
                    };
                }
            },
            providesTags: ['Following'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useSearchUsersQuery,
    useGetUserFollowersQuery,
    useGetUserFollowingQuery,
    useFollowUserMutation,
    useIsFollowingListQuery,
    useLazyIsFollowingListQuery,
    useGetAuthenticatedUserQuery,
    useLazyGetAuthenticatedUserQuery,
    useGetSuggestedUsersQuery,
    useLazyGetSuggestedUsersQuery,
    useCheckUserFollowingQuery,
    useLazyCheckUserFollowingQuery,
} = githubService;
