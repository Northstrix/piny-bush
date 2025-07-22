
import type { LucideProps } from "lucide-react";
import React from "react";

export interface ComponentFieldOption {
  value: string;
  labelKey: string;
}

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  designation: string;
  image: string;
};

export interface ComponentField {
  id: string;
  labelKey: string;
  type: 'text' | 'textarea' | 'color' | 'select' | 'switch' | 'slider' | 'testimonials';
  defaultValue: string | boolean | number | Testimonial[];
  options?: ComponentFieldOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ComponentConfig {
  id: string;
  nameKey: string;
  descriptionKey?: string;
  fields: ComponentField[];
}

export const componentsConfig: ComponentConfig[] = [
  {
    id: 'circular-testimonials',
    nameKey: 'component_circular_testimonials_name',
    descriptionKey: 'circular_testimonials_description',
    fields: [
      // Testimonial 1
      { id: 'quote1', labelKey: 'field_testimonial_1_quote', type: 'textarea', defaultValue: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!" },
      { id: 'name1', labelKey: 'field_testimonial_1_name', type: 'text', defaultValue: 'Tamar Mendelson' },
      { id: 'designation1', labelKey: 'field_testimonial_1_designation', type: 'text', defaultValue: 'Restaurant Critic' },
      { id: 'image1', labelKey: 'field_testimonial_1_image', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      // Testimonial 2
      { id: 'quote2', labelKey: 'field_testimonial_2_quote', type: 'textarea', defaultValue: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience." },
      { id: 'name2', labelKey: 'field_testimonial_2_name', type: 'text', defaultValue: 'Joe Charlescraft' },
      { id: 'designation2', labelKey: 'field_testimonial_2_designation', type: 'text', defaultValue: 'Frequent Visitor' },
      { id: 'image2', labelKey: 'field_testimonial_2_image', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      // Testimonial 3
      { id: 'quote3', labelKey: 'field_testimonial_3_quote', type: 'textarea', defaultValue: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!" },
      { id: 'name3', labelKey: 'field_testimonial_3_name', type: 'text', defaultValue: 'Martina Edelweist' },
      { id: 'designation3', labelKey: 'field_testimonial_3_designation', type: 'text', defaultValue: 'Satisfied Customer' },
      { id: 'image3', labelKey: 'field_testimonial_3_image', type: 'text', defaultValue: 'https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      // Styling
      { id: 'autoplay', labelKey: 'field_autoplay', type: 'switch', defaultValue: true },
      { id: 'imageBorderRadius', labelKey: 'field_image_border_radius', type: 'slider', defaultValue: 24, min: 0, max: 150, step: 1 },
      { id: 'nameColor', labelKey: 'field_name_color', type: 'color', defaultValue: '#000000' },
      { id: 'designationColor', labelKey: 'field_designation_color', type: 'color', defaultValue: '#6b7280' },
      { id: 'quoteColor', labelKey: 'field_quote_color', type: 'color', defaultValue: '#4b5563' },
      { id: 'arrowBg', labelKey: 'field_arrow_background', type: 'color', defaultValue: '#141414' },
      { id: 'arrowFg', labelKey: 'field_arrow_foreground', type: 'color', defaultValue: '#f1f1f7' },
      { id: 'arrowHoverBg', labelKey: 'field_arrow_hover_background', type: 'color', defaultValue: '#00a6fb' },
      { id: 'nameFontSize', labelKey: 'field_name_font_size', type: 'slider', defaultValue: 24, min: 12, max: 48, step: 1 },
      { id: 'designationFontSize', labelKey: 'field_designation_font_size', type: 'slider', defaultValue: 15, min: 10, max: 24, step: 1 },
      { id: 'quoteFontSize', labelKey: 'field_quote_font_size', type: 'slider', defaultValue: 18, min: 12, max: 32, step: 1 },
      { id: 'arrowSize', labelKey: 'field_arrow_size', type: 'slider', defaultValue: 28, min: 20, max: 60, step: 1 },
    ],
  },
  {
    id: 'stacked-testimonials',
    nameKey: 'component_stacked_testimonials_name',
    descriptionKey: 'stacked_testimonials_description',
    fields: [
      { id: 'testimonials', labelKey: 'field_testimonials', type: 'testimonials', defaultValue: [
        { id: '1', quote: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!", name: 'Tamar Mendelson', designation: 'Restaurant Critic', image: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '2', quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.", name: 'Joe Charlescraft', designation: 'Frequent Visitor', image: 'https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '3', quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!", name: 'Martina Edelweist', designation: 'Satisfied Customer', image: 'https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '4', quote: "Every visit feels like coming home. The whole place is warm and welcoming, the food consistently delights, and the service never fails to impress. It's evident the team truly cares about customer experience.", name: 'Andy White', designation: 'Frequent Visitor', image: 'https://images.unsplash.com/photo-1677159828965-3b852a9eeabf?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '5', quote: "It’s hard to find a spot that checks all the boxes — but this one does. Beautiful setting, warm staff, and food that surprises in the best way. I’ve visited multiple times, and each time feels fresh and exciting. A standout, for sure!", name: 'Ness Nacht', designation: 'Frequent Visitor', image: 'https://images.unsplash.com/photo-1729100221675-2402ee6f2fea?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      ]},
      { id: 'autoplay', labelKey: 'field_autoplay', type: 'switch', defaultValue: true },
      { id: 'imageBorderRadius', labelKey: 'field_image_border_radius', type: 'slider', defaultValue: 24, min: 0, max: 150, step: 1 },
      { id: 'nameColor', labelKey: 'field_name_color', type: 'color', defaultValue: '#000000' },
      { id: 'designationColor', labelKey: 'field_designation_color', type: 'color', defaultValue: '#6b7280' },
      { id: 'quoteColor', labelKey: 'field_quote_color', type: 'color', defaultValue: '#4b5563' },
      { id: 'arrowBg', labelKey: 'field_arrow_background', type: 'color', defaultValue: '#141414' },
      { id: 'arrowFg', labelKey: 'field_arrow_foreground', type: 'color', defaultValue: '#f1f1f7' },
      { id: 'arrowHoverBg', labelKey: 'field_arrow_hover_background', type: 'color', defaultValue: '#00a6fb' },
      { id: 'nameFontSize', labelKey: 'field_name_font_size', type: 'slider', defaultValue: 24, min: 12, max: 48, step: 1 },
      { id: 'designationFontSize', labelKey: 'field_designation_font_size', type: 'slider', defaultValue: 14, min: 10, max: 24, step: 1 },
      { id: 'quoteFontSize', labelKey: 'field_quote_font_size', type: 'slider', defaultValue: 18, min: 12, max: 32, step: 1 },
      { id: 'arrowSize', labelKey: 'field_arrow_size', type: 'slider', defaultValue: 28, min: 20, max: 60, step: 1 },
    ],
  }
];
