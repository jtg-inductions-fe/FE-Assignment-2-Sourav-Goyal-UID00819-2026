import { toast } from '@/components/common/toast';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const errorMiddleware: Middleware = () => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const errorPayload = action.payload as FetchBaseQueryError;
        const status = errorPayload.status;

        const errorData = errorPayload.data as
            | { message?: string; documentation_url?: string }
            | undefined;
        const errorMessage = errorData?.message || '';

        switch (status) {
            case 'FETCH_ERROR':
                if (!navigator.onLine) {
                    toast(
                        'You are currently offline. Please check your internet connection.',
                        'error',
                    );
                } else {
                    toast(
                        'Unable to connect to the server. It might be down.',
                        'error',
                    );
                }
                break;
            case 403:
            case 429:
                if (
                    errorMessage
                        .toLowerCase()
                        .includes('rate limit exceeded') ||
                    errorMessage.toLowerCase().includes('secondary rate limit')
                ) {
                    toast(
                        'API rate limit exceeded! Please wait a moment before trying again.',
                        'error',
                    );
                } else {
                    toast(
                        'Permission Denied: You do not have access to this resource.',
                        'error',
                    );
                }
                break;

            case 500:
                toast('Something went wrong', 'error');
                break;
        }
    }

    return next(action);
};
