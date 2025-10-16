"use client";
import React, { use } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function SignInButton() {
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse.access_token } }
      );

      console.log(userInfo.data);
      const user = userInfo.data;

      //later I need to store this user data into DB as well
      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });

      const userDetail = {
        ...user,
        _id: result?.id ?? result,
      };

      //This is to store the user data into the local system storage
      if (typeof window !== undefined) {
        localStorage.setItem("userDetail", JSON.stringify(userDetail));
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <Button onClick={googleLogin} className={'p-6'} >Get Started !</Button>
    </div>
  );
}

export default SignInButton;
