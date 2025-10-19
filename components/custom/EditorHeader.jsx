"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function EditorHeader({ viewHTMLCode }) {
  const { screenSize, setScreenSize } = useScreenSize();
  const { templateId } = useParams();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();

  const updateEmailTemplate = useMutation(
    api.emailTemplate.UpdateTemplateDesign
  );

  const onSaveTemplate = async () => {
    try {
      // Ensure emailTemplate is plain JSON
      const safeEmailTemplate = emailTemplate.map((item) => {
        // Remove any React elements or non-serializable properties
        return JSON.parse(JSON.stringify(item));
      });

      await updateEmailTemplate({
        tid: templateId,
        design: safeEmailTemplate, // now safe to send
      });

      console.log("Template saved successfully!");
      toast.success("Template saved successfully", {
        duration: 3000, // shows for 3 seconds
        style: {
          background: "#34D399", // soft green
          color: "#fff",
          fontWeight: 500,
          fontSize: "16px",
          borderRadius: "8px",
          padding: "12px 20px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out", // smooth fade/slide effect
        },
      });
    } catch (err) {
      console.error("Failed to save template:", err);
      toast.error("Failed to save template", {
        duration: 3000,
        style: {
          background: "#F87171", // soft red
          color: "#fff",
          fontWeight: 500,
          fontSize: "16px",
          borderRadius: "8px",
          padding: "12px 20px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
        },
      });
    }
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center cursor-pointer px-10">
      <Link href={'/dashboard'}>
        <div className="flex items-center justify-center">
          <Image src={"/logo.png"} alt="logo" width={80} height={40} />
          <h1 className="font-extrabold">LOGO</h1>
        </div>
      </Link>

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
          className="hover:text-[#FA812F] hover:bg-[#FFE6CC] border border-transparent hover:border-1 rounded-md cursor-pointer"
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant={"outline"} className={"p-6 cursor-pointer"}>
          Send Test Email
        </Button>
        <Button className={"p-6 cursor-pointer"} onClick={onSaveTemplate}>
          Save Template
        </Button>
      </div>
    </div>
  );
}

export default EditorHeader;
