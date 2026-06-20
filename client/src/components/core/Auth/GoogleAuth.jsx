import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { googleResponse } from "../../../services/operations/authApi";
import { useSelector } from "react-redux";

const GoogleAuth = ({accountType, dispatch, navigate }) => {
 
  const [loading, setLoading] = useState(false)

  const handleGoogleSuccess = (authResult) => {
    // console.log("Google Success:", authResult);
    dispatch(googleResponse(authResult.code, navigate, accountType, setLoading));
  };

  const handleGoogleError = (error) => {
    console.error("Google Login Failed", error);
    toast.error("Google Login Failed");
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "auth-code",
  });
  return (
    <button
      type="button"
      onClick={googleLogin}
      disabled={loading}
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
    >
      <FcGoogle size={20} />
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
};

export default GoogleAuth;
