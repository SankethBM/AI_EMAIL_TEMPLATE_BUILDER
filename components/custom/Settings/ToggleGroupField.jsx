import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function ToggleGroupField({ label, value, options, onHandleStyleChange }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium">{label}</label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onHandleStyleChange(v)}
        className="flex gap-2 w-full"
      >
        {options.map((option, index) => (
          <ToggleGroupItem
            key={index}
            value={option.value}
            aria-label={option.value}
            className="flex-1 flex items-center justify-center"
          >
            <option.icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default ToggleGroupField;
