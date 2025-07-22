import { componentsConfig } from "@/lib/component-config";
import { ComponentEditor } from "@/components/editor/component-editor";
import { notFound } from "next/navigation";

export default function EditorPage({ params }: { params: { component: string } }) {
  const componentConfig = componentsConfig.find(c => c.id === params.component);

  if (!componentConfig) {
    notFound();
  }

  return <ComponentEditor componentConfig={componentConfig} />;
}

export async function generateStaticParams() {
  return componentsConfig.map((component) => ({
    component: component.id,
  }));
}
