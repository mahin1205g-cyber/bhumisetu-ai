import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QRCodeCanvas({ value, size = 120, label = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 1,
        color: {
          dark: '#0b462d',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) console.error("QR Code generation error:", error);
      });
    }
  }, [value, size]);

  return (
    <div className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-lg border border-gray-200 shadow-sm inline-block">
      <canvas ref={canvasRef} className="rounded" />
      {label && (
        <span className="text-[10px] text-gray-500 font-mono tracking-tight text-center max-w-[140px] truncate">
          {label}
        </span>
      )}
    </div>
  );
}
