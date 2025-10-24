# react-line-flex

A comprehensive React component library for rendering [LINE Flex Messages](https://developers.line.biz/en/docs/messaging-api/using-flex-messages/) with full TypeScript support, Tailwind CSS V4 styling, and [shadcn/ui](https://ui.shadcn.com/) integration.

Live Demo: https://xuhaojun.github.io/react-line-flex

## Install

```bash
shadcn add https://raw.githubusercontent.com/XuHaoJun/react-line-flex/refs/heads/main/packages/react-line-flex/public/r/react-line-flex.json
```

## Usage

```tsx
import { LfMessage, LfBubble, LfBox, LfText } from '@/components/ui/line-flex';

const Example1 = () => {
  const message = {
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'https://line.me/',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'Brown Cafe',
            weight: 'bold',
            size: 'xl',
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
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: 'CALL',
              uri: 'https://line.me/',
            },
          },
        ],
        flex: 0,
      },
    },
  };
  return <LfMessage {...message} />;
};

const Example2 = () => {
  return (
    <LfBubble>
      <LfBox layout="vertical">
        <LfText text="Hello, World!" layout="vertical" />
      </LfBox>
    </LfBubble>
  );
};
```
