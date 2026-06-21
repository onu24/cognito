"use client";

import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

interface CloudinaryImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  crop?: boolean;
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "drkd4w5yw";
const cld = new Cloudinary({ cloud: { cloudName } });

export function getCloudinaryPublicId(url: string): string | null {
  if (!url || !url.includes("res.cloudinary.com")) return null;
  
  // Match the part after /image/upload/ (optionally followed by version like v12345678/) and before file extension/query
  const match = url.match(/\/image\/upload\/(?:v\d+\/)?([^?#]+)$/);
  if (match) {
    const path = match[1];
    const dotIndex = path.lastIndexOf(".");
    return dotIndex !== -1 ? path.substring(0, dotIndex) : path;
  }
  return null;
}

export function CloudinaryImage({ src, width, height, alt, className, crop = true, ...props }: CloudinaryImageProps) {
  const publicId = getCloudinaryPublicId(src);

  if (publicId) {
    let img = cld.image(publicId).format("auto").quality("auto");
    
    if (crop && width && height) {
      img = img.resize(auto().gravity(autoGravity()).width(width).height(height));
    }
    
    // We pass className and alt, and cast width/height to string for the DOM if needed, but AdvancedImage takes care of layout.
    return (
      <div className={className} style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%', position: 'relative' }}>
        <AdvancedImage cldImg={img} className="w-full h-full object-cover" alt={alt} />
      </div>
    );
  }

  // Fallback to standard img tag for non-Cloudinary images
  return <img src={src} width={width} height={height} alt={alt} className={className} {...props} />;
}
