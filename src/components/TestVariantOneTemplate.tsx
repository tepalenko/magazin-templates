import React, { useState } from 'react'
import {
    Typography,
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

interface TestVariantOneTemplateProps {
    item: IssueItem
    index: number
}

const TestVariantOneTemplate: React.FC<TestVariantOneTemplateProps> = ({ item }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
    const [isAnimating, setIsAnimating] = useState(false)

    // Use actual test data if available, otherwise use dummy data
    const testSteps = item.test?.steps?.length ? item.test.steps : []

    // Total slides: first slide + test slides + last slide
    const totalSlides = testSteps.length + 2

    const handleNext = () => {
        if (isAnimating) return
        if (currentSlide < totalSlides - 1) {
            setIsAnimating(true)
            setCurrentSlide(currentSlide + 1)
            setTimeout(() => setIsAnimating(false), 500) // Match animation duration
        } else {
            // Test completed - could show results
            console.log('Test completed!', selectedAnswers)
        }
    }

    const handleAnswerChange = (value: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentSlide - 1]: value // Subtract 1 because test slides start at index 1 (after first slide)
        }))
    }
    const getTotalPoints = () => {
        let total = 0
        for (const slideIndexStr in selectedAnswers) {
            const selectedAnswer = selectedAnswers[slideIndexStr]
            const stepIndex = parseInt(slideIndexStr)
            const step = testSteps[stepIndex]
            if (step) {
                const selectedOption = step.options?.find(option => option.points.toString() === selectedAnswer)
                if (selectedOption) {
                    total += selectedOption.points
                }
            }
        }
        return total
    }
    const getResult = () => {
        if (!item?.test || !item?.test.results) return "No results defined"
        const points = getTotalPoints()
        const result = item?.test.results.find((res: any) => Number(res.start) <= points && Number(res.end) >= points)
        return result ? result.text : "No result found"
    }
    const isFirstSlide = currentSlide === 0
    const isLastSlide = currentSlide === totalSlides - 1
    const isTestSlide = currentSlide > 0 && currentSlide < totalSlides - 1
    const currentTestIndex = currentSlide - 1 // Test slides start at index 1

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0ece6',
            position: 'relative'
        }}>
            {!isFirstSlide && !isLastSlide && (
                <>
                    <Box sx={{
                        p: 3,
                        textAlign: 'left',
                        backgroundColor: "#f5f1eb",
                        borderRadius: 4,
                        mx: 4,
                        mt: 10
                    }}>
                        <Typography variant="h1" sx={{
                            fontFamily: 'Fixel Text, serif',
                            fontWeight: 700,
                            color: '#333',
                            mb: 2,
                            fontSize: '1.5rem'
                        }}>
                            {item.title || 'Personality Test'}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mx: 4, my: 1 }}>
                        {`Питання ${currentTestIndex + 1} з ${testSteps.length}`}
                    </Typography>

                </>
            )}
            {/* Header */}


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
                    {/* First Slide */}
                    <Box
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
                        <RichTextRenderer content={item.test?.description || ''} />
                    </Box>

                    {/* Test Slides */}
                    {testSteps.map((step, slideIndex) => (
                        <Box
                            key={slideIndex}
                            sx={{
                                width: `calc(100% / ${totalSlides})`,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                px: 4,
                                flexShrink: 0,
                                pt: 0
                            }}
                        >
                            {/* Question */}
                            <Typography variant="h5" sx={{
                                textAlign: 'left',
                                mb: 2,
                                fontFamily: 'Fixel Text, serif',
                                fontWeight: 500,
                                color: '#333',
                                lineHeight: 1.2,
                                fontSize: '1.25rem'
                            }}>
                                {step.title}
                            </Typography>

                            {/* Options */}
                            <FormControl component="fieldset" sx={{ width: '100%' }}>
                                <RadioGroup
                                    value={selectedAnswers[slideIndex] || ''}
                                    onChange={(e) => {
                                        if (slideIndex === currentTestIndex) {
                                            handleAnswerChange(e.target.value)
                                        }
                                    }}
                                    sx={{ gap: 2 }}
                                >
                                    {step.options?.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option.points}
                                            control={<Radio />}
                                            label={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: "#0d0914" }}>
                                                    <Typography variant="body1">
                                                        {option.title}
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{
                                                backgroundColor: '#f8f7f3',
                                                borderRadius: 3,
                                                p: 1,
                                                m: 0,
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                '& .MuiFormControlLabel-label': {
                                                    flex: 1,
                                                    ml: 1
                                                }
                                            }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    ))}

                    {/* Last Slide */}
                    <Box
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
                        <Typography variant="h4" sx={{
                            textAlign: 'center',
                            color: '#666',
                            maxWidth: '400px',
                            mb: 3,
                            fontSize: '1.25rem'
                        }}>
                            Дякуємо за проходження тесту. Ваші результати готові!
                        </Typography>
                        <Box sx={{
                            backgroundColor: '#f8f7f3',
                            borderRadius: 3,
                            p: 3,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            maxWidth: '300px',
                            textAlign: 'center'
                        }}>
                            <Typography variant="body2" sx={{ color: '#666', fontSize: '1.5rem' }}>
                                {getResult()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Next Button */}
            <Box sx={{
                px: 4,
                pb: 4, // Add bottom padding for consistency
            }}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleNext}
                    disabled={
                        (isTestSlide && !selectedAnswers[currentTestIndex]) ||
                        isAnimating
                    }
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
                        },
                        '&:active': {
                            transform: 'none', // Prevent button from moving on click
                        }
                    }}
                >
                    {isFirstSlide ? 'Почати тест' :
                        isLastSlide ? 'Завершено' :
                            currentSlide === totalSlides - 2 ? 'Завершити тест' :
                                'Наступне питання'}
                </Button>
            </Box>
        </Box>
    )
}

export default TestVariantOneTemplate
