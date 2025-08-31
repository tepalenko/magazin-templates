import React from 'react'
import {
    Typography,
    Box,
    Grid
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

interface EthernalTemplateProps {
    item: IssueItem
    index: number
}

const EthernalTemplate: React.FC<EthernalTemplateProps> = ({ item }) => {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            overflow: 'hidden',
            backgroundColor: '#fff',
            p: 2,
            pt: 4
        }}>
            <Typography variant="h1" sx={{
                textAlign: 'left',
                fontFamily: 'Fixel Text, serif',
                fontWeight: 600,
                fontSize: '7rem',
                lineHeight: '6rem',
                mb: 4
            }}>
                {item.title || 'Untitled'}
            </Typography>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Typography variant="body2" sx={{
                        textAlign: 'left',
                        fontFamily: 'Fixel Text, serif',
                        py: 0,
                        fontWeight: 'bold',
                    }}>
                        {item.title || 'Untitled'}
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    {item.text && (
                        <RichTextRenderer
                            content={item.text}
                            color={item.color}
                        />
                    )}
                </Grid>
            </Grid>
            {item.images && item.images.length > 0 && (
                <Box sx={{
                    p: 0,
                    mt: 4,
                }}>
                    <img
                        src={item.images[0]}
                        alt="Item Image"
                        style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default EthernalTemplate;
