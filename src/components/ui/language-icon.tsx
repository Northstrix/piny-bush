"use client";
import React from 'react';
import Image from 'next/image';
import LanguageIconPng from '@/LanguageIcon.png';

interface LanguageIconProps {
  width?: number; // Width of the square container
}

const LanguageIcon: React.FC<LanguageIconProps> = ({ width = 26 }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${width}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src={LanguageIconPng}
        alt="Change Language"
        width={356}
        height={182}
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
        unoptimized
      />
    </div>
  );
};

export default LanguageIcon;
