import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employmentApi = createApi({
  reducerPath: "employmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    signUpEmployment: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "employer/signUp-employment",
        body: data,
      }),
    }),

    signInEmployment: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "employer/signIn-employment",
        body: data,
      }),
    }),

    getEmployment: builder.query<any, any>({
      query: ({ userId }) => ({
        method: "GET",
        url: `employer/get-employment/${userId}`,
      }),
    }),
  }),
});

export const {
  useSignUpEmploymentMutation,
  useSignInEmploymentMutation,
  useGetEmploymentQuery,
} = employmentApi;
