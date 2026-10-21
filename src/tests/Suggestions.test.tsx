import { Suggestions } from '@/components/suggestions';
import type { RootState } from '@/store/store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

vi.mock('@/lib/utils', () => ({
    shuffleArray: vi.fn((arr: unknown[]) => arr),
}));

interface MockUser {
    id: number;
    login: string;
}

vi.mock('@/components/user/UserGrid', () => ({
    UserGrid: ({
        users,
        onDismiss,
        onRefresh,
    }: {
        users: MockUser[];
        onDismiss?: (id: number) => void;
        onRefresh?: () => void;
    }) => (
        <div data-testid="user-grid">
            <button data-testid="refresh-btn" onClick={onRefresh}>
                Refresh
            </button>
            {users.map((user) => (
                <div key={user.id} data-testid={`user-${user.login}`}>
                    <span>{user.login}</span>
                    <button
                        data-testid={`dismiss-${user.login}`}
                        onClick={() => onDismiss?.(user.id)}
                    >
                        Dismiss
                    </button>
                </div>
            ))}
        </div>
    ),
}));

vi.mock('@/components/user/UserDetailModal', () => ({
    UserDetailModal: () => <div>Modal</div>,
}));

const mockCheckFollowingAbort = vi.fn();
const mockCheckFollowingUnwrap = vi.fn();
const mockCheckUserFollowing = vi.fn(() => ({
    unwrap: mockCheckFollowingUnwrap,
    abort: mockCheckFollowingAbort,
}));

const mockGetSuggestionsUnwrap = vi.fn();
const mockGetSuggestionUsers = vi.fn(() => ({
    unwrap: mockGetSuggestionsUnwrap,
}));

vi.mock('@/services/github', () => ({
    useFollowUserMutation: () => [vi.fn()],
    useLazyCheckUserFollowingQuery: () => [mockCheckUserFollowing],
    useLazyGetSuggestedUsersQuery: () => [mockGetSuggestionUsers],
}));

vi.mock('@/store/store', () => ({
    useAppSelector: vi.fn((selector: (state: RootState) => unknown) =>
        selector({
            user: {
                user: { login: 'loggedInUser' },
            },
        } as RootState),
    ),
}));

const mockUsers = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    login: `user${i + 1}`,
    avatar_url: `https://avatar.com/${i + 1}`,
    html_url: `https://github.com/user${i + 1}`,
}));

describe('Suggestions Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockGetSuggestionsUnwrap.mockResolvedValue(mockUsers);
        mockCheckFollowingUnwrap.mockResolvedValue(false);
    });

    it('fetches and displays suggested users on initial render', async () => {
        render(<Suggestions />);

        // :-: Checking that first 10 suggested users are either present or not :-:
        await waitFor(() => {
            expect(screen.getByTestId('user-user1')).toBeInTheDocument();
            expect(screen.getByTestId('user-user10')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('user-user11')).not.toBeInTheDocument();

        // :-: Checking that follow status check was either made for displayed users or not :-:
        expect(mockCheckUserFollowing).toHaveBeenCalledWith({
            loggedInUser: 'loggedInUser',
            username: 'user1',
        });
    });

    it('refreshes suggestions with next users batch when refresh is clicked', async () => {
        render(<Suggestions />);

        await waitFor(() => {
            expect(screen.getByTestId('user-user1')).toBeInTheDocument();
        });
        fireEvent.click(screen.getByTestId('refresh-btn'));

        // :-: Checking that next batch of users are either present or not:-:
        await waitFor(() => {
            expect(screen.getByTestId('user-user11')).toBeInTheDocument();
            expect(screen.getByTestId('user-user20')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('user-user1')).not.toBeInTheDocument();
    });

    it('dismisses a suggested user and replaces them with next user in the list', async () => {
        render(<Suggestions />);

        await waitFor(() => {
            expect(screen.getByTestId('user-user1')).toBeInTheDocument();
        });
        fireEvent.click(screen.getByTestId('dismiss-user1'));

        // :-: Checking that dismissed user is either replaced by next user or not :-:
        await waitFor(() => {
            expect(screen.getByTestId('user-user11')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('user-user1')).not.toBeInTheDocument();
    });
});
