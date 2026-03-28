"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Check, RotateCcw } from "lucide-react";

interface ImageCropperProps {
  file: File;
  onCrop: (blob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number; // width/height, default 16/9
}

export function ImageCropper({ file, onCrop, onCancel, aspectRatio = 16 / 9 }: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Canvas display size
  const CANVAS_WIDTH = 640;
  const CANVAS_HEIGHT = Math.round(CANVAS_WIDTH / aspectRatio);

  // Load image from file
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImg(image);
      // Calculate initial scale to cover the canvas
      const scaleX = CANVAS_WIDTH / image.width;
      const scaleY = CANVAS_HEIGHT / image.height;
      const initialScale = Math.max(scaleX, scaleY);
      setScale(initialScale);
      // Center the image
      setOffset({
        x: (CANVAS_WIDTH - image.width * initialScale) / 2,
        y: (CANVAS_HEIGHT - image.height * initialScale) / 2,
      });
    };
    image.src = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(image.src);
  }, [file, CANVAS_WIDTH, CANVAS_HEIGHT]);

  // Draw on canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw checkerboard background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the image
    ctx.drawImage(img, offset.x, offset.y, img.width * scale, img.height * scale);
  }, [img, scale, offset, CANVAS_WIDTH, CANVAS_HEIGHT]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Mouse/touch handling for pan
  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  // Zoom with scroll wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale((prev) => Math.max(0.1, prev + delta));
  };

  const zoomIn = () => setScale((prev) => prev + 0.1);
  const zoomOut = () => setScale((prev) => Math.max(0.1, prev - 0.1));

  const resetPosition = () => {
    if (!img) return;
    const scaleX = CANVAS_WIDTH / img.width;
    const scaleY = CANVAS_HEIGHT / img.height;
    const s = Math.max(scaleX, scaleY);
    setScale(s);
    setOffset({
      x: (CANVAS_WIDTH - img.width * s) / 2,
      y: (CANVAS_HEIGHT - img.height * s) / 2,
    });
  };

  // Crop and output
  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a high-res output canvas (2x for retina)
    const outputCanvas = document.createElement("canvas");
    const OUTPUT_WIDTH = 1280;
    const OUTPUT_HEIGHT = Math.round(OUTPUT_WIDTH / aspectRatio);
    outputCanvas.width = OUTPUT_WIDTH;
    outputCanvas.height = OUTPUT_HEIGHT;
    const ctx = outputCanvas.getContext("2d");
    if (!ctx || !img) return;

    // Scale factor between display canvas and output canvas
    const sf = OUTPUT_WIDTH / CANVAS_WIDTH;

    ctx.drawImage(img, offset.x * sf, offset.y * sf, img.width * scale * sf, img.height * scale * sf);

    outputCanvas.toBlob(
      (blob) => {
        if (blob) onCrop(blob);
      },
      "image/webp",
      0.9
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl border border-border max-w-[700px] w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-black text-lg">Crop Image (16:9)</h3>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col items-center gap-4">
          <div
            className="relative border-2 border-dashed border-primary/40 rounded-xl overflow-hidden bg-muted cursor-grab active:cursor-grabbing"
            style={{ width: "100%", maxWidth: CANVAS_WIDTH, aspectRatio: `${aspectRatio}` }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              style={{ width: "100%", height: "100%" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onWheel={handleWheel}
            />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={zoomOut} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors" title="Zoom Out">
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-sm font-bold text-foreground/60 w-16 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors" title="Zoom In">
              <ZoomIn className="h-5 w-5" />
            </button>
            <button onClick={resetPosition} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors ml-2" title="Reset">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-border">
          <button onClick={onCancel} className="px-5 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-muted transition-colors">
            Cancel
          </button>
          <button onClick={handleCrop} className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2">
            <Check className="h-4 w-4" /> Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
}
