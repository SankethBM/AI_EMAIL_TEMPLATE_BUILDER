"use client";
import {
  useDragElementLayout,
  useEmailTemplate,
  useScreenSize,
} from "@/app/provider";
import React, { useState } from "react";
import ColumnLayout from "../LayoutElements/ColumnLayout";

function Canvas() {
  const { screenSize, setScreenSize } = useScreenSize();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();

  const [dragOver, setDragOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    console.log("Over...");
  };

  const onDragLeave = () => setDragOver(false);

  const onDropHandle = () => {
    console.log(dragElementLayout?.dragLayout);
    setDragOver(false);
    if (dragElementLayout?.dragLayout) {
      setEmailTemplate((prev) => [...prev, dragElementLayout?.dragLayout]);
    }
  };

  const getLayoutComponent = (layout) => {
    if(layout?.type == 'column'){
      return <ColumnLayout layout={layout} />
    }
  }

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={`p-6 w-full rounded-sm transition-colors duration-200
          ${screenSize == "desktop" ? "max-w-2xl" : "max-w-md"} 
          ${dragOver ? "bg-[#FFF3E0]" : "bg-white"}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={() => onDropHandle()}
      >
        {/* optional helper
        {dragOver && (
          <p className="text-center text-gray-500 font-bold">Drop here</p>
        )} */}

        {emailTemplate?.length > 0 ? (
          emailTemplate?.map((layout, index) => (
            <div key={index}>
              {getLayoutComponent(layout)}
            </div>
          ))
        ) : (
          <h2 className="p-4 text-center border-2 rounded-sm border-dashed">
            Add Layout Here
          </h2>
        )}
      </div>
    </div>
  );
}

export default Canvas;
