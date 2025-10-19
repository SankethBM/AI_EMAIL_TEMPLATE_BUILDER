import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import AIInputBox from "@/components/custom/AIInputBox";

function CreateNew() {
  return (
    <div className="px-6 md:px-16 lg:px-32 xl:px-48 mt-20">
      <div className="flex flex-col text-center">
        {/* Title */}
        <h2 className="font-bold text-3xl text-[#FA812F]">
          Create New Email Template
        </h2>
        <p className="text-lg text-gray-500 font-semibold mt-2">
          Effortlessly Design and Customize Professional AI-Powered Email
          Templates with Ease.
        </p>

        {/* Tabs */}
        <Tabs
          defaultValue="AI"
          className="w-full max-w-[700px] mx-auto mt-10 flex flex-col"
        >
          {/* Center only the tab buttons */}
          <div className="flex justify-center">
            <TabsList className="flex gap-3 cursor-pointer h-full p-3">
              <TabsTrigger value="AI" className={"cursor-pointer p-2"}>
                Create with AI <Sparkles className="h-5 w-5 ml-2" />
              </TabsTrigger>
              <TabsTrigger value="SCRATCH" className={"cursor-pointer p-2"}>
                Start from Scratch
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="AI">
            <AIInputBox />
          </TabsContent>

          <TabsContent value="SCRATCH">
            <div className="p-5 text-gray-600 border rounded-md mt-4"></div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CreateNew;
