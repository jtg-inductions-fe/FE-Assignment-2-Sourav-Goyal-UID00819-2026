import type { UserConnection } from '@/types/user';

export type UserConnectionListProps = {
    title: string;
    list?: UserConnection[];
    isLoading?: boolean;
};
