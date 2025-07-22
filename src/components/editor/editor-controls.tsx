
"use client";

import React from 'react';
import { ComponentField, Testimonial } from "@/lib/component-config";
import { useLanguage } from "@/hooks/use-language";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { BackgroundPicker } from "./background-picker";
import { ColorPicker, type ColorPickerValue } from "@/components/ui/color-picker";
import { Button } from "../ui/button";
import CustomCheckbox from '../ui/CustomCheckbox';
import { TestimonialArrayControl } from './testimonial-array-control';

interface EditorControlsProps {
  fields: ComponentField[];
  settings: Record<string, any>;
  onSettingChange: (id: string, value: any) => void;
}

export function EditorControls({ fields, settings, onSettingChange }: EditorControlsProps) {
  const { t, direction, language } = useLanguage();
  const isRtl = direction === 'rtl';
  const [accentColor, setAccentColor] = React.useState('#0391E8');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n: number) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        
        const parts = color.split(' ');
        if (parts.length >= 2) {
            const h = parseFloat(parts[0]);
            const s = parseFloat(parts[1].replace('%',''));
            const l = parseFloat(parts.length > 2 ? parts[2].replace('%','') : '50'); // handle case where lightness is missing in HSL string
            if(!isNaN(h) && !isNaN(s) && !isNaN(l)) {
              setAccentColor(hslToHex(h,s,l));
            }
        }
      }
    }
  }, []);


  return (
    <div className="space-y-6">
      {fields.map((field) => {
        const value = settings[field.id];

        const getLabel = () => {
          let labelText = field.labelKey;
          if (labelText.includes('_n_')) {
              const testimonialNumber = field.id.replace( /^\D+/g, '').charAt(0);
              labelText = labelText.replace('_n_', `_${testimonialNumber}_`);
          }
          return t(labelText) || field.labelKey.replace(/_/g, ' ');
        }

        if (field.id === 'backgroundColor') {
          return (
            <BackgroundPicker
              key={field.id}
              label={getLabel()}
              value={value}
              onChange={(val) => onSettingChange(field.id, val)}
            />
          );
        }

        if (field.type === 'testimonials') {
          return (
            <TestimonialArrayControl
              key={field.id}
              value={value}
              onChange={(val: Testimonial[]) => onSettingChange(field.id, val)}
            />
          );
        }

        const renderControl = () => {
          switch (field.type) {
            case "text":
              return (
                 <FloatingLabelInput
                  label={getLabel()}
                  value={value}
                  onValueChange={(val) => onSettingChange(field.id, val)}
                  isRTL={direction === 'rtl'}
                />
              );
            case "textarea":
               return (
                 <FloatingLabelInput
                  textarea
                  label={getLabel()}
                  value={value}
                  onValueChange={(val) => onSettingChange(field.id, val)}
                  isRTL={direction === 'rtl'}
                />
              );
            case "color":
              return (
                <div className="grid w-full items-center gap-1.5">
                   <Label htmlFor={field.id} className="font-semibold text-sm text-muted-foreground">{getLabel()}</Label>
                   <ColorPicker
                      value={value}
                      onValueChange={(color: ColorPickerValue) => onSettingChange(field.id, color.hex)}
                    >
                      <Button variant="outline" className="flex items-center gap-2 w-full justify-start">
                        <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: value }} />
                        <span>{value}</span>
                      </Button>
                    </ColorPicker>
                </div>
              );
            case "select":
              return (
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor={field.id} className="font-semibold text-sm text-muted-foreground">{getLabel()}</Label>
                    <Select value={value} onValueChange={(val) => onSettingChange(field.id, val)}>
                      <SelectTrigger id={field.id}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {t(opt.labelKey) || opt.labelKey.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                 </div>
              );
            case "switch":
               return (
                  <div className="flex items-center justify-between rounded-lg border p-3">
                     <CustomCheckbox
                        checked={value}
                        onChange={(checked) => onSettingChange(field.id, checked)}
                        label={<span className="font-semibold">{getLabel()}</span>}
                        direction={direction}
                        accentColor={accentColor}
                        mirrorCheckmark={language === 'ar'}
                      />
                  </div>
              );
            case "slider":
              return (
                <div className="grid w-full items-center gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor={field.id} className="font-semibold text-sm text-muted-foreground">{getLabel()}</Label>
                    <span className="text-sm text-muted-foreground w-12 text-right">{value}px</span>
                  </div>
                  <Slider
                    id={field.id}
                    value={[value]}
                    onValueChange={([val]) => onSettingChange(field.id, val)}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    inverted={isRtl}
                  />
                </div>
              );
            default:
              return null;
          }
        };

        const control = renderControl();
        if (field.type === 'text' || field.type === 'textarea') {
            return <div key={field.id}>{control}</div>;
        }
        
        if (['color', 'select', 'switch', 'slider'].includes(field.type)) {
            return <div key={field.id}>{control}</div>;
        }

        return (
          <div key={field.id} className="grid w-full items-center gap-1.5">
            <Label htmlFor={field.id} className="font-semibold">{getLabel()}</Label>
            {control}
          </div>
        );
      })}
      <div style={{ height: '72px' }} />
    </div>
  );
}
