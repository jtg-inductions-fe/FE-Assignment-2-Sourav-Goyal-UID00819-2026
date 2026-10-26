import { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

import { toast } from '@/components/common/toast';
import { UserDetailModal } from '@/components/user';
import { UserGrid } from '@/components/user';
import { shuffleArray } from '@/lib/utils';
import {
    useFollowUserMutation,
    useLazyCheckUserFollowingQuery,
    useLazyGetSuggestedUsersQuery,
} from '@/services/github';
import { useAppSelector } from '@/store/store';
import { UserDetail } from '@/types/user';

import * as S from './Suggestions.styles';

const MAX_SUGGESTED_USERS = 10;
const MAX_PER_PAGE = 100;
const REFETCH_THRESHOLD = 80;

export const Suggestions = () => {
    const { user } = useAppSelector((state) => state.user);
    const [followUser] = useFollowUserMutation();
    const [checkUserFollowing] = useLazyCheckUserFollowingQuery();
    const [getSuggestionUsers] = useLazyGetSuggestedUsersQuery();

    const lastSinceRef = useRef(0);
    const lastDisplayUserIdxRef = useRef(0);
    const inFlightRequestsRef = useRef<Record<string, { abort: () => void }>>(
        {},
    );

    const [suggestedUsers, setSuggestedUsers] = useState<UserDetail[]>([]);
    const [displaySuggestedUsers, setDisplaySuggestedUsers] = useState<
        UserDetail[]
    >([]);
    const [followMap, setFollowMap] = useState<Record<string, boolean>>({});
    const [followLoadingMap, setFollowLoadingMap] = useState<
        Record<string, boolean>
    >({});
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const checkFollowStatus = (targetUsername: string) => {
        const loggedInUsername = user?.login;
        if (
            !loggedInUsername ||
            targetUsername.toLowerCase() === loggedInUsername.toLowerCase()
        ) {
            return;
        }

        if (inFlightRequestsRef.current[targetUsername]) {
            inFlightRequestsRef.current[targetUsername].abort();
            delete inFlightRequestsRef.current[targetUsername];
        }

        setFollowLoadingMap((prev) => ({
            ...prev,
            [targetUsername]: true,
        }));

        const request = checkUserFollowing({
            loggedInUser: loggedInUsername,
            username: targetUsername,
        });

        inFlightRequestsRef.current[targetUsername] = request;

        request
            .unwrap()
            .then((isFollowing) => {
                setFollowMap((prev) => ({
                    ...prev,
                    [targetUsername]: isFollowing,
                }));
            })
            .catch(() => {})
            .finally(() => {
                setFollowLoadingMap((prev) => ({
                    ...prev,
                    [targetUsername]: false,
                }));
                delete inFlightRequestsRef.current[targetUsername];
            });
    };

    const handleFollow = async (targetUsername: string) => {
        setFollowLoadingMap((prev) => ({ ...prev, [targetUsername]: true }));
        try {
            await followUser({ username: targetUsername }).unwrap();
            setFollowMap((prev) => ({ ...prev, [targetUsername]: true }));
        } catch (error) {
            toast(
                `Failed to follow ${targetUsername}. Please try again.`,
                'error',
            );
            throw error;
        } finally {
            setFollowLoadingMap((prev) => ({
                ...prev,
                [targetUsername]: false,
            }));
        }
    };

    const fetchSuggestions = async (perPage = MAX_PER_PAGE) => {
        const response = await getSuggestionUsers({
            since: lastSinceRef.current,
            perPage,
        }).unwrap();
        const shuffledUsers = shuffleArray(response);
        setSuggestedUsers((prev) => [...prev, ...shuffledUsers]);

        if (response.length > 0) {
            lastSinceRef.current = response[response.length - 1]['id'];
        }

        setDisplaySuggestedUsers((prev) => {
            if (prev.length === 0 && response.length > 0) {
                lastDisplayUserIdxRef.current = MAX_SUGGESTED_USERS - 1;
                return shuffledUsers.slice(0, MAX_SUGGESTED_USERS);
            }
            return prev;
        });
    };

    const handleRefreshSuggestion = () => {
        const nextEndIdx = lastDisplayUserIdxRef.current + MAX_SUGGESTED_USERS;

        if (nextEndIdx >= suggestedUsers.length) return;

        Object.values(inFlightRequestsRef.current).forEach((req) =>
            req?.abort?.(),
        );

        inFlightRequestsRef.current = {};

        const nextUsers = suggestedUsers.slice(
            lastDisplayUserIdxRef.current + 1,
            nextEndIdx + 1,
        );

        setDisplaySuggestedUsers(nextUsers);
        lastDisplayUserIdxRef.current = nextEndIdx;

        nextUsers.forEach((suggestedUser) =>
            checkFollowStatus(suggestedUser.login),
        );
    };

    const handleDismissSuggestion = (userId: number) => {
        const dismissUserIdx = displaySuggestedUsers.findIndex(
            (suggestedUser) => suggestedUser.id === userId,
        );

        if (dismissUserIdx === -1) return;

        const dismissedUser = displaySuggestedUsers[dismissUserIdx];

        if (inFlightRequestsRef.current[dismissedUser.login]) {
            inFlightRequestsRef.current[dismissedUser.login]?.abort?.();
            delete inFlightRequestsRef.current[dismissedUser.login];
        }

        const newDisplayUsers = [...displaySuggestedUsers];

        if (lastDisplayUserIdxRef.current < suggestedUsers.length - 1) {
            lastDisplayUserIdxRef.current += 1;
            const newUser = suggestedUsers[lastDisplayUserIdxRef.current];
            newDisplayUsers[dismissUserIdx] = newUser;
            checkFollowStatus(newUser.login);
        } else {
            newDisplayUsers.splice(dismissUserIdx, 1);
        }

        setDisplaySuggestedUsers(newDisplayUsers);
    };

    const handleUserClick = (username: string) => {
        setSelectedUser(username);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    useEffect(() => {
        void fetchSuggestions();
    }, []);

    useEffect(() => {
        const currentCount = lastDisplayUserIdxRef.current + 1;
        const currentTotal = suggestedUsers.length;

        const isAboveThreshold =
            currentCount > Math.floor((currentTotal * REFETCH_THRESHOLD) / 100);

        if (isAboveThreshold && !!currentTotal) void fetchSuggestions();
    }, [suggestedUsers.length, displaySuggestedUsers]);

    useEffect(() => {
        if (!user?.login || displaySuggestedUsers.length === 0) return;

        displaySuggestedUsers.forEach((suggestedUser) => {
            if (
                followMap[suggestedUser.login] === undefined &&
                !inFlightRequestsRef.current[suggestedUser.login]
            ) {
                checkFollowStatus(suggestedUser.login);
            }
        });
    }, [user?.login, displaySuggestedUsers, followMap]);

    useEffect(
        () => () => {
            Object.values(inFlightRequestsRef.current).forEach((req) =>
                req?.abort?.(),
            );
            inFlightRequestsRef.current = {};
        },
        [],
    );

    return (
        <Box>
            <S.SuggestionsTitle variant="h5">
                Here are some suggestions for you to follow
            </S.SuggestionsTitle>
            <UserGrid
                users={displaySuggestedUsers}
                onUserClick={handleUserClick}
                followMap={followMap}
                followLoadingMap={followLoadingMap}
                loggedInUser={user?.login}
                onFollow={handleFollow}
                showDismissButton
                onDismiss={handleDismissSuggestion}
                showRefreshButton
                onRefresh={handleRefreshSuggestion}
                shouldColumnWise
            />
            <UserDetailModal
                open={!!selectedUser}
                onClose={handleCloseModal}
                username={selectedUser}
            />
        </Box>
    );
};
