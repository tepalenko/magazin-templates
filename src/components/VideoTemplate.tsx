import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import { formatItemTypeName } from '../utils/templateUtils'

interface VideoTemplateProps {
    item: IssueItem
    index: number
}

const VideoTemplate: React.FC<VideoTemplateProps> = ({
    item,
    index
}) => {
    return (
        <Box sx={{ width: "100%", height: "100%", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.900',
                borderRadius: 1,
                mb: 2
            }}>
                <Typography variant="h6" color="white">
                    📹 VIDEO
                </Typography>
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                {item.text || 'Video description...'}
            </Typography>
        </Box>
    )
}

export default VideoTemplate
