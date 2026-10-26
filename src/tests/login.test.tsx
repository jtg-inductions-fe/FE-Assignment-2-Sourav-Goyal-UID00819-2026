import Login from '@/pages/login';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockDispatch = vi.fn();
vi.mock('@/store/store', () => ({
    useAppDispatch: () => mockDispatch,
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

const mockUnwrap = vi.fn();

const mockGetAuthUser = vi.fn(() => ({
    unwrap: mockUnwrap,
}));

vi.mock('@/services/github', () => ({
    useLazyGetAuthenticatedUserQuery: () => [mockGetAuthUser],
}));

vi.mock('@/store/slices/user-slice', () => ({
    setUser: vi.fn((user: unknown) => ({ type: 'SET_USER', payload: user })),
    clearUser: vi.fn(() => ({ type: 'CLEAR_USER' })),
}));

vi.mock('@/components/login/login-form', () => ({
    LoginForm: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
        <button
            data-testid="mock-login-btn"
            onClick={() =>
                onSubmit({ username: 'testuser', pat: 'ghp_testtoken' })
            }
        >
            Mock Login
        </button>
    ),
}));

describe('Login Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('displays success toast, stores token, and navigates on successful login', async () => {
        mockUnwrap.mockResolvedValue({ login: 'TestUser' });

        render(<Login />);

        const btn = screen.getByTestId('mock-login-btn');
        fireEvent.click(btn);

        // :-: Checking that either actual api call has been made or not :-:
        expect(mockGetAuthUser).toHaveBeenCalled();

        // :-: Checking for toast notification :-:
        await waitFor(() => {
            expect(
                screen.getByText(/Login successful! Redirecting.../i),
            ).toBeInTheDocument();
        });

        // :-: Checking the local storage that either it contains the stored right pat token or not :-:
        expect(localStorage.getItem('pat_token')).toBe('ghp_testtoken');

        // :-: Checking that user is either properly stored in user store or not :-:
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SET_USER',
            payload: { login: 'TestUser' },
        });

        // :-: Checking that user has either redirected to the profile page or not :-:
        expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });

    it('displays error toast and clears user when username does not match', async () => {
        mockUnwrap.mockResolvedValue({ login: 'DifferentUser' });

        render(<Login />);

        const btn = screen.getByTestId('mock-login-btn');
        fireEvent.click(btn);

        // :-: Checking for toast message on error :-:
        await waitFor(() => {
            expect(
                screen.getByText(/The provided PAT does not match/i),
            ).toBeInTheDocument();
        });

        // :-: Checking that no user is stored in redux store and no pat token in local storage :-:
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_USER' });
        expect(localStorage.getItem('pat_token')).toBeNull();
    });

    it('displays error toast and clears user when API request fails', async () => {
        mockUnwrap.mockRejectedValue(new Error('API Error'));

        render(<Login />);

        const btn = screen.getByTestId('mock-login-btn');
        fireEvent.click(btn);

        // :-: Checking the toast notification in case of api failure :-:
        await waitFor(() => {
            expect(
                screen.getByText(/Failed to authenticate/i),
            ).toBeInTheDocument();
        });

        // :-: Checking that no user should stored in redux store :-:
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_USER' });
    });
});
