
"use client";

import React from 'react';
import { Testimonial } from '@/lib/component-config';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import FloatingLabelInput from '../ui/FloatingLabelInput';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ChronicleButton from '../ui/ChronicleButton/ChronicleButton';

interface TestimonialArrayControlProps {
  value: Testimonial[];
  onChange: (value: Testimonial[]) => void;
}

export function TestimonialArrayControl({ value, onChange }: TestimonialArrayControlProps) {
  const { t, direction } = useLanguage();
  const isRtl = direction === 'rtl';

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      quote: 'This is a sample filler sentence that mimics the structure and rhythm of a customer review. It doesn’t convey any specific message, but it is here to demonstrate what a testimonial of this length might look like in layout. Feel free to replace this with any content that suits your needs or simply use it as a visual placeholder during design and development.',
      name: 'New Name',
      designation: 'New Designation',
      image: 'https://placehold.co/408x384.png',
    };
    onChange([...value, newTestimonial]);
  };

  const handleRemoveLastTestimonial = () => {
    if (value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleFieldChange = (
    id: string,
    field: keyof Omit<Testimonial, 'id'>,
    fieldValue: string
  ) => {
    onChange(value.map(t => t.id === id ? { ...t, [field]: fieldValue } : t));
  };

  const renderTestimonialCard = (testimonial: Testimonial, index: number) => {
    return (
      <Card key={testimonial.id} className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/50 py-3 px-4">
          <CardTitle className="text-base font-headline">
            {t('field_testimonial_n', { n: index + 1 }) || `Testimonial ${index + 1}`}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <FloatingLabelInput
            textarea
            label={t('field_testimonial_n_quote', { n: index + 1 }) || `Quote ${index + 1}`}
            value={testimonial.quote}
            onValueChange={(val) => handleFieldChange(testimonial.id, 'quote', val)}
            isRTL={isRtl}
          />
          <FloatingLabelInput
            label={t('field_testimonial_n_name', { n: index + 1 }) || `Name ${index + 1}`}
            value={testimonial.name}
            onValueChange={(val) => handleFieldChange(testimonial.id, 'name', val)}
            isRTL={isRtl}
          />
          <FloatingLabelInput
            label={t('field_testimonial_n_designation', { n: index + 1 }) || `Designation ${index + 1}`}
            value={testimonial.designation}
            onValueChange={(val) => handleFieldChange(testimonial.id, 'designation', val)}
            isRTL={isRtl}
          />
          <FloatingLabelInput
            label={t('field_testimonial_n_image', { n: index + 1 }) || `Image URL ${index + 1}`}
            value={testimonial.image}
            onValueChange={(val) => handleFieldChange(testimonial.id, 'image', val)}
            isRTL={isRtl}
          />
        </CardContent>
      </Card>
    );
  };

  const CancelButton = (
    <AlertDialogCancel asChild>
      <ChronicleButton variant="outline">
        {t('cancel_button') || 'Cancel'}
      </ChronicleButton>
    </AlertDialogCancel>
  );

  const RemoveButton = (
    <AlertDialogAction asChild>
      <ChronicleButton
        onClick={handleRemoveLastTestimonial}
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      >
        {t('remove_button') || 'Remove'}
      </ChronicleButton>
    </AlertDialogAction>
  );

  return (
    <div className="space-y-4">
      {value.map(renderTestimonialCard)}
      <Button variant="outline" onClick={handleAddTestimonial} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        {t('add_testimonial_button') || 'Add Testimonial'}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full" disabled={value.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t('remove_last_testimonial_button') || 'Delete Last Testimonial'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent dir={direction}>
          <AlertDialogHeader>
            <AlertDialogTitle isRtl={isRtl}>
              {t('remove_testimonial_confirm_title') || 'Are you sure?'}
            </AlertDialogTitle>
            <AlertDialogDescription isRtl={isRtl}>
              {t('remove_last_testimonial_confirm_desc') ||
                "This action can't be undone. This will permanently delete the last testimonial."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             {isRtl ? (
              <>
                {CancelButton}
                <div className="h-full" />
                {RemoveButton}
              </>
            ) : (
              <>
                {RemoveButton}
                {CancelButton}
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
