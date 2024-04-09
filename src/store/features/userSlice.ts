"use client";

import { jobInfoProps } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

interface UserState {
  user: {
    userId: string;
    name: string;
    email: string;
    role: boolean;
  } | null;
  token: string | null | undefined;
  favorite: jobInfoProps[];
}

const token = getCookie("access_token");

// verify token
// const verifyToken = () => {
//   if (token) {
//     const decode = jwtDecode(token);
//     const expToken = Number(new Date()) / 1000 >= (decode as any)?.exp;
//     if (expToken) {
//       deleteCookie("access_token");
//       window.location.reload();
//       window.location.replace("/");
//       return null;
//     } else {
//       return token;
//     }
//   }
// };

const initialState: UserState = {
  user: token ? jwtDecode(token) : null,
  token: token ? token : null,
  favorite:
    typeof window !== "undefined" && localStorage.getItem("favorite_list")
      ? JSON.parse(localStorage.getItem("favorite_list") || "")
      : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserToken: (state, action) => {
      state.user = jwtDecode(action.payload);
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },

    favoriteList: (state, action) => {
      const isExistJobList = state.favorite.find(
        (jobId) => jobId._id === action.payload._id
      );

      if (isExistJobList) {
        //show alert message
        Swal.fire({
          icon: "warning",
          title: "Already In Favorite List",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        state.favorite.push(action.payload);

        //show alert message
        Swal.fire({
          icon: "success",
          title: "Add To Favorite List",
          showConfirmButton: false,
          timer: 1500,
        });
        //save localStorage
        localStorage.setItem("favorite_list", JSON.stringify(state.favorite));
      }
    },

    removeFavoriteList: (state) => {
      state.favorite = [];
      localStorage.removeItem("favorite_list");
    },
  },
});

export const { getUserToken, logOut, favoriteList, removeFavoriteList } =
  userSlice.actions;
export default userSlice.reducer;
