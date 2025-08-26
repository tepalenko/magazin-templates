import React from 'react'
import {
    Typography,
    Box,
    Divider,
} from '@mui/material'
import { IssueItem } from '../types'

interface EditorLetterGapTemplateProps {
    item: IssueItem
    index: number
}

const EditorLetterGapTemplate: React.FC<EditorLetterGapTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', p: 2 }}>
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
            <Typography variant="h4" sx={{
                mt: 0.5,
                textAlign: 'center',
                fontFamily: 'Nyght Serif, serif',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
            }}>
                {item.title || 'Untitled'}
            </Typography>

            <Divider sx={{
                my: 1,
                mx: 'auto',
                width: '20%',
                backgroundColor: '#ccc',
                height: '1px'
            }} />

            <Typography variant="h5" sx={{
                mt: 0.5,
                textAlign: 'center',
                fontFamily: 'Nyght Serif, serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '1rem',
            }}>
                {item.subtitle || 'Untitled'}
            </Typography>
            {item.paragraphs && item.paragraphs.map((paragraph, index) => (
                <Typography
                    key={index}
                    variant="body2"
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'Fixel Text, serif',
                        px: 2,
                        py: 0.5
                    }}
                >
                    {paragraph.text || 'no text'}
                </Typography>
            ))}
        </Box>
    )
}

export default EditorLetterGapTemplate
