"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import SignInButton from "./SignInButton";
import { useUserDeatail } from "@/app/provider";
import Link from "next/link";

function Header() {
  const { userDetail, setUserDetail } = useUserDeatail();

  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Link href={'/dashboard'}>
        <div className="flex items-center justify-center">
          <Image src={"/logo.png"} alt="logo" width={80} height={40} />
          <h1 className="font-extrabold">LOGO</h1>
        </div>
      </Link>
      <div>
        {userDetail?.email ? (
          <div className="flex gap-3 items-center">
            <Link href={"/dashboard"}>
              <Button className="p-6 cursor-pointer">Dashboard</Button>
            </Link>
            <Image
              src={userDetail?.picture}
              alt="user"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}

export default Header;
