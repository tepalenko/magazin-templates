import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import BaseTemplate from './BaseTemplate'
import { formatItemTypeName } from '../utils/templateUtils'

interface FullImageTemplateProps {
    item: IssueItem
    index: number
    onEdit?: (item: IssueItem, index: number) => void
    onRemove?: (index: number) => void
}

const FullImageTemplate: React.FC<FullImageTemplateProps> = ({
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
            <Box sx={{ width: 300, height: 500, overflow: 'hidden' }}>
                {item.images && item.images.length > 0 && (
                    <img
                        src={item.images[0]}
                        alt="Item Image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 4
                        }}
                    />
                )}
                {(!item.images || item.images.length === 0) && (
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '100%',
                        bgcolor: 'grey.100',
                        borderRadius: 1
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            No image available
                        </Typography>
                    </Box>
                )}
            </Box>
        </BaseTemplate>
    )
}

export default FullImageTemplate
