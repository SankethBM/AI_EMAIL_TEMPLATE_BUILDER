"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { useUserDeatail } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";



function AIInputBox() {
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);

  const { userDetail, setUserDetail } = useUserDeatail();

  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const router = useRouter()


  const OnGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-email-generate/", {
        prompt: PROMPT,
      });
      console.log(result.data);
      //save data in DB
      const res = await SaveTemplate({
        tid: tid,
        design: result.data,
        email: userDetail?.email,
        description:userInput
      });
      console.log(res);
      //Navigate user to editor screen/page
      router.push('/editor/'+tid)
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 w-full">
      <p className="mb-2 text-gray-700 text-sm">
        Provide details about the Email Template you'd like to create
      </p>

      <Textarea
        placeholder="Start Writing here ..."
        rows={5}
        className="text-md w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FA812F]"
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button
        className={"w-full mt-7"}
        disabled={userInput?.length == 0 || loading}
        onClick={OnGenerate}
      >
        {loading ? (
          <span className="flex gap-2">
            {" "}
            <Loader2 className="animate-spin" /> Generating Template...{" "}
          </span>
        ) : (
          "GENERATE"
        )}
      </Button>
    </div>
  );
}

export default AIInputBox;
