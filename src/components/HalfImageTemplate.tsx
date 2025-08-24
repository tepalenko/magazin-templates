import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import { formatItemTypeName } from '../utils/templateUtils'

const IMAGE_WIDTH_PERCENTAGE = '30%'

interface HalfImageTemplateProps {
    item: IssueItem
    index: number
}

const HalfImageTemplate: React.FC<HalfImageTemplateProps> = ({
    item,
    index
}) => {
    return (
        <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
                {formatItemTypeName(item.item_type)}
            </Typography>
            <Box sx={{ width: 300, height: 500, position: 'relative', overflow: 'hidden' }}>
                {item.images && item.images.length > 0 && (
                    <img
                        src={item.images[0]}
                        alt="Item Image"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: IMAGE_WIDTH_PERCENTAGE,
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 4
                        }}
                    />
                )}
                <Box sx={{
                    marginLeft: IMAGE_WIDTH_PERCENTAGE,
                    paddingLeft: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h4" sx={{ mt: 0.5, textAlign: 'center' }}>
                        {item.title || 'Untitled'}
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.5, textAlign: 'center' }}>
                        {item.subtitle || 'Untitled'}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 0.5,
                            textAlign: 'justify'
                        }}
                    >
                        {item.text || 'no text'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default HalfImageTemplate
