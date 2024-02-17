"use client";

import Loading from "@/components/common/Loading";
import { Provider } from "react-redux";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./(features)/store";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}

      <Loading />
      <ToastContainer
        position="bottom-left"
        transition={Flip}
        autoClose={2500}
        hideProgressBar
        theme="colored"
      />
    </Provider>
  );
}
