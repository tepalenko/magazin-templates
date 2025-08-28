import React from 'react'
import {
    Typography,
    Box,
    Grid,
    Chip,
} from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { IssueItem } from '../types'

interface ContentListTemplateProps {
    item: IssueItem
    index: number
    onItemClick?: () => void
}
const getBorderRadius = (index: number) => {
    if (index === 0) return '0 0 4px 0'
    if (index === 1) return '0 0 0 4px'
    if (index === 2) return '0 4px 0 0'
    if (index === 3) return '4px 0 0 0'
    if (index === 4) return '0 4px 0 0'

    return '0 4px 0 0'
}

const ContentListTemplate: React.FC<ContentListTemplateProps> = ({ item, onItemClick }) => {
    const handleItemClick = () => {
        if (onItemClick) {
            onItemClick()
        } else {
            // Default behavior - navigate to home
            window.location.href = '/'
        }
    }
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', m: 2, pt: 8 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 3
            }}>
                <Box sx={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#000',
                    borderRadius: '6px'
                }} />
                <Typography variant="h5"
                    sx={{
                        fontFamily: 'Fixel Text, Arial, sans-serif',
                        textTransform: 'uppercase',
                        fontSize: '1.25rem',
                        lineHeight: '1.25rem',
                        fontWeight: 300,
                        mb: 0
                    }}>В ЦЬОМУ НОМЕРІ:</Typography>
            </Box>
            <Grid container spacing={2}>
                {item.images && item.images.length > 0 && item.images.map((img, idx) => (
                    <Grid item key={idx} xs={12} sx={{
                        borderBottom: '1px solid #000',
                        p: 0,
                        pb: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            '& .arrow-circle': {
                                transform: 'scale(1.1)',
                                backgroundColor: '#000',
                                '& .MuiSvgIcon-root': {
                                    color: '#fff'
                                }
                            }
                        }
                    }} onClick={handleItemClick}>
                        <Box sx={{ flex: 1 }}>
                            <Chip
                                label="Стосунки"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.75rem',
                                    height: '24px',
                                    fontFamily: 'Fixel Text, Arial, sans-serif',
                                    textTransform: 'uppercase',
                                    border: '1px solid #000',
                                    backgroundColor: '#fff',
                                    letterSpacing: '0.7px',
                                    color: '#000',
                                    '& .MuiChip-label': {
                                        px: 1.5,
                                        py: 0.5,
                                    }
                                }}
                            />
                            <Typography variant="h6" sx={{
                                px: 0,
                                fontFamily: 'Fixel Text, Arial, sans-serif',
                                textTransform: 'uppercase',
                                fontSize: '1.4rem',
                                lineHeight: '1.6rem',
                                mb: 2
                            }}>Успішний успіх: що робити, коли я «не там»
                            </Typography>
                            <Typography variant="body2" sx={{
                                px: 0,
                                fontFamily: 'Fixel Text, Arial, sans-serif',
                                fontSize: '0.95rem',
                                lineHeight: '0.85rem',
                                textTransform: 'uppercase',
                            }}>чому саме тіло стає мішенню для порівнянь.</Typography>
                        </Box>
                        <Box className="arrow-circle" sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '1px solid #000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            ml: 2,
                            transition: 'all 0.2s ease',
                        }}>
                            <ArrowForward sx={{
                                fontSize: '20px',
                                color: '#000',
                                transition: 'color 0.2s ease',
                                transform: 'rotate(-45deg)'
                            }} />
                        </Box>


                    </Grid>
                ))}
            </Grid>
        </Box >
    )
}

export default ContentListTemplate
