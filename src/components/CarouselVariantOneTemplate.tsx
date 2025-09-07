import React, { useState } from 'react'
import {
    Typography,
    Box,
    Button,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'
import SlideIndicators from './SlideIndicators'

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

    const handleSlideClick = (index: number) => {
        setIsAnimating(true)
        setCurrentSlide(index)
        setTimeout(() => setIsAnimating(false), 500)
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

            {/* Slide Indicators */}
            <SlideIndicators
                totalSlides={totalSlides}
                currentSlide={currentSlide}
                onSlideClick={handleSlideClick}
                isAnimating={isAnimating}
            />

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
