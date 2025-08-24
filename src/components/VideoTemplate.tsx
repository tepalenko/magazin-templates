import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import BaseTemplate from './BaseTemplate'
import { formatItemTypeName } from '../utils/templateUtils'

interface VideoTemplateProps {
    item: IssueItem
    index: number
    onEdit?: (item: IssueItem, index: number) => void
    onRemove?: (index: number) => void
}

const VideoTemplate: React.FC<VideoTemplateProps> = ({
    item,
    index,
    onEdit,
    onRemove
}) => {
    return (
        <BaseTemplate
            item={item}
            index={index}
            onEdit={onEdit}
            onRemove={onRemove}
        >
            <Typography variant="subtitle2" color="primary" gutterBottom>
                {formatItemTypeName(item.item_type)}
            </Typography>
            <Box sx={{ width: 300, height: 500, display: 'flex', flexDirection: 'column' }}>
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
        </BaseTemplate>
    )
}

export default VideoTemplate
