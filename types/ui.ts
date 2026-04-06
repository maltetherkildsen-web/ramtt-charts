// types/ui.ts — Shared types for @ramtt/ui

import type { Size, SemanticColor } from '@/lib/ui';

/** Re-export for convenience */
export type { Size, SemanticColor };

/** Base props every component accepts */
export interface BaseComponentProps {
  className?: string;
}

/** Props for interactive components */
export interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;
}

/** Props for components that display a label */
export interface LabelledProps extends BaseComponentProps {
  label?: string;
}

/** Props for components with semantic color */
export interface ColoredProps extends BaseComponentProps {
  color?: SemanticColor;
}
