import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    createJob: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "job/create-job",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    getJob: builder.query<any, any>({
      query: ({
        page,
        per_page,
        search,
        category,
        organization,
        location,
        salary,
        employmentType,
        experience,
      }) => ({
        method: "GET",
        url: `job/get-jobs?page=${page}&per_page=${per_page}&search=${search}&category=${category}&organization=${organization}&location=${location}&salary=${salary}&employmentType=${employmentType}&experience=${experience}`,
      }),

      providesTags: ["Job"],
    }),

    getJobByPostId: builder.query<any, any>({
      query: ({ id }) => ({
        method: "GET",
        url: `job/get-jobByUser/${id}`,
      }),

      providesTags: ["Job"],
    }),

    getJobByUserId: builder.query<any, any>({
      query: ({ id }) => ({
        method: "GET",
        url: `job/get-jobByUser/${id}`,
      }),

      providesTags: ["Job"],
    }),

    getJobByEmployment: builder.query<any, any>({
      query: ({ jobId }) => ({
        method: "GET",
        url: `apply/get-apply-jobById/${jobId}`,
      }),

      providesTags: ["Job"],
    }),

    getShowCaseJob: builder.query<any, any>({
      query: () => ({
        method: "GET",
        url: `job/get-total-job`,
      }),

      providesTags: ["Job"],
    }),

    deleteJob: builder.mutation<any, any>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `job/delete-job/${id}`,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobQuery,
  useGetJobByPostIdQuery,
  useDeleteJobMutation,
  useGetJobByUserIdQuery,
  useGetJobByEmploymentQuery,
  useGetShowCaseJobQuery,
} = jobApi;
