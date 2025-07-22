
"use client";
import React from 'react';
import Image from 'next/image';
import Logo from '@/logo.jpg';

interface AppLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ width = 32, height = 32, className }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      className={className}
    >
      <Image
        src={Logo}
        alt="Piny Bush Logo"
        width={width}
        height={height}
        className="rounded-sm"
        unoptimized
      />
    </div>
  );
};

export default AppLogo;
