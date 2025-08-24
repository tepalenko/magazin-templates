import React from 'react'
import {
  EditorLetterTemplate,
  HalfImageTemplate,
  FullImageTemplate,
  VideoTemplate,
  IssueItem,
  IssueItemTypes
} from '@tepalenko/magazin-templates'

// Sample data
const sampleItems: IssueItem[] = [
  {
    item_type: IssueItemTypes.EDITOR_LETTER,
    title: "Editor's Letter",
    subtitle: "Welcome to our latest issue",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    images: ["https://example.com/editor-photo.jpg"]
  },
  {
    item_type: IssueItemTypes.HALF_IMAGE,
    title: "Feature Article",
    subtitle: "An in-depth look at modern design",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    images: ["https://example.com/feature-image.jpg"]
  },
  {
    item_type: IssueItemTypes.FULL_IMAGE,
    title: "Photography Showcase",
    subtitle: "Stunning visuals from around the world",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    images: ["https://example.com/showcase-image.jpg"]
  },
  {
    item_type: IssueItemTypes.VIDEO,
    title: "Behind the Scenes",
    subtitle: "Watch our creative process",
    text: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    images: ["https://example.com/video-thumbnail.jpg"]
  }
]

export default function MagazinContent() {
  const handleEdit = (item: IssueItem, index: number) => {
    console.log('Edit item:', item, 'at index:', index)
    // Your edit logic here
  }

  const handleRemove = (index: number) => {
    console.log('Remove item at index:', index)
    // Your remove logic here
  }

  const renderTemplate = (item: IssueItem, index: number) => {
    const commonProps = {
      item,
      index,
      onEdit: handleEdit,
      onRemove: handleRemove
    }

    switch (item.item_type) {
      case IssueItemTypes.EDITOR_LETTER:
        return <EditorLetterTemplate key={index} {...commonProps} />
      case IssueItemTypes.HALF_IMAGE:
        return <HalfImageTemplate key={index} {...commonProps} />
      case IssueItemTypes.FULL_IMAGE:
        return <FullImageTemplate key={index} {...commonProps} />
      case IssueItemTypes.VIDEO:
        return <VideoTemplate key={index} {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div>
      <h1>Magazine Content</h1>
      {sampleItems.map((item, index) => renderTemplate(item, index))}
    </div>
  )
}
