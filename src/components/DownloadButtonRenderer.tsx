import React from 'react'
import { Button } from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material'

interface DownloadButtonRendererProps {
    text: string
    url: string
    color: string
}

/**
 * Component for rendering download button with PDF download functionality
 * Handles mobile web downloads with proper styling
 */
const DownloadButtonRenderer: React.FC<DownloadButtonRendererProps> = ({
    text,
    url,
    color
}) => {
    const handleDownload = () => {
        if (!url) return

        try {
            // Always open the file in a new tab/window. Rely on the browser or user
            // settings to handle saving. This simplifies behavior across platforms.
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (!newWindow) {
                // If popup blocked, fallback to creating an anchor with target _blank
                const link = document.createElement('a')
                link.href = url
                link.target = '_blank'
                link.rel = 'noopener noreferrer'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        } catch (error) {
            console.error('Failed to open file:', error)
            // Final fallback: navigate to URL in the same tab
            window.location.href = url
        }
    }

    return (
        <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 4,
                backgroundColor: color || '#30304d',
                '&:hover': {
                    backgroundColor: color ? `${color}CC` : '#404060', // Add transparency for hover or use darker shade
                },
                '&:disabled': {
                    backgroundColor: '#ccc',
                    cursor: 'not-allowed'
                }
            }}
        >
            {text || 'Завантажити'}
        </Button>
    )
}

export default DownloadButtonRenderer
