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
        getAuthenticatedUser: builder.query<UserDetail, void>({
            query: () => '/user',
        }),
        getSuggestedUsers: builder.query<
            UserDetail[],
            { perPage?: number; since?: number }
        >({
            query: ({ perPage = 100, since }) =>
                `/users?per_page=${perPage}&since=${since}`,
        }),
        followUser: builder.mutation<undefined, { username: string }>({
            query: ({ username }) => ({
                url: `/user/following/${username}`,
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
                            `/users/${loggedInUser}/following/${username}`,
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
                        url: `/users/${loggedInUser}/following/${username}`,
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
