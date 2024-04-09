"use client";

import { store } from "@/store/store";
import { LayoutProps } from "@/types/types";
import { Provider } from "react-redux"

const StoreProvider = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default StoreProvider