import React, { useState } from 'react'
import {
    Typography,
    Box,
    Button,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

interface CarouselVariantOneTemplateProps {
    item: IssueItem
    index: number
}

const CarouselVariantOneTemplate: React.FC<CarouselVariantOneTemplateProps> = ({ item }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    console.log('------- CarouselVariantOneTemplate ------', item)
    // Use carousel items if available
    const carouselItems = item.carousel?.items || []
    const totalSlides = carouselItems.length

    const handleNext = () => {
        if (isAnimating) return
        if (currentSlide < totalSlides - 1) {
            setIsAnimating(true)
            setCurrentSlide(currentSlide + 1)
            setTimeout(() => setIsAnimating(false), 500) // Match animation duration
        }
    }

    const handlePrevious = () => {
        if (isAnimating) return
        if (currentSlide > 0) {
            setIsAnimating(true)
            setCurrentSlide(currentSlide - 1)
            setTimeout(() => setIsAnimating(false), 500) // Match animation duration
        }
    }

    if (!carouselItems.length) {
        return (
            <Box sx={{
                width: "100%",
                height: "100%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0ece6',
                p: 4
            }}>
                <Typography variant="h6" color="text.secondary">
                    No carousel items available
                </Typography>
            </Box>
        )
    }

    const currentItem = carouselItems[currentSlide]
    const isFirstSlide = currentSlide === 0
    const isLastSlide = currentSlide === totalSlides - 1

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0ece6',
            position: 'relative'
        }}>
            {/* Carousel Container */}
            <Box sx={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Slides Container */}
                <Box sx={{
                    display: 'flex',
                    width: `${totalSlides * 100}%`,
                    height: '100%',
                    transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}>
                    {/* Carousel Items */}
                    {carouselItems.map((carouselItem, slideIndex) => (
                        <Box
                            key={slideIndex}
                            sx={{
                                width: `calc(100% / ${totalSlides})`,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                px: 4,
                                flexShrink: 0
                            }}
                        >
                            {/* Render text content using RichTextRenderer */}
                            {carouselItem.text && (
                                <Box sx={{ mb: 3, textAlign: 'center' }}>
                                    <RichTextRenderer content={carouselItem.text} />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Slide Indicators - tightly packed dots (no gaps). Active dot expands into a pill to connect seamlessly. */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 4,
                py: 2,
                gap: 0,
                // prevent accidental selectable behavior when overlapping
                userSelect: 'none'
            }}>
                {carouselItems.map((_, index) => {
                    const isActive = index === currentSlide
                    const filled = index <= currentSlide
                    // zIndex: active highest, then filled, then rest
                    const z = isActive ? 4 : filled ? 3 : 1
                    return (
                        <Box
                            key={index}
                            sx={{
                                width: isActive ? 36 : 12,
                                height: 12,
                                borderRadius: isActive ? 6 : '50%',
                                backgroundColor: filled ? '#30304d' : '#d0d0d0',
                                transition: 'width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 0.35s ease, background-color 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                zIndex: z,
                                flexShrink: 0,
                                display: 'inline-block',
                                // overlap previous dot by half to make them touch
                                ml: index === 0 ? 0 : '6px',
                                '&:hover': {
                                    backgroundColor: filled ? '#404060' : '#b0b0b0'
                                }
                            }}
                            onClick={() => {
                                if (!isAnimating && index !== currentSlide) {
                                    setIsAnimating(true)
                                    setCurrentSlide(index)
                                    setTimeout(() => setIsAnimating(false), 500)
                                }
                            }}
                        />
                    )
                })}
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{
                px: 4,
                pb: 14,
                display: 'flex',
                gap: 2
            }}>
                {!isFirstSlide && (
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={handlePrevious}
                        disabled={isAnimating}
                        sx={{
                            py: 2,
                            px: 3,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: 4,
                            borderColor: '#30304d',
                            color: '#30304d',
                            '&:hover': {
                                borderColor: '#404060',
                                backgroundColor: 'rgba(48, 48, 77, 0.04)'
                            },
                            '&:disabled': {
                                borderColor: '#ccc',
                                color: '#ccc',
                                cursor: 'not-allowed'
                            }
                        }}
                    >
                        Назад
                    </Button>
                )}

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleNext}
                    disabled={isAnimating || isLastSlide}
                    sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 4,
                        backgroundColor: isLastSlide ? '#666' : '#30304d',
                        '&:hover': {
                            backgroundColor: isLastSlide ? '#666' : '#404060',
                        },
                        '&:disabled': {
                            backgroundColor: '#ccc',
                            cursor: 'not-allowed'
                        }
                    }}
                >
                    {isLastSlide ? 'Завершено' : 'Далі'}
                </Button>
            </Box>
        </Box>
    )
}

export default CarouselVariantOneTemplate;
