# React LINE Flex - Examples

## Basic Text Message

```tsx
import { Container } from 'react-line-flex';

const simpleMessage = {
  type: 'bubble' as const,
  body: {
    type: 'box' as const,
    layout: 'vertical' as const,
    contents: [
      {
        type: 'text' as const,
        text: 'Hello, World!',
        size: 'xl' as const,
        weight: 'bold' as const,
      },
    ],
  },
};

function SimpleMessage() {
  return <Container content={simpleMessage} />;
}
```

## Product Card with Image

```tsx
import { Container } from 'react-line-flex';
import type { FlexBubble } from 'react-line-flex';

const productCard: FlexBubble = {
  type: 'bubble',
  hero: {
    type: 'image',
    url: 'https://example.com/product.jpg',
    size: 'full',
    aspectRatio: '20:13',
    aspectMode: 'cover',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    contents: [
      {
        type: 'text',
        text: 'Premium Headphones',
        size: 'xl',
        weight: 'bold',
      },
      {
        type: 'text',
        text: 'High-quality audio experience',
        size: 'sm',
        color: '#888888',
        wrap: true,
      },
      {
        type: 'box',
        layout: 'horizontal',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '$199.99',
            size: 'xl',
            weight: 'bold',
            color: '#17c950',
          },
          {
            type: 'text',
            text: '$249.99',
            size: 'sm',
            color: '#999999',
            decoration: 'line-through',
            gravity: 'bottom',
          },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'vertical',
    spacing: 'sm',
    contents: [
      {
        type: 'button',
        action: {
          type: 'uri',
          label: 'Buy Now',
          uri: 'https://example.com/buy',
        },
        style: 'primary',
      },
    ],
  },
};

function ProductCard() {
  return (
    <Container
      content={productCard}
      onAction={(action) => {
        if (action.type === 'uri') {
          console.log('Navigate to:', action.uri);
        }
      }}
    />
  );
}
```

## Restaurant Menu with Carousel

```tsx
import { Container } from 'react-line-flex';
import type { FlexCarousel } from 'react-line-flex';

const menuCarousel: FlexCarousel = {
  type: 'carousel',
  contents: [
    {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://example.com/pizza.jpg',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Margherita Pizza',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'text',
            text: '$12.99',
            color: '#17c950',
            size: 'lg',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'message',
              label: 'Order',
              text: 'I want to order Margherita Pizza',
            },
            style: 'primary',
          },
        ],
      },
    },
    {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://example.com/pasta.jpg',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Carbonara Pasta',
            weight: 'bold',
            size: 'xl',
          },
          {
            type: 'text',
            text: '$14.99',
            color: '#17c950',
            size: 'lg',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'message',
              label: 'Order',
              text: 'I want to order Carbonara Pasta',
            },
            style: 'primary',
          },
        ],
      },
    },
  ],
};

function RestaurantMenu() {
  return (
    <Container
      content={menuCarousel}
      onAction={(action) => {
        if (action.type === 'message') {
          console.log('Send message:', action.text);
        }
      }}
    />
  );
}
```

## Profile Card with Icons

```tsx
import { Container } from 'react-line-flex';
import type { FlexBubble } from 'react-line-flex';

const profileCard: FlexBubble = {
  type: 'bubble',
  size: 'kilo',
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    contents: [
      {
        type: 'box',
        layout: 'horizontal',
        spacing: 'md',
        contents: [
          {
            type: 'image',
            url: 'https://example.com/avatar.jpg',
            size: 'xl',
            aspectRatio: '1:1',
            aspectMode: 'cover',
            flex: 0,
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'John Doe',
                size: 'lg',
                weight: 'bold',
              },
              {
                type: 'text',
                text: 'Software Engineer',
                size: 'sm',
                color: '#888888',
              },
            ],
          },
        ],
      },
      {
        type: 'separator',
      },
      {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            spacing: 'sm',
            contents: [
              {
                type: 'icon',
                url: 'https://example.com/icons/email.png',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'john@example.com',
                size: 'sm',
                flex: 0,
              },
            ],
          },
          {
            type: 'box',
            layout: 'horizontal',
            spacing: 'sm',
            contents: [
              {
                type: 'icon',
                url: 'https://example.com/icons/phone.png',
                size: 'sm',
              },
              {
                type: 'text',
                text: '+1 234 567 8900',
                size: 'sm',
                flex: 0,
              },
            ],
          },
        ],
      },
    ],
  },
};

function ProfileCard() {
  return <Container content={profileCard} />;
}
```

