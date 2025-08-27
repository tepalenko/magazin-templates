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
const getBorderRadius = (index: number) => {
    if (index === 0) return '0 0 4px 0'
    if (index === 1) return '0 0 0 4px'
    if (index === 2) return '0 4px 0 0'
    if (index === 3) return '4px 0 0 0'
    if (index === 4) return '0 4px 0 0'

    return '0'
}

const getPaddingLeft = (index: number) => {
    console.log('getPaddingLeft', index, index % 2 === 0 ? 0 : 1);
    return index % 2 === 0 ? 0 : 1;

}

const ContentListTemplate: React.FC<ContentListTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', p: 1 }}>
            <Grid container spacing={0} sx={{ mt: 8, background: '#000' }}>
                {item.images && item.images.length > 0 && item.images.map((img, idx) => (
                    <Grid item key={idx} sx={{
                        width: 'calc(50% - 0.5px)',
                        p: 0,
                        py: 1,
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        ml: idx % 2 === 1 ? '1px' : 0,
                        mb: '1px',
                        borderRadius: getBorderRadius(idx),
                        pl: getPaddingLeft(idx)
                    }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(https://imagedelivery.net/sh0QUHFZwG_8L-du34ou1A/e495b61f-cf97-4bd8-4136-0f2f3e25b400/original)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" sx={{
                                    px: 1,
                                    fontFamily: 'Fixel Text, Arial, sans-serif',
                                    textTransform: 'uppercase',
                                    fontSize: '1rem',
                                    lineHeight: '1rem',
                                    mb: 0.5
                                }}>{img}</Typography>
                                <Typography variant="body2" sx={{
                                    px: 1,
                                    fontFamily: 'Fixel Text, Arial, sans-serif',
                                    fontSize: '0.65rem',
                                    lineHeight: '0.55rem',
                                }}>Lorem ipsum dolor sit amet
                                    consectetur adipiscing elit.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Box >
    )
}

export default ContentListTemplate
