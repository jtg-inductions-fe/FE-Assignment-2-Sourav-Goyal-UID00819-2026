import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
    Box,
    Pagination,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { NotFound } from '@/components/common/not-found';
import { UserDetailModal } from '@/components/user/user-detail-modal';
import { useSearchUsersQuery } from '@/services/github';

import { SearchInput } from './search-input';
import { SearchUserGrid } from './search-user-grid';
import { SearchUserGridSkeleton } from './search-user-grid-skeleton';

const USERS_PER_PAGE = 10;
const GITHUB_API_MAX_RESULTS = 1000;

export const SearchUsers = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const maxPages = Math.floor(GITHUB_API_MAX_RESULTS / USERS_PER_PAGE);
    const { data, isFetching, isError } = useSearchUsersQuery(
        {
            searchQuery: query,
            page,
            perPage: USERS_PER_PAGE,
        },
        { skip: !query },
    );

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
    }, [data, page, query, totalPages, setSearchParams]);

    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const handleUserClick = (username: string) => {
        setSelectedUser(username);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <SearchInput handleSearch={handleSearch} query={query} />
            </Box>

            {isError && (
                <Typography color="error" sx={{ mt: 2 }}>
                    Error fetching users. Please try again.
                </Typography>
            )}

            {isFetching && (
                <Box sx={{ mt: 4 }}>
                    <SearchUserGridSkeleton count={USERS_PER_PAGE} />
                </Box>
            )}

            {data && !isFetching && (
                <Box sx={{ mt: 4 }}>
                    {data.items.length > 0 ? (
                        <>
                            <SearchUserGrid
                                users={data.items}
                                onUserClick={handleUserClick}
                            />

                            {totalPages > 1 && (
                                <Box
                                    sx={{
                                        mt: 6,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        color="primary"
                                        size={
                                            isSmallScreen ? 'medium' : 'large'
                                        }
                                    />
                                </Box>
                            )}
                        </>
                    ) : (
                        <NotFound
                            title="No Results Found"
                            message={`We couldn't find any GitHub users matching "${query}".`}
                        />
                    )}
                </Box>
            )}

            <UserDetailModal
                open={!!selectedUser}
                onClose={handleCloseModal}
                username={selectedUser}
            />
        </Box>
    );
};