## Event Ticket with Gradient Background

```tsx
import { Container } from 'react-line-flex';
import type { FlexBubble } from 'react-line-flex';

const eventTicket: FlexBubble = {
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    spacing: 'md',
    paddingAll: '20px',
    background: {
      type: 'linearGradient',
      angle: '90deg',
      startColor: '#4c63d2',
      endColor: '#bc2a8d',
    },
    contents: [
      {
        type: 'text',
        text: 'SUMMER MUSIC FEST',
        size: 'xxl',
        weight: 'bold',
        color: '#ffffff',
        align: 'center',
      },
      {
        type: 'spacer',
        size: 'lg',
      },
      {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        backgroundColor: '#ffffff',
        cornerRadius: '10px',
        paddingAll: '15px',
        contents: [
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: 'Date',
                color: '#888888',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'July 15, 2025',
                align: 'end',
                weight: 'bold',
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: 'Time',
                color: '#888888',
                size: 'sm',
              },
              {
                type: 'text',
                text: '7:00 PM',
                align: 'end',
                weight: 'bold',
              },
            ],
          },
          {
            type: 'separator',
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: 'Venue',
                color: '#888888',
                size: 'sm',
              },
              {
                type: 'text',
                text: 'Central Park',
                align: 'end',
                weight: 'bold',
              },
            ],
          },
        ],
      },
      {
        type: 'button',
        action: {
          type: 'uri',
          label: 'Get Directions',
          uri: 'https://maps.example.com',
        },
        style: 'secondary',
      },
    ],
  },
};

function EventTicket() {
  return <Container content={eventTicket} />;
}
```

## Using Individual Components

You can also use components individually:

```tsx
import { Box, Text, Button, Image } from 'react-line-flex';

function CustomComponent() {
  return (
    <Box layout="vertical" spacing="md" className="p-4">
      <Image
        url="https://example.com/banner.jpg"
        size="full"
        aspectRatio="16:9"
        aspectMode="cover"
      />
      <Text
        text="Custom Layout"
        size="xl"
        weight="bold"
      />
      <Text
        text="Build your own layouts with individual components"
        wrap={true}
        color="#666666"
      />
      <Button
        action={{
          type: 'uri',
          label: 'Learn More',
          uri: 'https://example.com',
        }}
        style="primary"
      />
    </Box>
  );
}
```

## Handling Actions

```tsx
import { Container } from 'react-line-flex';
import { useNavigate } from 'react-router-dom';

function MessageWithActions() {
  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action.type) {
      case 'uri':
        // Custom navigation
        if (action.uri.startsWith('/')) {
          navigate(action.uri);
        } else {
          window.open(action.uri, '_blank');
        }
        break;
      
      case 'message':
        // Send message to chat
        sendMessageToChat(action.text);
        break;
      
      case 'postback':
        // Handle postback data
        handlePostback(action.data);
        break;
    }
  };

  return (
    <Container
      content={flexMessage}
      onAction={handleAction}
    />
  );
}
```

## Custom Styling

Add custom classes to any component:

```tsx
import { Bubble, Box, Text } from 'react-line-flex';

function StyledBubble() {
  return (
    <Bubble
      className="shadow-xl hover:shadow-2xl transition-shadow"
      body={{
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Styled Message',
            size: 'xl',
          },
        ],
      }}
    />
  );
}
```

