"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Trash, UploadCloud, Loader2, Crop } from "lucide-react";
import { ImageCropper } from "./ImageCropper";
import { Button } from "./button";

interface CategoryImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function CategoryImageUpload({ value, onChange, onRemove }: CategoryImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [cropFile, setCropFile] = useState<File | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "najmi-preset";

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setCropFile(acceptedFiles[0]);
  }, []);

  const handleCrop = async (blob: Blob) => {
    setCropFile(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", blob, "cropped.webp");
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
      <div className="mb-4">
        <div className="relative w-full rounded-xl overflow-hidden bg-muted border" style={{ aspectRatio: "16/9" }}>
          <div className="z-10 absolute top-2 right-2">
            <Button type="button" onClick={onRemove} variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <img className="w-full h-full object-cover" alt="Category Image" src={value} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
        }`}
        style={{ aspectRatio: "16/9" }}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p className="font-medium">Uploading cropped image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Crop className="h-10 w-10 mb-4" />
            <p className="text-sm font-bold mb-1">
              {isDragActive ? "Drop image to crop" : "Drop an image for 16:9 crop"}
            </p>
            <p className="text-xs text-muted-foreground">or click to select</p>
          </div>
        )}
      </div>

      {cropFile && (
        <ImageCropper
          file={cropFile}
          onCrop={handleCrop}
          onCancel={() => setCropFile(null)}
          aspectRatio={16 / 9}
        />
      )}
    </>
  );
}
