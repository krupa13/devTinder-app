import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUsersFromFeed: (state, action) => {
            const newFeed = state.filter((req) => req._id !== action.payload);
            return newFeed;
        },
        resetFeed: () => null
    }
});

export const {addFeed, removeUsersFromFeed, resetFeed} = feedSlice.actions;
export default feedSlice.reducer;