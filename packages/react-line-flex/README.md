# React LINE Flex

A modern React component library for rendering [LINE Flex Messages](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/), built with Tailwind CSS v4 and class-variance-authority.

## Features

- 🎨 Built with Tailwind CSS v4 for modern styling
- 🧩 Modular component architecture
- 📦 TypeScript support with full type definitions
- 🎯 Follows shadcn/ui design patterns
- ⚡ Optimized for performance
- 🔧 Highly customizable with CVA variants

## Installation

```bash
# Using pnpm
pnpm add react-line-flex

# Using npm
npm install react-line-flex

# Using yarn
yarn add react-line-flex
```

## Quick Start

```tsx
import { Container } from 'react-line-flex';
import type { FlexBubble } from 'react-line-flex';

const flexMessage: FlexBubble = {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Hello, World!',
        size: 'xl',
        weight: 'bold',
      },
    ],
  },
};

function App() {
  return (
    <Container
      content={flexMessage}
      onAction={(action) => {
        console.log('Action triggered:', action);
      }}
    />
  );
}
```

## Components

### Container Components

- **Container** - Main wrapper for rendering Flex Messages
- **Bubble** - Single message bubble
- **Carousel** - Scrollable carousel of bubbles

### Layout Components

- **Box** - Flexible container with horizontal/vertical/baseline layouts
- **Separator** - Visual separator line
- **Spacer** - Empty spacing element
- **Filler** - Flexible spacing element

### Content Components

- **Text** - Text display with rich formatting
- **Span** - Inline text with styling (used within Text)
- **Image** - Image display with aspect ratios
- **Video** - Video player with poster
- **Icon** - Small icon display
- **Button** - Interactive button with actions

## Usage Examples

### Basic Bubble

```tsx
import { Bubble } from 'react-line-flex';

<Bubble
  size="mega"
  body={{
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'Welcome!',
        size: 'xl',
        weight: 'bold',
      },
    ],
  }}
/>
```

### Carousel

```tsx
import { Carousel } from 'react-line-flex';

<Carousel
  contents={[
    {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          { type: 'text', text: 'Slide 1' },
        ],
      },
    },
    {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          { type: 'text', text: 'Slide 2' },
        ],
      },
    },
  ]}
/>
```

### Complex Layout with Actions

```tsx
import { Box, Button, Image, Text } from 'react-line-flex';

<Box layout="vertical" spacing="md">
  <Image
    url="https://example.com/image.jpg"
    size="full"
    aspectRatio="16:9"
    aspectMode="cover"
  />
  <Text
    text="Product Name"
    size="xl"
    weight="bold"
  />
  <Text
    text="$99.99"
    size="lg"
    color="#17c950"
  />
  <Button
    action={{
      type: 'uri',
      label: 'Buy Now',
      uri: 'https://example.com/buy',
    }}
    style="primary"
  />
</Box>
```

## Handling Actions

Actions can be handled globally or per-component:

```tsx
// Global action handler
<Container
  content={flexMessage}
  onAction={(action) => {
    switch (action.type) {
      case 'uri':
        // Custom navigation logic
        router.push(action.uri);
        break;
      case 'message':
        // Send message
        sendMessage(action.text);
        break;
      case 'postback':
        // Handle postback
        handlePostback(action.data);
        break;
    }
  }}
/>

// Component-specific action
<Button
  action={{
    type: 'message',
    text: 'Hello',
  }}
  onAction={(action) => {
    // Custom handler for this button
    console.log(action);
  }}
/>
```

## Customization

All components accept a `className` prop for additional styling:

```tsx
<Container
  content={flexMessage}
  className="shadow-lg rounded-xl"
/>

<Text
  text="Custom Text"
  className="hover:opacity-80 transition-opacity"
/>
```

## TypeScript Support

Full TypeScript definitions are included:

```tsx
import type {
  FlexMessage,
  FlexBubble,
  FlexCarousel,
  FlexBox,
  FlexAction,
  FlexComponent,
} from 'react-line-flex';

const bubble: FlexBubble = {
  type: 'bubble',
  size: 'mega',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [],
  },
};
```

## Component Props

### Container

| Prop | Type | Description |
|------|------|-------------|
| `content` | `FlexBubble \| FlexCarousel` | The flex message content to render |
| `onAction` | `(action: FlexAction) => void` | Optional action handler |
| `className` | `string` | Additional CSS classes |

### Box

| Prop | Type | Description |
|------|------|-------------|
| `layout` | `'horizontal' \| 'vertical' \| 'baseline'` | Layout direction |
| `contents` | `FlexComponent[]` | Child components |
| `spacing` | `FlexSpacing \| string` | Gap between children |
| `margin` | `FlexMargin \| string` | Margin around box |
| `padding*` | `string` | Padding (All, Top, Bottom, Start, End) |
| `backgroundColor` | `string` | Background color |
| `borderColor` | `string` | Border color |
| `borderWidth` | `FlexBorderWidth \| string` | Border width |
| `cornerRadius` | `string` | Border radius |
| `justifyContent` | `FlexJustifyContent` | Justify content |
| `alignItems` | `FlexAlignItems` | Align items |
| `action` | `FlexAction` | Click action |

See the [TypeScript definitions](./src/types.ts) for complete prop documentation.

## License

MIT

## Credits

Based on [flex2html](https://github.com/one-phat/flex2html) by one-phat, converted to modern React with Tailwind CSS.

