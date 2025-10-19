"use client";
import { useEmailTemplate, useUserDeatail } from "@/app/provider";
import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState();
  const [loading, setLoading] = useState(false);
  const { templateId } = useParams();
  const { userDetail, setUserDetail } = useUserDeatail();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();

  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);

  const GetTemplateData = async () => {
    setLoading(true)
    const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
      tid: templateId,
      email: userDetail?.email,
    });
    console.log(result);
    setEmailTemplate(result?.design)
    setLoading(false)
  };

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />

      {!loading ? (
        <div className="grid grid-cols-5">
          <ElementsSideBar />
          <div className="col-span-3 bg-gray-100">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => setViewHTMLCode(false)}
            />
          </div>
          <Settings />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-80 gap-2">
          <Loader2 className="animate-spin text-[#FA812F] w-12 h-12" />
          <h2 className="text-[#FA812F] font-extrabold text-xl">Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default Editor;
