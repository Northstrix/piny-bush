
"use client";
import React, { useEffect, useState, useCallback } from "react";

export interface FloatingLabelInputProps {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  textarea?: boolean;
  isRTL?: boolean;
}

function detectRTL(text: string): boolean {
  return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);
}
function detectLabelDir(text: string): "rtl" | "ltr" {
  return detectRTL(text) ? "rtl" : "ltr";
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onValueChange,
  type = "text",
  autoComplete = "off",
  required = false,
  disabled = false,
  textarea = false,
  isRTL,
}) => {
  const [focused, setFocused] = useState(false);
  const [rtlInput, setRtlInput] = useState(isRTL ?? false);

  useEffect(() => {
    if (!value) setRtlInput(isRTL ?? false);
    else setRtlInput(detectRTL(value));
  }, [value, isRTL]);

  useEffect(() => {
    if (!value) setRtlInput(isRTL ?? false);
  }, [label, isRTL, value]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onValueChange(e.target.value);
    },
    [onValueChange]
  );

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  const hasValue = value.length > 0;
  const labelDir = detectLabelDir(label);

  const style: React.CSSProperties = {
    "--accent-color": "hsl(var(--primary))",
    "--mobile-form-input-bg": "hsl(var(--background))",
    "--input-outline": "hsl(var(--border))",
    "--input-outline-focus": "hsl(var(--input-focus-outline))",
    "--input-outline-width": "1.5px",
    "--foreground": "hsl(var(--foreground))",
    "--muted-foreground": "hsl(var(--muted-foreground))",
    "--parent-background": "hsl(var(--background))",
    "--general-rounding": "var(--radius)",
    "--floating-input-layout-text-area-height": "152px",
    "--input-padding": "17px",
    "--input-font-size": "1rem",
    "--label-font-size": "1rem",
    "--label-active-font-size": "12px",
    "--label-padding": "0 7px",
    "--label-active-padding": "0 6px",
    "--input-height": "49px",
  } as React.CSSProperties;

  return (
    <div
      className={[
        "mobile-form-group",
        rtlInput ? "rtl" : "",
        focused ? "active" : "",
        hasValue ? "has-value" : "",
        textarea ? "textarea" : "",
      ].join(" ")}
      style={style}
    >
      {textarea ? (
        <textarea
          className="mobile-form-input"
          required={required}
          value={value}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          dir={rtlInput ? "rtl" : "ltr"}
          spellCheck={false}
        />
      ) : (
        <input
          className="mobile-form-input"
          type={type}
          required={required}
          value={value}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          dir={rtlInput ? "rtl" : "ltr"}
          spellCheck={false}
        />
      )}
      <label
        className={"mobile-form-label" + (textarea ? " label-textarea" : "")}
        dir={labelDir}
      >
        {label}
      </label>
      <style jsx>{`
        .mobile-form-group {
          position: relative;
          width: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .mobile-form-input {
          width: 100%;
          height: var(--input-height);
          padding: var(--input-padding);
          font-size: var(--input-font-size);
          font-weight: 400;
          color: var(--foreground);
          background: var(--mobile-form-input-bg);
          border: var(--input-outline-width) solid var(--input-outline);
          border-radius: var(--general-rounding);
          outline: none;
          box-sizing: border-box;
          text-align: left;
          transition: border-color 0.3s, color 0.3s, background 0.3s;
          resize: none;
          line-height: 1.4;
        }
        .mobile-form-input:focus {
          border-color: var(--input-outline-focus);
        }
        .mobile-form-input:disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .mobile-form-group.rtl .mobile-form-input {
          direction: rtl;
          text-align: right;
        }
        .mobile-form-group.textarea .mobile-form-input {
          height: var(--floating-input-layout-text-area-height);
          overflow-y: auto;
        }
        .mobile-form-label {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted-foreground);
          font-size: var(--label-font-size);
          font-weight: 400;
          pointer-events: none;
          background: var(--parent-background);
          padding: var(--label-padding);
          transition: color 0.3s, background 0.3s, font-size 0.3s, top 0.3s, left 0.3s, right 0.3s, transform 0.3s;
          z-index: 2;
          max-width: calc(100% - 26px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mobile-form-group.rtl .mobile-form-label {
          right: 12px;
          left: auto;
          text-align: right;
        }
        /* Default (not active, not has-value) */
        .mobile-form-group:not(.active):not(.has-value) .mobile-form-label {
          top: 50%;
          transform: translateY(-50%);
          font-size: var(--label-font-size);
          color: var(--muted-foreground);
          background: var(--parent-background);
          padding: var(--label-padding);
        }
        /* Active (input focused) */
        .mobile-form-group.active .mobile-form-label,
        .mobile-form-group .mobile-form-input:focus + .mobile-form-label {
          top: 0;
          left: 12px;
          right: auto;
          font-size: var(--label-active-font-size);
          color: var(--accent-color);
          background: var(--parent-background);
          padding: var(--label-active-padding);
          transform: translateY(-50%);
          z-index: 2;
        }
        .mobile-form-group.rtl.active .mobile-form-label,
        .mobile-form-group.rtl .mobile-form-input:focus + .mobile-form-label {
          right: 12px;
          left: auto;
        }
        /* Has value but not active */
        .mobile-form-group.has-value:not(.active) .mobile-form-label {
          top: 0;
          left: 12px;
          right: auto;
          font-size: var(--label-active-font-size);
          color: var(--muted-foreground);
          background: var(--parent-background);
          padding: var(--label-active-padding);
          transform: translateY(-50%);
          z-index: 2;
        }
        .mobile-form-group.rtl.has-value:not(.active) .mobile-form-label {
          right: 12px;
          left: auto;
        }
        /* Textarea label placement */
        .mobile-form-group.textarea .mobile-form-label {
          left: 12px;
          right: auto;
          padding: var(--label-padding);
        }
        .mobile-form-group.textarea.rtl .mobile-form-label {
          right: 12px;
          left: auto;
        }
        .mobile-form-group.textarea:not(.active):not(.has-value) .mobile-form-label {
          top: 17px;
          left: 12px;
          right: auto;
          transform: none;
          font-size: var(--label-font-size);
          color: var(--muted-foreground);
          background: var(--parent-background);
          padding: var(--label-padding);
          text-align: left;
        }
        .mobile-form-group.textarea:not(.active):not(.has-value).rtl .mobile-form-label {
          right: 12px;
          left: auto;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default FloatingLabelInput;
