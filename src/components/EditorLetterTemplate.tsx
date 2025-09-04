import React from 'react'
import {
    Typography,
    Box,
    Divider,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'
import DownloadButtonRenderer from './DownloadButtonRenderer'

interface EditorLetterTemplateProps {
    item: IssueItem
    index: number
}

const EditorLetterTemplate: React.FC<EditorLetterTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden' }}>
            {item.images && item.images.length > 0 && (
                <img
                    src={item.images[0]}
                    alt="Item Image"
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        marginBottom: 16,
                    }}
                />
            )}
            {item.title && (
                <>
                    <Typography variant="h4" sx={{
                        mt: 0.5,
                        textAlign: 'center',
                        fontFamily: 'Nyght Serif, serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        {item.title}
                    </Typography>
                    <Divider sx={{
                        my: 1,
                        mx: 'auto',
                        width: '20%',
                        backgroundColor: '#ccc',
                        height: '1px'
                    }} />
                </>
            )}
            {item.subtitle && <Typography variant="h5" sx={{
                mt: 0.5,
                textAlign: 'center',
                fontFamily: 'Nyght Serif, serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '1rem',
            }}>
                {item.subtitle}
            </Typography>
            }

            {item.text && (
                <Box sx={{ p: 2 }}>
                    <RichTextRenderer
                        content={item.text}
                        color={item.color}
                    />
                </Box>

            )}
            {item.downloadButton && item.downloadButton.url && (
                <Box sx={{ p: 2 }}>
                    <DownloadButtonRenderer
                        text={item.downloadButton.text}
                        url={item.downloadButton.url}
                        color={item.downloadButton.color}
                    />
                </Box>
            )}
        </Box>
    )
}

export default EditorLetterTemplate
