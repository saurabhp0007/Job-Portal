import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "./api/jobApi";
import { employmentApi } from "./api/employmentApi";
import userSlice from "./features/userSlice";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [employmentApi.reducerPath]: employmentApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    user: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      jobApi.middleware,
      employmentApi.middleware,
      userApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
