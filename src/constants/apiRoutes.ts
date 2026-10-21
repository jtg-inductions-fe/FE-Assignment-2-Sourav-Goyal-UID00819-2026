export const API_ROUTES = {
    USER: '/user',
    USERS: '/users',
    SEARCH_USERS: '/search/users',

    userByUsername: (username: string) =>
        `/users/${encodeURIComponent(username)}`,

    userFollowers: (username: string) =>
        `/users/${encodeURIComponent(username)}/followers`,

    userFollowing: (username: string) =>
        `/users/${encodeURIComponent(username)}/following`,

    followUser: (username: string) =>
        `/user/following/${encodeURIComponent(username)}`,

    checkFollowing: (loggedInUser: string, username: string) =>
        `/users/${encodeURIComponent(loggedInUser)}/following/${encodeURIComponent(username)}`,
} as const;
