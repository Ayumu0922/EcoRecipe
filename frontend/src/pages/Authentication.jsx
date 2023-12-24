import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api/auth";
import { Navigate } from "react-router-dom";
import Sucsess from "../components/Authentication/Sucsess";
import { ThreeDots } from "react-loader-spinner";

// グローバルで扱う変数・関数
export const AuthContext = createContext({
  loading: false,
  setLoading: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

const Authentication = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // 認証済みのユーザーがいるかどうかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  if (loading) {
    return <ThreeDots color="#00BFFF" height={80} width={80} />;
  }

  return isSignedIn ? <Sucsess /> : <Navigate to="/authentication/signin" />;
};

export default Authentication;
