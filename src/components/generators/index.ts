import React from 'react';
import { getCircularTestimonialsGenerator } from './circular-testimonials-generator';
import { getStackedTestimonialsGenerator } from './stacked-testimonials-generator';

export interface ComponentGenerator {
    credits?: React.ReactNode;
}

export const getComponentGenerators = (): Record<string, ComponentGenerator> => ({
    'circular-testimonials': getCircularTestimonialsGenerator(),
    'stacked-testimonials': getStackedTestimonialsGenerator(),
});
