import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'

interface FullImageTemplateProps {
    item: IssueItem
    index: number
}

const FullImageTemplate: React.FC<FullImageTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden' }}>
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
    )
}

export default FullImageTemplate
