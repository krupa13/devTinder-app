import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => {
            const removeState = state.filter(req => req._id !== action.payload);
            return removeState;
        }
    }
});

export const { addRequests, removeRequests } =requestsSlice.actions;
export default requestsSlice.reducer;