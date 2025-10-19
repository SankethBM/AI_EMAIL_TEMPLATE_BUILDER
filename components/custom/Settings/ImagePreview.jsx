import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

function ImagePreview({ label, value, onHandleInputChange }) {
  const [preview, setPreview] = useState(value || "");
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onHandleInputChange(reader.result); // send base64 or URL up
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="text-sm font-medium">{label}</label>

      {/* Dropzone / Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-40 cursor-pointer transition ${
          isDragging ? "border-[#FA812F] bg-[#FEF3E2]" : "border-gray-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <Upload className="w-8 h-8 mb-2" />
            <p className="text-sm">Drag & drop or click to upload</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
      </div>

      {/* Image URL input (optional) */}
      <Input
        placeholder="Or paste image URL"
        value={value}
        onChange={(e) => {
          setPreview(e.target.value);
          onHandleInputChange(e.target.value);
        }}
      />
    </div>
  );
}

export default ImagePreview;
