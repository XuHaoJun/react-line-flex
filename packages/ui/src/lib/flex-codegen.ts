import type {
  FlexMessage,
  FlexBubble,
  FlexCarousel,
  FlexComponent,
  FlexBox,
  FlexText,
  FlexSpan,
} from '../components/line-flex/utils/lf-types';

function escapeAttr(value: string): string {
  return value.replace(/"/g, '&quot;');
}

function propPair(key: string, value: any): string | '' {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return `${key}="${escapeAttr(value)}"`;
  if (typeof value === 'number' || typeof value === 'boolean') return `${key}={${String(value)}}`;
  return `${key}={${JSON.stringify(value)}}`;
}

function joinProps(props: Record<string, any>, keys: string[]): string {
  const parts = keys.map((k) => propPair(k, (props as any)[k])).filter(Boolean) as string[];
  return parts.length ? ' ' + parts.join(' ') : '';
}

function indent(level: number): string {
  return '  '.repeat(level);
}

function serializeSpan(span: FlexSpan, level: number): string {
  const props = joinProps(span as any, ['text', 'size', 'color', 'weight', 'style', 'decoration']);
  return `${indent(level)}<LfSpan${props} />`;
}

function serializeText(text: FlexText, level: number, layout?: 'horizontal' | 'vertical' | 'baseline'): string {
  const props = joinProps(text as any, [
    'text',
    'flex',
    'margin',
    'position',
    'offsetTop',
    'offsetBottom',
    'offsetStart',
    'offsetEnd',
    'size',
    'align',
    'gravity',
    'wrap',
    'maxLines',
    'weight',
    'color',
    'style',
    'decoration',
    'lineSpacing',
    'action',
  ]);
  const layoutProp = layout ? ` layout="${layout}"` : '';
  if (text.contents && text.contents.length > 0) {
    const spans = text.contents.map((s) => serializeSpan(s, level + 1)).join('\n');
    return `${indent(level)}<LfText${props}${layoutProp}>\n${spans}\n${indent(level)}</LfText>`;
  }
  return `${indent(level)}<LfText${props}${layoutProp} />`;
}

function serializeBox(box: FlexBox, level: number): string {
  const props = joinProps(box as any, [
    'layout',
    'flex',
    'spacing',
    'margin',
    'paddingAll',
    'paddingTop',
    'paddingBottom',
    'paddingStart',
    'paddingEnd',
    'position',
    'offsetTop',
    'offsetBottom',
    'offsetStart',
    'offsetEnd',
    'backgroundColor',
    'borderColor',
    'borderWidth',
    'cornerRadius',
    'width',
    'maxWidth',
    'height',
    'maxHeight',
    'justifyContent',
    'alignItems',
    'background',
    'action',
  ]);

  const children = (box.contents || []).map((c) => serializeComponent(c, level + 1, box.layout)).join('\n');
  return `${indent(level)}<LfBox${props}>\n${children}\n${indent(level)}</LfBox>`;
}

function serializeComponent(component: FlexComponent, level: number, layout?: 'horizontal' | 'vertical' | 'baseline'): string {
  switch (component.type) {
    case 'box':
      return serializeBox(component, level);
    case 'text':
      return serializeText(component, level, layout);
    case 'image': {
      const props = joinProps(component as any, [
        'url',
        'flex',
        'margin',
        'position',
        'offsetTop',
        'offsetBottom',
        'offsetStart',
        'offsetEnd',
        'align',
        'gravity',
        'size',
        'aspectRatio',
        'aspectMode',
        'backgroundColor',
        'action',
      ]);
      return `${indent(level)}<LfImage${props} />`;
    }
    case 'icon': {
      const props = joinProps(component as any, ['url', 'size', 'aspectRatio', 'margin', 'position', 'offsetTop', 'offsetBottom', 'offsetStart', 'offsetEnd']);
      return `${indent(level)}<LfIcon${props} />`;
    }
    case 'button': {
      const props = joinProps(component as any, [
        'action',
        'flex',
        'margin',
        'position',
        'offsetTop',
        'offsetBottom',
        'offsetStart',
        'offsetEnd',
        'height',
        'style',
        'color',
        'gravity',
        'adjustMode',
      ]);
      return `${indent(level)}<LfButton${props} />`;
    }
    case 'separator': {
      const props = joinProps(component as any, ['margin', 'color']);
      return `${indent(level)}<LfSeparator${props} />`;
    }
    case 'spacer': {
      const props = joinProps(component as any, ['size']);
      return `${indent(level)}<LfSpacer${props} />`;
    }
    case 'filler': {
      const props = joinProps(component as any, ['flex']);
      return `${indent(level)}<LfFiller${props} />`;
    }
    case 'video': {
      const props = joinProps(component as any, ['url', 'previewUrl', 'altContent', 'aspectRatio', 'action']);
      return `${indent(level)}<LfVideo${props} />`;
    }
    default:
      return `${indent(level)}{/* Unsupported component: ${(component as any).type} */}`;
  }
}

function serializeBubble(bubble: FlexBubble, level: number): string {
  const props = joinProps(bubble as any, ['size', 'direction', 'styles', 'action']);
  const parts: string[] = [];
  if (bubble.header) parts.push(serializeBox(bubble.header, level + 1));
  if (bubble.hero) {
    if (bubble.hero.type === 'box') parts.push(serializeBox(bubble.hero as FlexBox, level + 1));
    else parts.push(serializeComponent(bubble.hero as any, level + 1));
  }
  if (bubble.body) parts.push(serializeBox(bubble.body, level + 1));
  if (bubble.footer) parts.push(serializeBox(bubble.footer, level + 1));
  const children = parts.join('\n');
  return `${indent(level)}<LfBubble${props}>\n${children}\n${indent(level)}</LfBubble>`;
}

function serializeCarousel(carousel: FlexCarousel, level: number): string {
  const children = carousel.contents.map((b) => serializeBubble(b, level + 1)).join('\n');
  return `${indent(level)}<LfCarousel>\n${children}\n${indent(level)}</LfCarousel>`;
}

/**
 * Generate a JSX-like string of Lf* components (shallow; not HTML) from Flex JSON.
 */
export function generateFlexJSXFromJSON(input: FlexMessage | FlexBubble | FlexCarousel): string {
  if ((input as FlexMessage).type === 'flex') {
    const msg = input as FlexMessage;
    const body = msg.contents.type === 'bubble' ? serializeBubble(msg.contents, 0) : serializeCarousel(msg.contents, 0);
    return body;
  }
  const content = input as FlexBubble | FlexCarousel;
  return content.type === 'bubble' ? serializeBubble(content, 0) : serializeCarousel(content, 0);
}

export function generateComponentJSX(component: FlexComponent): string {
  // Wrap inside a Box for context
  const box: FlexBox = { type: 'box', layout: 'vertical', contents: [component] };
  return serializeBox(box, 0);
}


