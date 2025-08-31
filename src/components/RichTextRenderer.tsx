import React from 'react'
import { Typography, SxProps, Theme } from '@mui/material'

interface RichTextRendererProps {
    content: string
    color?: string
    sx?: SxProps<Theme>
}

/**
 * Component for rendering rich text HTML content with proper styling
 * Supports headers, paragraphs, lists, blockquotes, and links
 */
const RichTextRenderer: React.FC<RichTextRendererProps> = ({
    content,
    color,
    sx = {}
}) => {
    const defaultStyles: SxProps<Theme> = {
        textAlign: 'left',
        fontFamily: 'Fixel Text, serif',
        px: 4,
        pl: 5,
        py: 0.5,
        fontStyle: 'italic',
        lineHeight: 1.6,
        '& h1, & h2, & h3': {
            fontFamily: 'Nyght Serif, serif',
            fontWeight: 600,
            margin: '16px 0 8px 0'
        },
        '& p': {
            margin: '8px 0'
        },
        '& ul, & ol': {
            paddingLeft: '20px',
            margin: '8px 0'
        },
        '& blockquote': {
            borderLeft: '4px solid #ccc',
            paddingLeft: '16px',
            margin: '16px 0',
            fontStyle: 'italic'
        },
        '& a': {
            color: color || '#1976d2',
            textDecoration: 'underline'
        },
        ...sx
    }

    return (
        <Typography
            variant="body2"
            sx={defaultStyles}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}

export default RichTextRenderer
