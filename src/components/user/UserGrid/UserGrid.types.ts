import type { UserCardData } from '../UserCard';

export type UserGridProps = {
    users: UserCardData[];
    onUserClick?: (username: string) => void;
    followMap?: Record<string, boolean>;
    followLoadingMap?: Record<string, boolean>;
    isFollowLoading?: boolean;
    loggedInUser?: string;
    onFollow?: (username: string) => Promise<void>;
    showDismissButton?: boolean;
    onDismiss?: (id: number) => void;
    showRefreshButton?: boolean;
    onRefresh?: () => void;
    shouldColumnWise?: boolean;
};
