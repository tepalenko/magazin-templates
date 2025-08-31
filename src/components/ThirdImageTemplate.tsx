import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

const IMAGE_WIDTH_PERCENTAGE = '40%'

interface ThirdImageTemplateProps {
    item: IssueItem
    index: number
}

const ThirdImageTemplate: React.FC<ThirdImageTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", position: 'relative', overflow: 'hidden' }}>
            {item.images && item.images.length > 0 && (
                <img
                    src={item.images[0]}
                    alt="Item Image"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        width: IMAGE_WIDTH_PERCENTAGE,
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <Box sx={{
                marginRight: IMAGE_WIDTH_PERCENTAGE,
                display: 'flex',
                pt: 10,
                px: 2,
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Typography variant="h4" sx={{
                    mt: 2,
                    textAlign: 'center',
                    fontFamily: 'Nyght Serif, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    {item.title || 'Untitled'}
                </Typography>
                <Typography variant="h5" sx={{
                    mt: 0.5,
                    textAlign: 'center',
                    fontFamily: 'Nyght Serif, serif',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '1rem',
                    p: 2
                }}>
                    {item.subtitle || 'Untitled'}
                </Typography>
                {item.text && (
                    <RichTextRenderer
                        content={item.text}
                        color={item.color}
                    />
                )}
            </Box>
        </Box>
    )
}

export default ThirdImageTemplate
