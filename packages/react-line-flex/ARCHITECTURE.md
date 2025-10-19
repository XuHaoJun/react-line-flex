# React LINE Flex - Architecture

## Overview

This library converts [LINE Flex Message](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/) JSON specifications into React components using Tailwind CSS v4 and class-variance-authority (CVA).

## Project Structure

```
src/
├── components/        # React components
│   ├── container.tsx  # Main container (renders Bubble or Carousel)
│   ├── bubble.tsx     # Message bubble with sections
│   ├── carousel.tsx   # Horizontal scrollable carousel
│   ├── box.tsx        # Flex layout container
│   ├── button.tsx     # Interactive button
│   ├── image.tsx      # Image with aspect ratios
│   ├── video.tsx      # Video player
│   ├── icon.tsx       # Small icon display
│   ├── text.tsx       # Text with formatting
│   ├── span.tsx       # Inline text (used in Text)
│   ├── separator.tsx  # Visual divider
│   ├── filler.tsx     # Flexible space filler
│   ├── spacer.tsx     # Fixed space spacer
│   └── index.ts       # Component exports
├── lib/
│   └── utils.ts       # cn() utility for class merging
├── helpers.ts         # Helper functions for styling
├── variants.ts        # CVA variant configurations
├── types.ts           # TypeScript type definitions
├── styles.css         # Base styles and utilities
└── index.tsx          # Main export file
```

## Key Design Decisions

### 1. Component Architecture

**Container → Bubble/Carousel → Box → Components**

- **Container**: Top-level wrapper that accepts a Flex Message
- **Bubble**: Represents a single message with hero/header/body/footer sections
- **Carousel**: Horizontal scrollable container of bubbles
- **Box**: Recursive flex container for layout
- **Components**: Individual UI elements (Text, Image, Button, etc.)

### 2. Type System

All components extend LINE's Flex Message types:

```typescript
export type BoxProps = FlexBox & {
  className?: string;
  onAction?: (action: FlexAction) => void;
};
```

This ensures type safety and compatibility with LINE's specification.

### 3. Styling Strategy

**Tailwind CSS + CVA**

- Base styles in `variants.ts` using CVA
- Helper functions in `helpers.ts` convert LINE properties to Tailwind classes
- Fallback to inline styles for custom values (e.g., `"20px"`, `"#ff0000"`)

Example:

```typescript
// Predefined values → Tailwind classes
margin: 'md' → 'mt-[8px]'

// Custom values → inline styles
margin: '25px' → style={{ marginTop: '25px' }}
```

### 4. Action Handling

Unified action handling across all components:

```typescript
export function handleAction(action?: FlexAction, onAction?: (action: FlexAction) => void) {
  // Custom handler or default behavior
}
```

Actions are propagated from Container down through components.

## Component Details

### Container

Main entry point. Determines whether to render Bubble or Carousel based on content type.

```tsx
<Container content={flexMessage.contents} onAction={handleAction} />
```

### Bubble

Renders message sections (hero, header, body, footer) with size variants:

- nano: 120px
- micro: 160px
- kilo: 260px
- mega: 300px (default)
- giga: 500px

### Box

Recursive container supporting three layouts:

- `horizontal`: row layout
- `vertical`: column layout (default)
- `baseline`: row with baseline alignment

Key features:

- Flex grow/shrink
- Spacing between children
- Padding, margin, border
- Background (solid or gradient)
- Absolute positioning support

### Text

Rich text component with:

- Size variants (xxs → 5xl)
- Weight (regular/bold)
- Style (normal/italic)
- Decoration (underline/line-through)
- Word wrapping
- Max lines with ellipsis
- Span children support
- Action support

### Image

Responsive image with:

- Predefined sizes (xxs → 5xl, full)
- Aspect ratios (1:1, 16:9, 4:3, etc.)
- Aspect modes (fit/cover)
- Action support

### Button

Interactive button with three styles:

- `link`: Text-style button
- `primary`: Green filled button
- `secondary`: Gray filled button

## Helper Functions

### Size Conversion

