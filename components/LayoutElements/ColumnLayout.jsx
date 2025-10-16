"use client";
import React, { useState } from "react";
import { useEmailTemplate } from "@/app/provider";
import { useDragElementLayout } from "@/app/provider";

function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDropHandle = () => {
    const index = dragOver.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElementLayout?.dragElement }
          : col
      )
    );
    setDragOver(null);
  };

  const getElementComponent = (element) => {
    console.log(element);
    return element?.type;
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-2 flex justify-center items-center bg-gray-100 border border-dashed
              ${index == dragOver?.index && dragOver?.columnId && "bg-green-100"}
              `}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
          >
            {getElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColumnLayout;
