import React, { ReactNode } from 'react'
import {
    Box,
    Paper,
    Button,
} from '@mui/material'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material'
import { IssueItem } from '../types'

interface BaseTemplateProps {
    item: IssueItem
    index: number
    onEdit?: (item: IssueItem, index: number) => void
    onRemove?: (index: number) => void
    children: ReactNode
    paperProps?: {
        elevation?: number
        sx?: object
    }
    actionsPosition?: 'flex-end' | 'flex-start' | 'center' | 'space-between'
    showEditButton?: boolean
    showRemoveButton?: boolean
    editButtonText?: string
    removeButtonText?: string
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({
    item,
    index,
    onEdit,
    onRemove,
    children,
    paperProps = {},
    actionsPosition = 'flex-end',
    showEditButton = true,
    showRemoveButton = true,
    editButtonText = 'Edit',
    removeButtonText = 'Remove'
}) => {
    const defaultPaperSx = {
        p: 2,
        bgcolor: 'background.paper',
        height: '100%',
        ...paperProps.sx
    }

    return (
        <Paper {...paperProps} sx={defaultPaperSx}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Content Area */}
                <Box sx={{ flex: 1, mb: 2 }}>
                    {children}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: actionsPosition }}>
                    {showEditButton && onEdit && (
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => onEdit(item, index)}
                        >
                            {editButtonText}
                        </Button>
                    )}
                    {showRemoveButton && onRemove && (
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => onRemove(index)}
                        >
                            {removeButtonText}
                        </Button>
                    )}
                </Box>
            </Box>
        </Paper>
    )
}

export default BaseTemplate
