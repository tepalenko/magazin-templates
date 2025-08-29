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
    handleItemClick?: (index: number) => void
}

const dummyData = [
    {
        label: 'Тема номеру',
        title: 'Успішний успіх: що робити, коли я «не там»',
        subtitle: 'Чому ми часто «програємо» в порівняннях + тест на визначення власного рівня порівняння'
    },
    {
        label: 'Зовнішність',
        title: 'Тіло й стандарти: звідки критика?',
        subtitle: 'Наше перше «дзеркало», у якому з’являється відчуття «я не ок» + арт-вправа для тіла'
    },
    {
        label: 'Діяльність',
        title: 'Порівняння та продуктивність',
        subtitle: 'Хочете працювати краще? Порівнюйте себе правильно + вправа «Повідомлення натхнення»'
    },
    {
        label: 'Стосунки',
        title: 'Чиї подарунки дорожчі?',
        subtitle: 'Як порівняння впливає на стосунки + вправа для пари «3 маленькі кроки»'
    },
    {
        label: 'Розслаблення',
        title: 'Аудіо-медитація для підтримки і відновлення',
        subtitle: ''
    }
]

const ContentListTemplate: React.FC<ContentListTemplateProps> = ({ item, handleItemClick }) => {
    const handleClick = (itemIndex: number) => {
        if (handleItemClick) {
            handleItemClick(itemIndex)
        }
    }
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', m: 2, pt: 8 }}>
            <Typography variant="h5"
                sx={{
                    fontFamily: 'Fixel Text, Arial, sans-serif',
                    textTransform: 'uppercase',
                    fontSize: '1.25rem',
                    lineHeight: '1.25rem',
                    fontWeight: 300,
                    mb: 2,
                    textAlign: "center"
                }}>В ЦЬОМУ НОМЕРІ:</Typography>

            <Grid container spacing={2}>
                {/*item.images && item.images.length > 0 && item.images.map((img, idx) => (*/
                    dummyData.map((img, idx) => (
                        <Grid item key={idx} xs={12} sx={{
                            borderBottom: '1px solid #000',
                            p: 0,
                            pb: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative',
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
                        }}
                            onClick={() => handleClick(idx)}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Chip
                                    label={img.label}
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
                                }}>{img.title}
                                </Typography>
                                {img.subtitle && <Typography variant="body2" sx={{
                                    px: 0,
                                    mt: 1,
                                    fontFamily: 'Fixel Text, Arial, sans-serif',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.1rem',
                                    textTransform: 'uppercase',
                                }}>{img.subtitle}</Typography>}

                            </Box>
                            <Box className="arrow-circle" sx={{
                                position: 'absolute',
                                top: 10,
                                right: 0,
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
