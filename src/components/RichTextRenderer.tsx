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
        px: 0,
        pl: 0,
        py: 0.5,
        fontStyle: 'italic',
        lineHeight: 1.6,
        '& h1, & h2, & h3': {
            fontFamily: 'Fixel Text, serif',
            fontWeight: 600,
            margin: '16px 0 8px 0'
        },
        '& p': {
            margin: '0px',
            padding: '0px',
        },
        '& ul, & ol': {
            paddingLeft: '20px',
            margin: '8px 0'
        },
        '& blockquote': {
            position: 'relative',
            padding: 2,
            paddingLeft: 1,
            margin: '0',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: '1.1em',
            lineHeight: 1.3,
            color: '#444',
            background: 'transparent',
            '&::before': {
                content: '"\\201C"',
                position: 'absolute',
                top: '4px',
                left: '2px',
                fontSize: '2em',
                color: '#d0d0d0',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
            },
            '&::after': {
                content: '"\\201D"',
                position: 'absolute',
                bottom: '-4px',
                right: '8px',
                fontSize: '2em',
                color: '#d0d0d0',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
            },
            '& p': {
                marginTop: '0px',
                marginBottom: '0',
            },
        },
        '& a': {
            color: '#333',
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
