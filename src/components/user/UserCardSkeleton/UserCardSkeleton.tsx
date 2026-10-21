import * as S from './UserCardSkeleton.styles';

export const UserCardSkeleton = () => (
    <S.SkeletonContainer>
        <S.AvatarSkeleton variant="circular" width={64} height={64} />
        <S.CardBodySkeleton variant="rounded" />
    </S.SkeletonContainer>
);
