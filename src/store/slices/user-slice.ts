import type { UserDetail } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: UserDetail | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDetail>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
