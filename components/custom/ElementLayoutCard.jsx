import React from "react";

function ElementLayoutCard({ layout }) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed rounded-xl p-3 group hover:shadow-md hover:border-[#FA812F] cursor-pointer gap-2">
      {
        <layout.icon className="p-2 h-10 w-10 bg-gray-100  group-hover:bg-[#FFD8B0] rounded-full group-hover:text-[#FA812F]" />
      }
      <h2 className="font-bold text-sm group-hover:text-[#FA812F]">
        {layout.label}
      </h2>
    </div>
  );
}

export default ElementLayoutCard;
