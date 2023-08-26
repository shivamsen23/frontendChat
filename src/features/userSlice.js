import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            delete state.newMessages[payload];
        },
    },

    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => payload);
        // logout: destroy user session
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;


/**
 * This code imports the createSlice function from the @reduxjs/toolkit library and the appApi instance from a local file named appApi.js.

It then uses createSlice to define a new Redux slice named user. The initial state of the user slice is set to null, and two reducer functions are defined: addNotifications and resetNotifications.

The addNotifications reducer function takes two arguments: state and payload. When this reducer is called, it checks if the state.newMessages object has a key matching the payload. If it does, it increments the value of that key by 1. If it doesn't, it creates a new key with the value of 1.

The resetNotifications reducer function takes two arguments: state and payload. When this reducer is called, it deletes the key in the state.newMessages object that matches the payload.

The extraReducers property is an object that allows you to define additional reducers that respond to actions dispatched by other parts of the application. In this code, the extraReducers property is defined using the builder function provided by Redux Toolkit.

The builder function defines three additional reducers that respond to actions dispatched by the signupUser, loginUser, and logoutUser endpoints of the appApi instance.

When the signupUser or loginUser endpoint returns a successful response, the addMatcher function is used to add a new reducer that updates the state of the user slice with the user object returned in the response.

When the logoutUser endpoint returns a successful response, the addMatcher function is used to add a new reducer that updates the state of the user slice to null.

Finally, the addNotifications and resetNotifications action creators are exported so that they can be used in other parts of the application. The default export is the user reducer function that can be added to the Redux store using the combineReducers function.









It's a function that deals with everything you need for each slice, do you remember using createAction and createReducer manually? Now it's available in this specific slice function.

The other benefit of using createSlice is our files structure. We can put all of our Redux-related logic for the slice into a single file. You'll see how to do it in our tutorial.
 */