```typescript
getSizeClass('xl'); // → 'text-[22px]'
getSizeStyle('24px'); // → { fontSize: '24px' }
```

### Margin/Spacing

```typescript
getMarginClass('md'); // → 'mt-[8px]'
getSpacingClass('lg'); // → 'gap-[12px]'
```

### Flex Values

```typescript
getFlexClass(1); // → 'flex-1'
getFlexClass(5); // → '' (uses inline style)
getFlexStyle(5); // → { flexGrow: 5 }
```

### Offsets

```typescript
getOffsetStyles('10px', undefined, 'md', '20px');
// → { top: '10px', left: '8px', right: '20px' }
```

## Variants (CVA)

Centralized variant definitions using class-variance-authority:

```typescript
export const buttonStyleVariants = cva('inline-flex items-center justify-center...', {
  variants: {
    buttonStyle: {
      link: 'text-[#42659a]',
      primary: 'bg-[#17c950] text-white',
      secondary: 'bg-[#dcdfe5] text-[#111111]',
    },
    height: {
      sm: 'h-[40px]',
      md: 'h-[52px]',
    },
  },
});
```

## Recursive Rendering

The `renderFlexComponent` function handles recursive component rendering:

```typescript
export function renderFlexComponent(
  component: FlexComponent,
  index: number,
  layout?: 'horizontal' | 'vertical' | 'baseline',
  onAction?: (action: FlexAction) => void
): React.ReactNode {
  switch (component.type) {
    case 'box':
      return <Box {...component} onAction={onAction} />;
    case 'text':
      return <Text {...component} onAction={onAction} />;
    // ... other components
  }
}
```

This enables nested Box structures and complex layouts.

## Tailwind Configuration

The library uses Tailwind CSS v4 with custom utilities:

```css
@layer utilities {
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

## TypeScript Configuration

Key compiler options:

- `moduleResolution: "bundler"` - For seamless imports
- `strict: true` - Full type safety
- `jsx: "react-jsx"` - Modern JSX transform

## Usage Patterns

### Basic Usage

```tsx
import { Container } from 'react-line-flex';
import 'react-line-flex/styles';

<Container content={flexMessage} />;
```

### Custom Action Handling

```tsx
<Container
  content={flexMessage}
  onAction={(action) => {
    // Custom logic
  }}
/>
```

### Component Composition

```tsx
import { Box, Text, Button } from 'react-line-flex';

<Box layout="vertical" spacing="md">
  <Text text="Title" size="xl" weight="bold" />
  <Button action={{ type: 'uri', uri: '...', label: 'Click' }} />
</Box>;
```

## Performance Considerations

1. **Memoization**: Components use `React.forwardRef` for ref stability
2. **Inline Styles**: Only generated when custom values are used
3. **Class Merging**: `cn()` utility efficiently merges Tailwind classes
4. **Recursive Rendering**: Optimized with proper key props

## Extensibility

### Custom Styling

All components accept `className` prop:

```tsx
<Container content={message} className="rounded-xl shadow-lg" />
```

### Custom Actions

Override default action behavior:

```tsx
<Button
  action={action}
  onAction={(action) => {
    // Custom handler
  }}
/>
```

## Testing Strategy

1. **Type Testing**: Ensure all LINE Flex types are properly handled
2. **Component Testing**: Test individual components with various props
3. **Integration Testing**: Test complete Flex Messages
4. **Visual Testing**: Compare output with LINE's official renderer

## Future Enhancements

1. Animation support using Tailwind's transition utilities
2. Dark mode support
3. Accessibility improvements (ARIA labels, keyboard navigation)
4. Server-side rendering optimization
5. Component variants for different platforms (mobile, desktop)

## Contributing

When adding new features:

1. Add types to `types.ts`
2. Create/update components in `components/`
3. Add CVA variants to `variants.ts`
4. Update helper functions if needed
5. Add examples to `EXAMPLES.md`
6. Update README.md

## Resources

- [LINE Flex Message Simulator](https://developers.line.biz/flex-simulator/)
- [LINE Flex Message Spec](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [class-variance-authority](https://cva.style/)
