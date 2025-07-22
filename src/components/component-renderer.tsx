
"use client";

import React, { useMemo, useEffect } from 'react';
import { getCircularTestimonialsCode } from './generators/circular-testimonials-generator';
import { getStackedTestimonialsCode } from './generators/stacked-testimonials-generator';

type Settings = Record<string, any>;

type ComponentCode = {
    html: string;
    css: string;
    js: string;
    fullCode: string;
}

const componentRenderers: Record<string, (settings: Settings) => ComponentCode> = {
  'circular-testimonials': getCircularTestimonialsCode,
  'stacked-testimonials': getStackedTestimonialsCode,
};

export const getComponentCode = (componentId: string, settings: Settings) => {
  const renderer = componentRenderers[componentId];
  if (renderer) {
    return renderer.call(null, settings);
  }
  return { html: '<div>Component not found</div>', css: '', js: '', fullCode: '' };
};

export function ComponentRenderer({ componentId, settings }: { componentId: string; settings: Settings }) {
  const { html, css, js } = useMemo(() => getComponentCode(componentId, settings), [componentId, settings]);

  useEffect(() => {
    // For JS execution in preview
    if (js) {
      try {
        const scriptId = 'component-preview-script';
        // Remove existing script to avoid duplicates on re-render
        let existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.id = scriptId;
        
        const executeJs = () => {
             // Clear any existing intervals from previous script runs
             if (window.autoplayInterval) {
                clearInterval(window.autoplayInterval);
             }
             // Wrap the provided JS in an IIFE to scope it.
             script.textContent = `(function() { ${js} })();`;
             document.body.appendChild(script);
        }
        
        // Check for necessary libraries and load if not present
        if (js.includes('gsap') && !window.gsap) {
            const gsapScript = document.createElement('script');
            gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
            gsapScript.onload = executeJs;
            document.head.appendChild(gsapScript);
        } else {
            executeJs();
        }
        
        return () => {
            const scriptToRemove = document.getElementById(scriptId);
            if(scriptToRemove) {
                scriptToRemove.remove();
            }
            if (window.autoplayInterval) {
                clearInterval(window.autoplayInterval);
            }
        };
      } catch (e) {
        console.error("Error executing preview script:", e);
      }
    }
  // Added settings as a dependency to re-run the effect when settings change
  }, [js, settings]);


  return (
    <>
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

declare global {
  interface Window {
    gsap?: any;
    autoplayInterval?: number;
  }
}
