import { Slider } from "@/components/ui/slider";
import React from "react";

function SliderField({ label, value, onHandleStyleChange, type = "px" }) {
  const FormattedValue = (value_) => {
    return Number(value_.toString().replace(type, ""));
  };

  return (
    <div>
      <label>{label} ({value}) </label>
      <Slider
        defaultValue={[FormattedValue(value)]}
        max={100}
        step={1}
        className="[&>.relative>.bg-primary]:bg-[#FA812F] [&>.relative>.bg-secondary]:bg-[#FFE6CC]"
        onValueChange={(v) => onHandleStyleChange(v + type)}
      />
    </div>
  );
}

export default SliderField;
