import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestsSlice";

const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connection: connectionReducer,
        requests: requestsReducer
    },
})

export default appStore;