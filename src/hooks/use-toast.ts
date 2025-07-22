
"use client"

import { useAppState } from "@/app/providers";
import { useLanguage } from "./use-language";
import type { NotificationType } from "@/components/ui/splashed-push-notifications";

interface ToastProps {
    type: NotificationType;
    message: string;
}

export function useToast() {
  const { toastRef } = useAppState();
  const { t, direction } = useLanguage();

  const toast = (props: ToastProps) => {
    const { type, message } = props;
    if (toastRef.current) {
        const title = t(`notification_title_${type}`) || type.charAt(0).toUpperCase() + type.slice(1);
        if (direction === 'rtl') {
            toastRef.current.createRtlNotification(type, title, message);
        } else {
            toastRef.current.createNotification(type, title, message);
        }
    }
  };

  return {
    toast,
  }
}
