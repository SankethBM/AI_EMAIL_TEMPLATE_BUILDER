"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";

function ViewHtmlDialog({ openDialog, htmlCode, closeDialog }) {

    const CopyCode = () => {
        navigator.clipboard.writeText(htmlCode)
    }

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            {" "}
            <div className="flex items-center justify-between "> 
              <h2>HTML Email Template Code</h2>
              <Copy className="p-2 bg-gray-100 rounded-full h-9 w-9 cursor-pointer" onClick={CopyCode} />
            </div>{" "}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="max-h-[500px] overflow-auto bg-gray-200 rounded-lg p-6">
              <pre className="whitespace-pre-wrap break-all">
                <code>{htmlCode}</code>
              </pre>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewHtmlDialog;
