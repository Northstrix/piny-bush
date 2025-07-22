
"use client";

import React from "react";
import { LucideProps, MessageSquareQuote, Users } from "lucide-react";

export const componentIcons: Record<string, React.ComponentType<LucideProps>> = {
  'circular-testimonials': MessageSquareQuote,
  'stacked-testimonials': Users,
};

export const getComponentIcon = (id: string) => {
    return componentIcons[id] || 'div';
}
