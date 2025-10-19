"use client";
import React, { useState } from "react";
import { useEmailTemplate, useSelectedElement } from "@/app/provider";
import { useDragElementLayout } from "@/app/provider";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import LogoHeaderComponent from "../custom/Element/LogoHeaderComponent";
import SocialIconComponent from "../custom/Element/SocialIconComponent";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";

function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();

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
        col?.id === layout?.id
          ? { ...col, [index]: dragElementLayout?.dragElement }
          : col
      )
    );
    setDragOver(null);
  };

  const getElementComponent = (element) => {
    // console.log(element);
    if (element?.type == "Button") {
      return <ButtonComponent {...element} />;
    } else if (element?.type == "Text") {
      return <TextComponent {...element} />;
    } else if (element?.type == "Image") {
      return <ImageComponent {...element} />;
    } else if (element?.type == "Logo") {
      return <LogoComponent {...element} />;
    } else if (element?.type == "Divider") {
      return <DividerComponent {...element} />;
    } else if (element?.type == "LogoHeader") {
      return <LogoHeaderComponent {...element} />;
    } else if (element?.type == "SocialIcons") {
      return <SocialIconComponent {...element} />;
    }
    return element?.type;
  };

  const deleteLayout = (layoutId) => {
    const updateEmailTemplate = emailTemplate?.filter(
      (item) => item?.id != layoutId
    );

    setEmailTemplate(updateEmailTemplate);
    setSelectedElement(null);
  };

  const moveItemUp = (layoutId) => {
    const index = emailTemplate.findIndex((item) => item?.id === layoutId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
          [updatedItems[index], updatedItems[index - 1]] = [
            updatedItems[index - 1],
            updatedItems[index],
          ];
        return updatedItems;
      });
    }
  };


  const moveItemDown = (layoutId) => {
    const index = emailTemplate.findIndex((item) => item?.id === layoutId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
          [updatedItems[index], updatedItems[index + 1]] = [
            updatedItems[index + 1],
            updatedItems[index],
          ];
        return updatedItems;
      });
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "0px",
        }}
        className={`${selectedElement?.layout?.id == layout?.id && "border border-dashed border-[#FA812F]"}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            key={index}
            className={`p-0 flex justify-center items-center cursor-pointer ${!layout?.[index]?.type && "bg-gray-100 border border-dashed"}
              ${index == dragOver?.index && dragOver?.columnId && "bg-green-100"}
              ${selectedElement?.layout?.id == layout?.id && selectedElement?.index == index && "border-2 border-[#FA812F]"}
              `}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: layout, index: index })}
          >
            {getElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}

        {selectedElement?.layout?.id == layout?.id && (
          <div className="absolute -right-10 flex flex-col gap-2">
            <div
              className="-right-10 bg-red-100 p-2 rounded-full cursor-pointer hover:scale-130 transition-all hover:shadow-xl"
              onClick={() => deleteLayout(layout?.id)}
            >
              <Trash className="w-4 h-4 text-red-500" />
            </div>

            <div
              className=" -right-10 bg-gray-100 p-2 rounded-full cursor-pointer hover:scale-130 transition-all hover:shadow-xl"
              onClick={() => moveItemUp(layout?.id)}
            >
              <ArrowUp className="w-4 h-4" />
            </div>

            <div
              className=" -right-10 bg-gray-100 p-2 rounded-full cursor-pointer hover:scale-130 transition-all hover:shadow-xl"
              onClick={() => moveItemDown(layout?.id)}
            >
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnLayout;
