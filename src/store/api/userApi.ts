import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUpUser: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "user/signUp-user",
        body: data,
      }),
    }),

    signInUser: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "user/signIn-user",
        body: data,
      }),
    }),

    getUser: builder.query<any, any>({
      query: ({ userId }) => ({
        method: "GET",
        url: `user/get-user/${userId}`,
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<any, any>({
      query: ({ userId, updateData }) => ({
        method: "PUT",
        url: `user/update-user/${userId}`,
        body: updateData,
      }),
      invalidatesTags: ["User"],
    }),

    applyJob: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "apply/apply-job",
        body: data,
      }),
    }),

    getAppliedJob: builder.query<any, any>({
      query: ({ userId }) => ({
        method: "GET",
        url: `apply/get-apply-job/${userId}`,
      }),
    }),

    cancelJob: builder.mutation<any, any>({
      query: ({ jobId }) => ({
        method: "DELETE",
        url: `apply/cancel-job-apply/${jobId}`,
      }),
    }),
  }),
});

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useApplyJobMutation,
  useGetAppliedJobQuery,
  useCancelJobMutation,
} = userApi;
