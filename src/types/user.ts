export type UserDetail = {
    avatar_url: string;
    login: string;
    location: string | null;
    followers: number;
    following: number;
    bio: string | null;
    html_url: string;
    blog: string | null;
    email: string | null;
};

export type UserConnection = {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
    site_admin: boolean;
};
