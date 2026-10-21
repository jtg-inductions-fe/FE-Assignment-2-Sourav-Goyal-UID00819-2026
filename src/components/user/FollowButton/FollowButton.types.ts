export type FollowButtonProps = {
    username: string;
    isFollowing: boolean;
    isFollowingLoading: boolean;
    onFollow: (username: string) => Promise<void>;
};
