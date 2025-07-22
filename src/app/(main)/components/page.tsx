
"use client";

import Link from "next/link";
import { componentsConfig } from "@/lib/component-config";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getComponentIcon } from "@/lib/component-icons";

export default function ComponentsPage() {
  const { t, language, direction } = useLanguage();
  const isRtl = direction === 'rtl';

  const handleComponentSelect = (componentId: string) => {
    trackEvent('select_component', { component_id: componentId, language });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline text-primary">{t('select_component_title') || 'Select a Component'}</h1>
        <p className="mt-2 text-lg text-foreground/80">{t('select_component_description') || 'Choose a component from the list below to start editing.'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {componentsConfig.map((component) => {
          const Icon = getComponentIcon(component.id);
          return (
            <Link href={`/editor/${component.id}`} key={component.id} onClick={() => handleComponentSelect(component.id)} passHref>
              <Card className="h-full flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-primary">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-headline text-xl">{t(component.nameKey) || component.nameKey.replace(/_/g, ' ')}</CardTitle>
                      <CardDescription className="mt-1">{t(component.descriptionKey) || component.descriptionKey?.replace(/_/g, ' ')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <div className="p-6 pt-0 flex justify-end items-center text-primary font-semibold">
                  {t('start_editing_button') || 'Start Editing'}
                  {isRtl ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
