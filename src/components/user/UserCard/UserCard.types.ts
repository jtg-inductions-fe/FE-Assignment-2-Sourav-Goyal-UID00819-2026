export type UserCardData = {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
};

export type UserCardProps = {
    user: UserCardData;
    onClick?: (username: string) => void;
    isFollowing?: boolean;
    showFollowButton?: boolean;
    isFollowingLoading?: boolean;
    onFollow?: (username: string) => Promise<void>;
    showDismissButton?: boolean;
    onDismiss?: (id: number) => void;
};
