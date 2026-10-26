import * as S from './UserGridSkeleton.styles';
import type { UserGridSkeletonProps } from './UserGridSkeleton.types';
import { UserCardSkeleton } from '../UserCardSkeleton';

export const UserGridSkeleton = ({ count = 6 }: UserGridSkeletonProps) => (
    <S.GridSkeletonContainer>
        {Array.from({ length: count }).map((_, i) => (
            <UserCardSkeleton key={i} />
        ))}
    </S.GridSkeletonContainer>
);
