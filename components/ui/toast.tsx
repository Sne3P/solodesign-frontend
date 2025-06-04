"use client";

import React, { useEffect, useState } from "react";
import { useToast, Toast as ToastType } from "@/lib/hooks/useToast";

const iconMap = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

const colorMap = {
  success: "border-green-500/20 bg-green-500/10 text-green-700",
  error: "border-red-500/20 bg-red-500/10 text-red-700",
  warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-700",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-700",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastType;
  onDismiss: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(onDismiss, 300);
  };

  return React.createElement(
    "div",
    {
      className: `
        relative overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300
        ${colorMap[toast.type]}
        ${
          isVisible && !isExiting
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }
        shadow-lg hover:shadow-xl
        min-w-[300px] max-w-[500px]
      `,
    },
    React.createElement("div", {
      className: "absolute inset-0 bg-white/5 backdrop-blur-sm",
    }),
    React.createElement(
      "div",
      { className: "relative p-4" },
      React.createElement(
        "div",
        { className: "flex items-start gap-3" },
        React.createElement(
          "div",
          {
            className:
              "flex-shrink-0 w-6 h-6 rounded-full bg-current/10 flex items-center justify-center text-sm font-bold",
          },
          iconMap[toast.type]
        ),
        React.createElement(
          "div",
          { className: "flex-1 min-w-0" },
          React.createElement(
            "h4",
            { className: "font-semibold text-sm leading-5" },
            toast.title
          ),
          toast.description &&
            React.createElement(
              "p",
              { className: "mt-1 text-xs opacity-80 leading-4" },
              toast.description
            ),
          toast.action &&
            React.createElement(
              "button",
              {
                onClick: toast.action.onClick,
                className:
                  "mt-2 text-xs font-medium underline hover:no-underline transition-all",
              },
              toast.action.label
            )
        ),
        React.createElement(
          "button",
          {
            onClick: handleDismiss,
            className:
              "flex-shrink-0 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors",
          },
          "×"
        )
      )
    ),
    React.createElement("div", {
      className:
        "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30",
    })
  );
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return React.createElement(
    "div",
    { className: "fixed top-4 right-4 z-50 space-y-2" },
    toasts.map((toast) =>
      React.createElement(ToastItem, {
        key: toast.id,
        toast,
        onDismiss: () => dismissToast(toast.id),
      })
    )
  );
}
