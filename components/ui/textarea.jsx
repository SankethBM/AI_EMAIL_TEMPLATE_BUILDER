import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-black placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FA812F] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
