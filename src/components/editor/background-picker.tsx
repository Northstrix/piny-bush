
"use client";

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { X, Plus } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { ColorPicker, type ColorPickerValue } from '@/components/ui/color-picker';

interface GradientColor {
  id: number;
  color: string;
  position: number;
}

interface BackgroundPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const parseGradient = (value: string): { type: 'linear' | 'radial', angle: number, colors: GradientColor[] } => {
  const defaultState = { type: 'linear' as 'linear' | 'radial', angle: 90, colors: [{ id: 1, color: '#388e3c', position: 0 }, { id: 2, color: '#fdd835', position: 100 }] };
  if (!value || !value.includes('gradient')) return defaultState;

  try {
    const typeMatch = value.match(/^(linear|radial)-gradient/);
    const type = (typeMatch ? typeMatch[1] : 'linear') as 'linear' | 'radial';
    
    const args = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
    let parts = args.split(/,(?![^(]*\))/); // Split by comma, but not inside color functions like rgba()
    
    let angle = 90;
    if (type === 'linear' && parts[0].includes('deg')) {
      angle = parseInt(parts.shift() || '90', 10);
    }

    if (type === 'radial' && !parts[0].includes('rgb') && !parts[0].startsWith('#')) {
      // This part handles keywords like 'circle', 'ellipse', 'farthest-corner', etc.
      // We can just filter it out for our color parsing.
      parts.shift();
    }
    
    const colors: GradientColor[] = parts.map((part, index) => {
      const trimmedPart = part.trim();
      const colorMatch = trimmedPart.match(/(rgba?\(.*?\)|#[\da-fA-F]{3,8})/);
      const color = colorMatch ? colorMatch[0] : '#000000';
      const positionMatch = trimmedPart.match(/(\d+)%$/);
      const position = positionMatch ? parseInt(positionMatch[1], 10) : (index / (parts.length - 1)) * 100;
      return { id: Date.now() + index, color, position };
    });

    if (colors.length < 2) return defaultState;
    
    return { type, angle, colors };
  } catch (e) {
    return defaultState;
  }
};

const generateGradientString = (state: { type: 'linear' | 'radial', angle: number, colors: GradientColor[] }) => {
    const colorStops = state.colors
      .map(c => `${c.color} ${c.position}%`)
      .join(', ');

    if (state.type === 'linear') {
      return `linear-gradient(${state.angle}deg, ${colorStops})`;
    } else {
      return `radial-gradient(circle, ${colorStops})`;
    }
}


export function BackgroundPicker({ label, value, onChange }: BackgroundPickerProps) {
  const { direction } = useLanguage();
  const isRtl = direction === 'rtl';
  const isGradient = value && value.includes('gradient');
  const [activeTab, setActiveTab] = useState(isGradient ? 'gradient' : 'solid');
  
  const [solidColor, setSolidColor] = useState(isGradient ? '#ffffff' : value);
  const [gradientState, setGradientState] = useState(() => parseGradient(value));

  useEffect(() => {
    if (isGradient) {
      setGradientState(parseGradient(value));
      setActiveTab('gradient');
    } else {
      setSolidColor(value);
      setActiveTab('solid');
    }
  }, [value, isGradient]);

  const handleFinalGradientChange = () => {
    const newValue = generateGradientString(gradientState);
    onChange(newValue);
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'solid') {
      onChange(solidColor);
    } else {
      const newValue = generateGradientString(gradientState);
      onChange(newValue);
    }
  };

  const handleColorChange = (id: number, newColor: string) => {
    const newColors = gradientState.colors.map(c => c.id === id ? { ...c, color: newColor } : c);
    const newState = { ...gradientState, colors: newColors };
    setGradientState(newState);
    onChange(generateGradientString(newState));
  };
  
  const handlePositionChange = (id: number, newPosition: number) => {
    const newColors = gradientState.colors.map(c => c.id === id ? { ...c, position: newPosition } : c);
    setGradientState({ ...gradientState, colors: newColors });
  }

  const addColor = () => {
    const newColor: GradientColor = { id: Date.now(), color: '#ffffff', position: 100 };
    const newColors = [...gradientState.colors, newColor];
    const newState = { ...gradientState, colors: newColors };
    setGradientState(newState);
    onChange(generateGradientString(newState));
  };

  const removeColor = (id: number) => {
    if (gradientState.colors.length <= 2) return;
    const newColors = gradientState.colors.filter(c => c.id !== id);
    const newState = { ...gradientState, colors: newColors };
    setGradientState(newState);
    onChange(generateGradientString(newState));
  };

  const handleAngleChange = (newAngle: number) => {
      setGradientState({...gradientState, angle: newAngle});
  }
  
  const handleTypeChange = (newType: 'linear' | 'radial') => {
      const newState = {...gradientState, type: newType};
      setGradientState(newState);
      onChange(generateGradientString(newState));
  }


  return (
    <div className="space-y-2 rounded-lg border p-3">
      <Label className="font-semibold text-sm">{label}</Label>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solid">Solid</TabsTrigger>
          <TabsTrigger value="gradient">Gradient</TabsTrigger>
        </TabsList>
        <TabsContent value="solid" className="pt-2">
           <ColorPicker
              value={solidColor}
              onValueChange={(color: ColorPickerValue) => {
                setSolidColor(color.hex);
                onChange(color.hex);
              }}
            >
              <Button variant="outline" className="flex items-center gap-2 w-full justify-start">
                <div className="w-6 h-6 rounded-md border" style={{ backgroundColor: solidColor }} />
                <span>{solidColor}</span>
              </Button>
            </ColorPicker>
        </TabsContent>
        <TabsContent value="gradient" className="space-y-4 pt-2">
          <Tabs value={gradientState.type} onValueChange={(type) => handleTypeChange(type as 'linear' | 'radial' )}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="linear">Linear</TabsTrigger>
              <TabsTrigger value="radial">Radial</TabsTrigger>
            </TabsList>
          </Tabs>

          {gradientState.type === 'linear' && (
            <div className="space-y-2">
              <Label>Angle</Label>
               <div className="flex items-center gap-2">
                <Slider
                  value={[gradientState.angle]}
                  onValueChange={([val]) => handleAngleChange(val)}
                  onValueCommit={handleFinalGradientChange}
                  min={0} max={360} step={1}
                  inverted={isRtl}
                />
                <span className="text-sm text-muted-foreground w-12 text-right">{gradientState.angle}°</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="space-y-2">
              {gradientState.colors.map((c) => (
                <div key={c.id} className="flex items-center gap-2 p-2 rounded-md border">
                  <ColorPicker
                      value={c.color}
                      onValueChange={(color: ColorPickerValue) => handleColorChange(c.id, color.hex)}
                    >
                      <Button variant="outline" size="icon" className="w-10 h-10 p-1">
                         <div className="w-full h-full rounded-sm" style={{ backgroundColor: c.color }} />
                      </Button>
                  </ColorPicker>
                  <div className="flex-1 space-y-1">
                     <Slider 
                        value={[c.position]} 
                        onValueChange={([val]) => handlePositionChange(c.id, val)}
                        onValueCommit={handleFinalGradientChange}
                        min={0} max={100} step={1}
                        inverted={isRtl} 
                     />
                     <div className="text-xs text-right text-muted-foreground">{c.position}%</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeColor(c.id)} disabled={gradientState.colors.length <= 2}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addColor} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Color
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
