import React from 'react';
import { Box } from '@mui/material';

interface SlideIndicatorsProps {
    totalSlides: number;
    currentSlide: number;
    onSlideClick: (index: number) => void;
    isAnimating: boolean;
    maxVisibleDots?: number;
}

const SlideIndicators: React.FC<SlideIndicatorsProps> = ({
    totalSlides,
    currentSlide,
    onSlideClick,
    isAnimating,
    maxVisibleDots = 10
}) => {
    const halfWindow = Math.floor(maxVisibleDots / 2);

    const handleSlideClick = (index: number) => {
        if (!isAnimating && index !== currentSlide) {
            onSlideClick(index);
        }
    };

    if (totalSlides <= maxVisibleDots) {
        // Show all dots if total is less than max
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 4,
                py: 2,
                gap: 0,
                userSelect: 'none',
                overflow: 'hidden'
            }}>
                {Array.from({ length: totalSlides }, (_, index) => {
                    const isActive = index === currentSlide;
                    const filled = index <= currentSlide;
                    const z = isActive ? 4 : filled ? 3 : 1;

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
                                ml: index === 0 ? 0 : '6px',
                                '&:hover': {
                                    backgroundColor: filled ? '#404060' : '#b0b0b0'
                                }
                            }}
                            onClick={() => handleSlideClick(index)}
                        />
                    );
                })}
            </Box>
        );
    }

    // Show windowed dots with ellipsis
    const dots = [];

    // Calculate start and end indices for the window
    let startIndex = Math.max(0, currentSlide - halfWindow);
    let endIndex = Math.min(totalSlides - 1, currentSlide + halfWindow);

    // Adjust if we're near the beginning or end
    if (endIndex - startIndex < maxVisibleDots - 1) {
        if (startIndex === 0) {
            endIndex = Math.min(totalSlides - 1, maxVisibleDots - 1);
        } else {
            startIndex = Math.max(0, totalSlides - maxVisibleDots);
        }
    }

    // Add first dot if not in window
    if (startIndex > 0) {
        dots.push(
            <Box
                key={0}
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#d0d0d0',
                    cursor: 'pointer',
                    flexShrink: 0,
                    '&:hover': { backgroundColor: '#b0b0b0' }
                }}
                onClick={() => handleSlideClick(0)}
            />
        );

        // Add ellipsis if there's a gap
        if (startIndex > 1) {
            dots.push(
                <Box
                    key="ellipsis-start"
                    sx={{
                        width: 12,
                        height: 12,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#888',
                        fontSize: '0.8rem',
                        ml: '6px'
                    }}
                >
                    …
                </Box>
            );
        }
    }

    // Add visible window dots
    for (let i = startIndex; i <= endIndex; i++) {
        const isActive = i === currentSlide;
        const filled = i <= currentSlide;
        const z = isActive ? 4 : filled ? 3 : 1;
        const isFirstInGroup = i === startIndex && startIndex > 0;

        dots.push(
            <Box
                key={i}
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
                    ml: (i === 0 || isFirstInGroup) ? '6px' : '6px',
                    '&:hover': {
                        backgroundColor: filled ? '#404060' : '#b0b0b0'
                    }
                }}
                onClick={() => handleSlideClick(i)}
            />
        );
    }

    // Add last dot if not in window
    if (endIndex < totalSlides - 1) {
        // Add ellipsis if there's a gap
        if (endIndex < totalSlides - 2) {
            dots.push(
                <Box
                    key="ellipsis-end"
                    sx={{
                        width: 12,
                        height: 12,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#888',
                        fontSize: '0.8rem',
                        ml: '6px'
                    }}
                >
                    …
                </Box>
            );
        }

        dots.push(
            <Box
                key={totalSlides - 1}
                sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: '#d0d0d0',
                    cursor: 'pointer',
                    flexShrink: 0,
                    ml: '6px',
                    '&:hover': { backgroundColor: '#b0b0b0' }
                }}
                onClick={() => handleSlideClick(totalSlides - 1)}
            />
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
            py: 2,
            gap: 0,
            userSelect: 'none',
            overflow: 'hidden'
        }}>
            {dots}
        </Box>
    );
};

export default SlideIndicators;
