import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Box, Pagination, useMediaQuery, useTheme } from '@mui/material';

import { NotFound } from '@/components/common/NotFound';
import { SearchInput } from '@/components/search';
import { UserDetailModal } from '@/components/user';
import { UserGrid } from '@/components/user';
import { UserGridSkeleton } from '@/components/user';
import {
    useFollowUserMutation,
    useIsFollowingListQuery,
    useSearchUsersQuery,
} from '@/services/github';
import { useAppSelector } from '@/store/store';

import * as S from './SearchUsers.styles';

const USERS_PER_PAGE = 10;
const GITHUB_API_MAX_RESULTS = 1000;

export const SearchUsers = () => {
    const theme = useTheme();
    const { user } = useAppSelector((state) => state.user);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const [followUser] = useFollowUserMutation();

    const maxPages = Math.floor(GITHUB_API_MAX_RESULTS / USERS_PER_PAGE);
    const { data, isFetching, isError } = useSearchUsersQuery(
        {
            searchQuery: query,
            page,
            perPage: USERS_PER_PAGE,
        },
        { skip: !query },
    );

    const usernames = useMemo(
        () => data?.items.map((searched_user) => searched_user.login) || [],
        [data?.items],
    );

    const { data: followMap, isLoading: isFollowLoading } =
        useIsFollowingListQuery(
            { loggedInUser: user?.login ?? '', usernames },
            { skip: !user || usernames.length === 0 },
        );

    const handleFollow = async (targetUsername: string) => {
        await followUser({ username: targetUsername }).unwrap();
    };

    useEffect(() => {
        const searchQuery = searchParams.get('query');
        if (!searchQuery) return;

        let pageNumber = Number(searchParams.get('page')) || 1;

        pageNumber = pageNumber < 1 ? 1 : pageNumber;
        pageNumber = pageNumber > maxPages ? maxPages : pageNumber;

        setQuery(searchQuery);
        setPage(pageNumber);

        setSearchParams({ query: searchQuery, page: pageNumber.toString() });
    }, [searchParams, maxPages, setSearchParams]);

    const handleSearch = (textQuery: string) => {
        setPage(1);
        setSearchParams({ query: textQuery, page: '1' });
    };

    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setSearchParams({ query, page: String(value) });
    };

    let totalPages = data ? Math.ceil(data.total_count / USERS_PER_PAGE) : 1;

    totalPages = Math.min(totalPages, maxPages);

    useEffect(() => {
        if (!data || !query) return;

        // :-: To handle a case where url query page number is greater than the max search result page number :-:
        if (page > totalPages) {
            setSearchParams({
                query,
                page: String(totalPages),
            });
        }
    }, [data, page, query, totalPages]);

    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleUserClick = (username: string) => {
        setSelectedUser(username);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <Box>
            <S.SearchInputWrapper>
                <SearchInput handleSearch={handleSearch} query={query} />
            </S.SearchInputWrapper>

            {isError && (
                <S.ErrorMessage>
                    Error fetching users. Please try again.
                </S.ErrorMessage>
            )}

            {isFetching && (
                <S.ResultsContainer>
                    <UserGridSkeleton count={USERS_PER_PAGE} />
                </S.ResultsContainer>
            )}

            {data && !isFetching && (
                <S.ResultsContainer>
                    {data.items.length > 0 ? (
                        <>
                            <UserGrid
                                users={data.items}
                                onUserClick={handleUserClick}
                                followMap={followMap}
                                isFollowLoading={isFollowLoading}
                                loggedInUser={user?.login}
                                onFollow={handleFollow}
                            />

                            {totalPages > 1 && (
                                <S.PaginationWrapper>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        color="primary"
                                        size={
                                            isSmallScreen ? 'medium' : 'large'
                                        }
                                    />
                                </S.PaginationWrapper>
                            )}
                        </>
                    ) : (
                        <NotFound
                            title="No Results Found"
                            message={`We couldn't find any GitHub users matching "${query}".`}
                        />
                    )}
                </S.ResultsContainer>
            )}

            <UserDetailModal
                open={!!selectedUser}
                onClose={handleCloseModal}
                username={selectedUser}
            />
        </Box>
    );
};
