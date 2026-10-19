import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import api from '@/lib/api';
import { configureStore } from '@reduxjs/toolkit';

import { errorMiddleware } from './middlewares/errorMiddleware';
import { userReducer } from './slices/user-slice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
