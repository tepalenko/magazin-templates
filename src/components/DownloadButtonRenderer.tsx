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
            // Detect if we're on iOS/Android
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            const isMobile = isIOS || isAndroid;

            if (isMobile) {
                // For mobile browsers, especially iOS Safari, we need different approach
                if (isIOS) {
                    // iOS Safari has restrictions on programmatic downloads
                    // Open in new window which allows user to save manually
                    const newWindow = window.open(url, '_blank');
                    if (!newWindow) {
                        // If popup blocked, try direct navigation
                        window.location.href = url;
                    }
                } else {
                    // Android browsers generally support downloads better
                    // Try fetch + blob approach for better mobile support
                    fetch(url)
                        .then(response => response.blob())
                        .then(blob => {
                            const blobUrl = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = blobUrl;

                            // Extract filename from URL or use default
                            const filename = url.split('/').pop() || 'download';
                            link.download = filename;

                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            // Clean up blob URL
                            window.URL.revokeObjectURL(blobUrl);
                        })
                        .catch(() => {
                            // Fallback to direct link if fetch fails
                            window.open(url, '_blank');
                        });
                }
            } else {
                // Desktop browsers - use standard download approach
                const link = document.createElement('a');
                link.href = url;

                // Extract filename from URL
                const filename = url.split('/').pop() || 'download';
                link.download = filename;
                link.target = '_blank';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Download failed:', error);
            // Ultimate fallback: open in new window
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
