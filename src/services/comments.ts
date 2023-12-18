import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/comments"
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Comment[], string | void>({
      query(queryString) {
        if (queryString) return `?q=${queryString}`;
        return "";
      }
    })
  })
});

export const { useLazyGetPostsQuery } = commentsApi;
