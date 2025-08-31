import React from 'react'
import {
    Typography,
    Box,
    Divider,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

interface FocusTemplateProps {
    item: IssueItem
    index: number
}

const FocusTemplate: React.FC<FocusTemplateProps> = ({ item }) => {
    console.log('--- Rendering FocusTemplate with item: ---', item);
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', position: "relative", pt: 8, px: 3 }}>
            <Box sx={{ position: "absolute", top: 90, left: 0, width: '50px', height: '180px', background: item.color ?? 'pink', zIndex: 0 }}></Box>
            <Box sx={{ position: "absolute", top: 90, right: 0, width: '150px', height: '320px', background: item.color ?? 'pink', zIndex: 0 }}></Box>
            <Box sx={{ position: "absolute", bottom: 0, left: 0, width: '40px', height: '180px', background: item.color ?? 'pink', zIndex: 0 }}></Box>
            <Box sx={{ position: "relative", zIndex: 1 }}>
                {item.images && item.images.length > 0 && (
                    <img
                        src={item.images[0]}
                        alt="Item Image"
                        style={{
                            width: '100%',
                            height: '300px',
                            objectFit: 'cover',
                            marginBottom: 16,
                        }}
                    />
                )}
                <Typography variant="h1" sx={{
                    mt: 0.5,
                    textAlign: 'left',
                    fontFamily: 'Fixel Text, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    fontSize: '3rem',
                }}>
                    {item.title || 'Untitled'} 222
                </Typography>

                <Divider sx={{
                    mr: 4,
                    width: '20%',
                    backgroundColor: '#000',
                    height: '2px',
                    marginLeft: 'auto',
                    my: 4
                }} />

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

export default FocusTemplate;
