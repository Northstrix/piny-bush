
"use client";

import { useState, useRef, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComponentConfig } from "@/lib/component-config";
import { useLanguage } from "@/hooks/use-language";
import ChronicleButton from "@/components/ui/ChronicleButton/ChronicleButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EditorControls } from "./editor-controls";
import { LivePreview } from "./live-preview";
import { Download, Upload, ArrowLeft, PanelLeftClose, PanelRightClose, ArrowRight, RotateCw } from "lucide-react";
import { downloadCode } from "@/lib/file-utils";
import { getComponentCode } from "@/components/component-renderer";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { getComponentGenerators } from "@/components/generators";

type Settings = Record<string, string | number | boolean>;

const getInitialSettings = (config: ComponentConfig): Settings => {
  return config.fields.reduce((acc, field) => {
    acc[field.id] = field.defaultValue;
    return acc;
  }, {} as Settings);
};

const FloatingCollapsedIcon = ({ visible, onClick, isRtl }: { visible: boolean; onClick: () => void; isRtl: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.button
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.2, ease: "easeInOut" } }}
        exit={{ opacity: 0, y: -40, transition: { duration: 0.2, ease: "easeInOut" } }}
        aria-label="Show editor"
        onClick={onClick}
        className="fixed top-[14px] z-50 rounded-full border border-border bg-card text-foreground p-2 w-9 h-9 flex items-center justify-center cursor-pointer shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        style={isRtl ? { left: '1rem' } : { right: '1rem' }}
      >
        {isRtl ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
      </motion.button>
    )}
  </AnimatePresence>
);

const Credits = ({ componentId }: {componentId: string}) => {
    const { t, direction } = useLanguage();
    const isRtl = direction === 'rtl';

    const credits = useMemo(() => {
        const generator = getComponentGenerators()[componentId];
        return generator?.credits;
    }, [componentId]);

    if (!credits) return null;

    return (
        <div className="text-xs text-muted-foreground p-3">
             <h3 className={`font-headline mb-1 text-foreground font-semibold ${isRtl ? 'text-right' : 'text-left'}`}>{t('credit') || "Credit"}</h3>
             <div dir="ltr" className={isRtl ? 'text-right' : 'text-left'}>
                {credits}
            </div>
        </div>
    )
}

export function ComponentEditor({ componentConfig }: { componentConfig: ComponentConfig }) {
  const { t, language, direction } = useLanguage();
  const isRtl = direction === 'rtl';
  const [settings, setSettings] = useState<Settings>(() => getInitialSettings(componentConfig));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [previewKey, setPreviewKey] = useState(useId());

  const [collapsed, setCollapsed] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [showFloatingIcon, setShowFloatingIcon] = useState(false);

  const handleReloadPreview = () => {
    setPreviewKey(prev => prev + '1');
  };

  const handleCollapsedChange = (v: boolean) => {
    if (v) { // Collapsing
      setContentVisible(false);
      setTimeout(() => {
        setCollapsed(true);
        setTimeout(() => setShowFloatingIcon(true), 300);
      }, 300);
    } else { // Expanding
      setShowFloatingIcon(false);
      setCollapsed(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 300);
    }
    setTimeout(handleReloadPreview, 1000);
  };

  const handleSettingChange = (id: string, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
    handleReloadPreview(); // Force preview refresh on any change
  };

  const handleExportConfig = () => {
    trackEvent('export_config', { component_id: componentConfig.id, language });
    const jsonStr = JSON.stringify({ componentId: componentConfig.id, settings }, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${componentConfig.id}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCode = () => {
    const { fullCode } = getComponentCode(componentConfig.id, settings);
    trackEvent('export_code', { component_id: componentConfig.id, language });
    downloadCode(fullCode, componentConfig.id);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const data = JSON.parse(text);
          if (data.componentId === componentConfig.id && data.settings) {
            setSettings(data.settings);
            handleReloadPreview(); // Refresh preview after import
            trackEvent('import_config', { component_id: componentConfig.id, language, status: 'success' });
            toast({ type: 'success', message: t('config_imported_successfully') || 'Configuration imported successfully!' });
          } else {
            throw new Error("Invalid config file");
          }
        } catch (error) {
          trackEvent('import_config', { component_id: componentConfig.id, language, status: 'error' });
          toast({ type: 'error', message: t('config_import_error') || 'Error importing configuration. Invalid file.' });
        }
      };
      reader.readAsText(file);
    }
    event.target.value = "";
  };
  
  const sidebarVariants = {
    expanded: { width: '50%', opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    collapsed: { width: '0%', opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };
  
  const contentVariants = {
    visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.3, ease: "easeInOut" } },
    hidden: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3, ease: "easeInOut" } },
  }

  return (
    <>
    <FloatingCollapsedIcon visible={showFloatingIcon} onClick={() => handleCollapsedChange(false)} isRtl={isRtl} />
    <div className="flex flex-1 h-[calc(100vh-4rem)]">
       <motion.div
        initial="expanded"
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="overflow-y-auto"
      >
        <motion.div
            animate={contentVisible ? "visible" : "hidden"}
            variants={contentVariants}
            className="flex flex-col p-4 md:p-6 h-full"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <Link href="/components" passHref>
               <ChronicleButton variant="ghost">
                {isRtl ? (
                  <>
                    <ArrowRight className="h-[1em] w-[1em]" />
                    {t('back_to_components') || 'Back to Components'}
                  </>
                ) : (
                  <>
                    <ArrowLeft className="h-[1em] w-[1em]" />
                    {t('back_to_components') || 'Back to Components'}
                  </>
                )}
              </ChronicleButton>
            </Link>
            <div className="flex gap-2 flex-wrap justify-end">
              <ChronicleButton variant="outline" onClick={handleImportClick}>
                <Upload className="h-[1em] w-[1em]" /> {t('import_config') || 'Import Config'}
              </ChronicleButton>
              <input type="file" ref={fileInputRef} onChange={handleFileImport} className="hidden" accept=".json" />
              <ChronicleButton variant="outline" onClick={handleExportConfig}>
                <Download className="h-[1em] w-[1em]" /> {t('export_config') || 'Export Config'}
              </ChronicleButton>
              <ChronicleButton onClick={handleExportCode}>
                <Download className="h-[1em] w-[1em]" /> {t('export_code') || 'Export Code'}
              </ChronicleButton>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline mb-1">{t(componentConfig.nameKey) || componentConfig.nameKey.replace(/_/g, ' ')}</h1>
                <p className="text-muted-foreground mb-6">{t('component_settings') || 'Component Settings'}</p>
            </div>
            <ChronicleButton variant="ghost" onClick={() => handleCollapsedChange(true)}>
              {isRtl ? <PanelRightClose className="h-[1em] w-[1em]" /> : <PanelLeftClose className="h-[1em] w-[1em]" />}
            </ChronicleButton>
          </div>
          <EditorControls
            fields={componentConfig.fields}
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        </motion.div>
      </motion.div>
      
      <div className="bg-muted/40 p-4 md:p-6 flex flex-col flex-1">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-headline">{t('live_preview') || 'Live Preview'}</CardTitle>
            <ChronicleButton variant="outline" size="sm" onClick={handleReloadPreview} aria-label="Reload Preview">
              <RotateCw className="h-[1em] w-[1em]" />
            </ChronicleButton>
          </CardHeader>
          <CardContent className="flex-1">
            <LivePreview key={`${previewKey}-${collapsed}-${language}`} componentId={componentConfig.id} settings={settings} />
          </CardContent>
        </Card>
        <Credits componentId={componentConfig.id} />
      </div>
    </div>
    </>
  );
}
