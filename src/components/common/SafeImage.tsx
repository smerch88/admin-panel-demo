"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackText = "No img",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle empty or invalid src
  if (!src || src.trim() === "" || hasError) {
    return (
      <div
        className={cn(
          "bg-gray-200 rounded border flex items-center justify-center",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-xs">{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-gray-200 rounded border flex items-center justify-center",
            className
          )}
        >
          <span className="text-gray-400 text-xs">Loading...</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover rounded border absolute w-full h-full top-0 right-0 bottom-0 left-0 object-cover object-center",
          className
        )}
        onError={e => {
          setHasError(true);
        }}
        onLoad={() => setIsLoading(false)}
        unoptimized={true}
        priority={false}
        quality={75}
      />
    </div>
  );
};
