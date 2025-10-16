"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useScreenSize } from "@/app/provider";

function EditorHeader() {
  const { screenSize, setScreenSize } = useScreenSize();

  return (
    <div className="p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center justify-center">
        <Image src={"/logo.png"} alt="logo" width={80} height={40} />
        <h1 className="font-extrabold">LOGO</h1>
      </div>

      <div className="flex items-center justify-center gap-5">
        <Button
          variant={"ghost"}
          onClick={() => setScreenSize("desktop")}
          className={`${screenSize == "desktop" && "bg-[#FFF3E0] text-[#FA812F]"} cursor-pointer`}
        >
          {" "}
          <Monitor /> Desktop{" "}
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setScreenSize("mobile")}
          className={`${screenSize == "mobile" && "bg-[#FFF3E0] text-[#FA812F]"} cursor-pointer`}
        >
          {" "}
          <Smartphone /> Mobile{" "}
        </Button>
      </div>

      <div className="flex gap-3 items-center">
        <Button
          variant={"ghost"}
          className="hover:text-[#FA812F] hover:bg-[#FFE6CC] border border-transparent hover:border-1 rounded-md"
        >
          <Code />
        </Button>
        <Button variant={"outline"} className={"p-6"}>
          Send Test Email
        </Button>
        <Button className={"p-6"}>Save Template</Button>
      </div>
    </div>
  );
}

export default EditorHeader;
