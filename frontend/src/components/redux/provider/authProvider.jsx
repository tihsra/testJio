"use client";

import { useEffect } from "react";
import { API, ENDPOINTS } from "@/lib/api";
import { useDispatch } from "react-redux";
import { updateLoggedIn } from "@/components/redux/slice/userSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get(ENDPOINTS.userDetail);
        if (res.data.status === "success") {
          dispatch(updateLoggedIn(res.data.userData)); 
        }
      } catch (err) {
      }
    };
    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthProvider;