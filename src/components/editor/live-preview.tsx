"use client";

import { ComponentRenderer } from "@/components/component-renderer";

interface LivePreviewProps {
  componentId: string;
  settings: Record<string, any>;
}

export function LivePreview({ componentId, settings }: LivePreviewProps) {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-inner border border-border">
      <div className="p-4 w-full h-full flex items-center justify-center" dir="ltr">
        <ComponentRenderer componentId={componentId} settings={settings} />
      </div>
    </div>
  );
}
