import { SearchUsers } from '@/components/search/SearchUsers';
import type { RootState } from '@/store/store';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/search/SearchInput', () => ({
    SearchInput: ({ query }: { query: string }) => (
        <div data-testid="search-input">Input: {query}</div>
    ),
}));

vi.mock('@/components/user/UserGridSkeleton', () => ({
    UserGridSkeleton: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock('@/components/user/UserGrid', () => ({
    UserGrid: ({ users }: { users: unknown[] }) => (
        <div data-testid="user-grid">Grid with {users.length} users</div>
    ),
}));

vi.mock('@/components/common/NotFound', () => ({
    NotFound: ({ title }: { title: string }) => (
        <div data-testid="not-found">{title}</div>
    ),
}));

vi.mock('@/components/user/UserDetailModal', () => ({
    UserDetailModal: ({ open }: { open: boolean }) => (
        <div data-testid="user-modal">
            {open ? 'Modal Open' : 'Modal Closed'}
        </div>
    ),
}));

const mockSetSearchParams = vi.fn();
vi.mock('react-router-dom', () => ({
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
}));

vi.mock('@/store/store', () => ({
    useAppSelector: vi.fn((selector: (state: RootState) => unknown) =>
        selector({
            user: {
                user: null,
            },
        } as RootState),
    ),
}));

const mockUseSearchUsersQuery = vi.fn();
vi.mock('@/services/github', () => ({
    useSearchUsersQuery: (): unknown => mockUseSearchUsersQuery(),
    useFollowUserMutation: () => [vi.fn()],
    useIsFollowingListQuery: () => ({
        data: {},
        isLoading: false,
    }),
}));

describe('SearchUsers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays skeleton loader when fetching', () => {
        mockUseSearchUsersQuery.mockReturnValue({
            data: null,
            isFetching: true,
            isError: false,
        });

        render(<SearchUsers />);
        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('displays user grid when data is successfully fetched with results', () => {
        mockUseSearchUsersQuery.mockReturnValue({
            data: {
                total_count: 2,
                items: [
                    { id: 1, login: 'user1' },
                    { id: 2, login: 'user2' },
                ],
            },
            isFetching: false,
            isError: false,
        });

        render(<SearchUsers />);
        expect(screen.getByTestId('user-grid')).toBeInTheDocument();
        expect(screen.getByText('Grid with 2 users')).toBeInTheDocument();
    });

    it('displays NotFound when fetch returns empty items array', () => {
        mockUseSearchUsersQuery.mockReturnValue({
            data: {
                total_count: 0,
                items: [],
            },
            isFetching: false,
            isError: false,
        });

        render(<SearchUsers />);
        expect(screen.getByTestId('not-found')).toBeInTheDocument();
        expect(screen.getByText('No Results Found')).toBeInTheDocument();
    });
});
