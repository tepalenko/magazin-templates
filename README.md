# Magazin Templates

Shared React template components for magazin projects.

## Installation

```bash
npm install @tepalenko/magazin-templates
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom @mui/material @mui/icons-material
```

## Usage

```typescript
import { 
  EditorLetterTemplate, 
  HalfImageTemplate, 
  FullImageTemplate, 
  VideoTemplate,
  IssueItem,
  IssueItemTypes 
} from '@tepalenko/magazin-templates'

const item: IssueItem = {
  item_type: IssueItemTypes.EDITOR_LETTER,
  title: "Sample Title",
  subtitle: "Sample Subtitle",
  text: "Sample text content...",
  images: ["https://example.com/image.jpg"]
}

function MyComponent() {
  return (
    <EditorLetterTemplate
      item={item}
      index={0}
      onEdit={(item, index) => console.log('Edit', item, index)}
      onRemove={(index) => console.log('Remove', index)}
    />
  )
}
```

## Available Templates

- **EditorLetterTemplate** - Magazine-style editor letter with image, title, subtitle, and two-column text
- **HalfImageTemplate** - Split layout with 30% image and 70% content
- **FullImageTemplate** - Full-width image display
- **VideoTemplate** - Video content placeholder with description

## Components

- **BaseTemplate** - Base wrapper component with edit/remove actions
- All template components inherit from BaseTemplate

## Types

- **IssueItem** - Main content item interface
- **IssueItemTypes** - Enum of available item types

## Utils

- **formatItemTypeName** - Converts snake_case to Title Case
- **truncateText** - Truncates text with ellipsis

## Development

```bash
# Build the package
npm run build

# Watch for changes
npm run dev
```

## License

MIT
