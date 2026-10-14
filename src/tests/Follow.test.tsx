import { FollowButton } from '@/components/search/FollowButton';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('FollowButton Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders Follow button and successfully follows user on click', async () => {
        const mockOnFollow = vi.fn().mockResolvedValue(undefined);

        render(
            <FollowButton
                username="testuser"
                isFollowing={false}
                isFollowingLoading={false}
                onFollow={mockOnFollow}
            />,
        );

        // :-: Checking that follow button is rendered or not :-:
        const followButton = screen.getByRole('button', { name: /Follow/i });
        expect(followButton).toBeInTheDocument();

        fireEvent.click(followButton);

        // :-: Checking that onFollow function was either called with username or not :-:
        expect(mockOnFollow).toHaveBeenCalledWith('testuser');

        // :-: Checking that button either transitioned to the 'Following' text after successful follow :-:
        await waitFor(() => {
            expect(screen.getByText('Following')).toBeInTheDocument();
        });
        expect(
            screen.queryByRole('button', { name: /Follow/i }),
        ).not.toBeInTheDocument();
    });

    it('renders Following text when already following the user', () => {
        const mockOnFollow = vi.fn();

        render(
            <FollowButton
                username="testuser"
                isFollowing={true}
                isFollowingLoading={false}
                onFollow={mockOnFollow}
            />,
        );

        // :-: Checking that Following text is either getting displayed or not :-:
        expect(screen.getByText('Following')).toBeInTheDocument();

        // :-: Checking that Follow button is not present :-:
        expect(
            screen.queryByRole('button', { name: /Follow/i }),
        ).not.toBeInTheDocument();
    });

    it('displays loading spinner when follow status is loading', () => {
        const mockOnFollow = vi.fn();

        render(
            <FollowButton
                username="testuser"
                isFollowing={false}
                isFollowingLoading={true}
                onFollow={mockOnFollow}
            />,
        );

        // :-: Checking that disabled button with loading spinner is either present or not :-:
        const disabledButton = screen.getByRole('button');
        expect(disabledButton).toBeDisabled();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();

        // :-: Checking to ensure that Follow text button should not be presnet :-:
        expect(
            screen.queryByRole('button', { name: /Follow/i }),
        ).not.toBeInTheDocument();
    });

    it('displays error toast when follow action fails', async () => {
        const mockOnFollow = vi
            .fn()
            .mockRejectedValue(new Error('Network error'));

        render(
            <FollowButton
                username="testuser"
                isFollowing={false}
                isFollowingLoading={false}
                onFollow={mockOnFollow}
            />,
        );

        const followButton = screen.getByRole('button', { name: /Follow/i });
        fireEvent.click(followButton);

        // :-: Checking that onFollow function was either called or not :-:
        expect(mockOnFollow).toHaveBeenCalledWith('testuser');

        // :-: Checking for the toast notification on failure :-:
        await waitFor(() => {
            expect(
                screen.getByText(
                    'Failed to follow testuser. Please try again.',
                ),
            ).toBeInTheDocument();
        });

        // :-: Checking that Follow button remains visible and 'Following' is not shown :-:
        expect(
            screen.getByRole('button', { name: /Follow/i }),
        ).toBeInTheDocument();
        expect(screen.queryByText('Following')).not.toBeInTheDocument();
    });
});
