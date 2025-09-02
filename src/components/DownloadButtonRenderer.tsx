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
        if (!url) return;

        try {
            // Create a temporary link element for download
            const link = document.createElement('a');
            link.href = url;
            link.download = ''; // Let browser determine filename from URL
            link.target = '_blank'; // Open in new tab as fallback

            // Add to DOM temporarily
            document.body.appendChild(link);

            // Trigger download
            link.click();

            // Clean up
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback: open in new window
            window.open(url, '_blank');
        }
    };

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
