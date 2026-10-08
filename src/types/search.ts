export type SearchUser = {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
    score: number;
};

export type SearchResponse = {
    total_count: number;
    incomplete_results: boolean;
    items: SearchUser[];
};
