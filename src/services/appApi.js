
//createApi and fetchBaseQuery are functions provided by Redux Toolkit's query API that allow developers to easily configure and create APIs for making asynchronous data requests from a server.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//@reduxjs/toolkit/query/react module, a React application can use Redux Toolkit's query API to fetch data from a server in a simple and efficient way.

//By using Redux in a React application, developers can easily manage the state of the application and create a more predictable and maintainable codebase.

// define a service user a base URL

const appApi = createApi({
    reducerPath: "appApi",
//By using a unique reducerPath for each API, you can avoid naming conflicts and keep your Redux store organized.
//This is useful when you have multiple APIs in your application, and you need to keep their state separate from each other.


    baseQuery: fetchBaseQuery({
        baseUrl: "https://chatappbackend-l4pe.onrender.com",
    }),

    endpoints: (builder) => ({
        // creating the user
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),

     

        // login
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // logout

        logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),
    }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;

export default appApi;



/**
 This code is defining an API endpoint for signing up a user using the builder.mutation method from Redux Toolkit's query API.

The builder.mutation method takes an object with a query property, which is a function that returns an object with the url, method, and body properties for the HTTP request.

In this case, the query function takes a user object as a parameter and returns an object with the following properties:

url: This is the URL endpoint for the HTTP request. In this case, it is "/users", which suggests that this is the endpoint for creating a new user.

method: This is the HTTP method for the request. In this case, it is "POST", which means that the request will create a new user on the server.

body: This is the data that will be sent in the HTTP request body. In this case, it is the user object that was passed to the query function.

Once this API endpoint is defined, it can be called in a React component using the useMutation hook from Redux Toolkit's query API. When the signupUser endpoint is called, it will send a POST request to /users with the user object in the request body. The server will then create a new user with the provided information and return a response, which can be handled by the React component
 */

/*
Typically, you should only have one API slice per base URL that your application needs to communicate with. For example, if your site fetches data from both /api/posts and /api/users, you would have a single API slice with /api/ as the base URL, and separate endpoint definitions for posts and users. This allows you to effectively take advantage of automated re-fetching by defining tag relationships across endpoints.

For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints */