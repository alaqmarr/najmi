"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { Trash, UploadCloud, Loader2 } from "lucide-react";

import { useState } from "react";

interface CloudinaryUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export const CloudinaryUpload = ({
  value,
  onChange,
  onRemove,
}: CloudinaryUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  // Cloudinary configuration (assuming NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are set)
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "najmi-preset";

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setIsUploading(true);

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  if (value) {
    return (
      <div className="mb-4 flex items-center gap-4">
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-muted border">
          <div className="z-10 absolute top-2 right-2">
            <Button type="button" onClick={onRemove} variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <img className="w-full h-full object-cover" alt="Uploaded Image" src={value} />
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex flex-col items-center text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p>Uploading image...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <UploadCloud className="h-10 w-10 mb-4" />
          <p className="text-sm font-medium mb-1">
            {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
          </p>
          <p className="text-xs">or click to select a file</p>
        </div>
      )}
    </div>
  );
};
