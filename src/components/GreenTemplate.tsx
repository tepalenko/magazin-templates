import React from 'react'
import {
    Typography,
    Box,
    Divider,
} from '@mui/material'
import { IssueItem } from '../types'

interface GreenTemplateProps {
    item: IssueItem
    index: number
}

const GreenTemplate: React.FC<GreenTemplateProps> = ({ item }) => {
    console.log('Rendering GreenTemplate with item:', item)
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', position: "relative", backgroundColor: item.color ?? '#767f62', display: 'flex', flexDirection: 'column' }}>

            {item.images && item.images.length > 0 && (
                <Box sx={{
                    height: '50%',
                    width: '100%',
                    p: '16px',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}>
                    <img
                        src={item.images[0]}
                        alt="Item Image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            )}
            <Box sx={{
                position: 'absolute',
                width: '90%',
                top: '45%',
                height: '60%',
                backgroundColor: "#fff",
                p: 2,
                overflow: 'auto',
                zIndex: 0
            }}>
                <Typography variant="h1" sx={{
                    mt: 4,
                    mb: 3,
                    textAlign: 'left',
                    fontFamily: 'Fixel Text, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                }}>
                    {item.title || 'Untitled'}
                </Typography>

                {item.paragraphs && item.paragraphs.map((paragraph, index) => (
                    <Typography
                        key={index}
                        variant="body2"
                        sx={{
                            textAlign: 'left',
                            fontFamily: 'Fixel Text, serif',
                            py: 1
                        }}
                    >
                        {paragraph.text || 'no text'}
                    </Typography>
                ))}
            </Box>

        </Box>
    )
}

export default GreenTemplate;
