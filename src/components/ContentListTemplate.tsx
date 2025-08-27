import React from 'react'
import {
    Typography,
    Box,
    Grid,
} from '@mui/material'
import { IssueItem } from '../types'

interface ContentListTemplateProps {
    item: IssueItem
    index: number
}

const ContentListTemplate: React.FC<ContentListTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', p: 1 }}>
            <Grid container spacing={0} sx={{ mt: 8, background: '#000' }}>
                {item.images && item.images.length > 0 && item.images.map((img, idx) => (
                    <Grid item key={idx} sx={{
                        width: 'calc(50% - 0.5px)',
                        p: 0,
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        ml: idx % 2 === 1 ? '1px' : 0,
                        mb: '1px'
                    }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Box sx={{ width: '100%', height: 50, backgroundImage: `url(https://imagedelivery.net/sh0QUHFZwG_8L-du34ou1A/e495b61f-cf97-4bd8-4136-0f2f3e25b400/original)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" sx={{ px: 1, fontFamily: 'Fixel Text, Arial, sans-serif', textTransform: 'uppercase' }}>{img}</Typography>
                                <Typography variant="body2" sx={{ px: 1, fontFamily: 'Fixel Text, Arial, sans-serif' }}>Lorem ipsum dolor sit amet
                                    consectetur adipiscing elit.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ContentListTemplate
