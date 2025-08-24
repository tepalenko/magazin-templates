import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'

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
                        height: '100px',
                        objectFit: 'cover',
                        marginBottom: 16,
                        borderRadius: 4
                    }}
                />
            )}
            <Typography variant="h4" sx={{ mt: 0.5, textAlign: 'center' }}>
                {item.title || 'Untitled'}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.5, textAlign: 'center' }}>
                {item.subtitle || 'Untitled'}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    mt: 0.5,
                    columnCount: 2,
                    columnGap: 2,
                    textAlign: 'justify'
                }}
            >
                {item.text || 'no text'}
            </Typography>
        </Box>
    )
}

export default EditorLetterTemplate
