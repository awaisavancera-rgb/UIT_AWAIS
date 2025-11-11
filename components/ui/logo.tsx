'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10 lg:h-12 lg:w-12',
    lg: 'h-16 w-16'
  };

  if (imageError) {
    // Fallback to text logo
    return (
      <div className={`${sizeClasses[size]} bg-primary rounded-xl flex items-center justify-center ${className}`}>
        <span className="text-primary-foreground font-bold text-xl lg:text-2xl">U</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <Image
        src="/images/uit-logo.png"
        alt="UIT University Logo"
        fill
        className="object-contain"
        onError={() => setImageError(true)}
        priority
      />
    </div>
  );
}