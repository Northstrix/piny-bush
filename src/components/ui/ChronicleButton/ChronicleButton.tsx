'use client'
import React, { useEffect, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// CSS injected once, scoped
const styles = `
.chronicleButton {
  border-radius: var(--radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border: 1px solid transparent;
  font-weight: 500;
  transition:
    background 0.3s ease-in-out,
    color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
  position: relative;
  height: 2.5rem;
  overflow: hidden;
  gap: 0.5rem;
}

/* Variant logic - uses right tokens */
.chronicleButton.variant-default {
  background: hsl(var(--foreground));
  color: hsl(var(--background));
}
.chronicleButton.variant-default:hover {
  background: hsl(var(--accent-raw));
  color: hsl(var(--foreground-raw));
}
.chronicleButton.variant-outline {
  background: transparent;
  border-color: hsl(var(--border));
  color: hsl(var(--foreground));
}
.chronicleButton.variant-outline:hover {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
.chronicleButton.variant-ghost {
  background: transparent;
  color: hsl(var(--foreground));
  border-color: transparent;
}
.chronicleButton.variant-ghost:hover {
  background: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
/* Sizes */
.chronicleButton.size-lg {
  height: 2.75rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.125rem;
}
.chronicleButton.size-sm {
  height: 2.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

/* Flip animation */
.chronicleButton .flip-wrapper {
  position: relative;
  display: block;
  perspective: 108px;
}
.chronicleButton .flip-wrapper span {
  display: block;
}
.chronicleButton .flip-wrapper span:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 0;
}
.chronicleButton .flip-wrapper em {
  font-style: normal;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  will-change: transform, opacity;
  transition:
    color 0.3s ease-in-out,
    transform 0.55s cubic-bezier(.645,.045,.355,1),
    opacity 0.35s linear 0.2s;
}
.chronicleButton .flip-wrapper span:nth-of-type(1) em {
  transform-origin: top;
  opacity: 1;
  transform: rotateX(0deg);
}
.chronicleButton .flip-wrapper span:nth-of-type(2) em {
  opacity: 0;
  transform: rotateX(-90deg) scaleX(.9) translate3d(0,10px,0);
  transform-origin: bottom;
}
.chronicleButton:hover .flip-wrapper span:nth-of-type(1) em {
  opacity: 0;
  transform: rotateX(90deg) scaleX(.9) translate3d(0,-10px,0);
}
.chronicleButton:hover .flip-wrapper span:nth-of-type(2) em {
  opacity: 1;
  transform: rotateX(0deg) scaleX(1) translateZ(0);
  transition:
    color 0.3s ease-in-out,
    transform 0.75s cubic-bezier(.645,.045,.355,1),
    opacity 0.35s linear 0.3s;
}
`

interface ChronicleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Separates icon + text, assumes text is last (icon + space preserved)
 */
function separateContent(children: ReactNode): [ReactNode, ReactNode] {
  if (typeof children === 'string' || typeof children === 'number') {
    return [null, children]
  }

  if (Array.isArray(children)) {
    const textChildren = children.filter(c => typeof c === 'string');
    const iconChildren = children.filter(c => typeof c !== 'string');
    return [iconChildren, textChildren];
  }

  return [null, children]
}

const ChronicleButton = React.forwardRef<HTMLButtonElement, ChronicleButtonProps>(
  ({ children, variant = 'default', size = 'default', className, ...props }, ref) => {
    // Inject styles once
    useEffect(() => {
      const existing = document.getElementById('chronicle-button-style')
      if (!existing) {
        const style = document.createElement('style')
        style.id = 'chronicle-button-style'
        style.innerHTML = styles
        document.head.appendChild(style)
      }
    }, [])

    const buttonClasses = cn(
      'chronicleButton',
      `variant-${variant}`,
      size !== 'default' && `size-${size}`,
      className
    )

    const [icon, text] = separateContent(children)

    return (
      <button ref={ref} className={buttonClasses} type="button" {...props}>
        {variant === 'default' ? (
          <span className="flip-wrapper">
            <span>
              <em>
                {icon}
                {text}
              </em>
            </span>
            <span>
              <em>
                {icon}
                {text}
              </em>
            </span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

ChronicleButton.displayName = 'ChronicleButton'
export default ChronicleButton
