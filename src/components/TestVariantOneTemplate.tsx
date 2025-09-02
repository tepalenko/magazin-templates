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
    const testSteps = item.test?.steps?.length ? item.test.steps : [
        {
            title: "What's your favorite color?",
            options: [
                { title: "Red", points: 10 },
                { title: "Blue", points: 20 },
                { title: "Green", points: 15 },
                { title: "Yellow", points: 5 }
            ]
        },
        {
            title: "Which season do you prefer?",
            options: [
                { title: "Spring", points: 15 },
                { title: "Summer", points: 25 },
                { title: "Autumn", points: 20 },
                { title: "Winter", points: 10 }
            ]
        },
        {
            title: "What's your ideal weekend activity?",
            options: [
                { title: "Reading a book", points: 30 },
                { title: "Going to a party", points: 5 },
                { title: "Hiking in nature", points: 25 },
                { title: "Watching movies", points: 15 }
            ]
        },
        {
            title: "Which animal represents you best?",
            options: [
                { title: "Eagle - Independent and strong", points: 25 },
                { title: "Dolphin - Friendly and intelligent", points: 20 },
                { title: "Lion - Bold and confident", points: 30 },
                { title: "Owl - Wise and observant", points: 35 }
            ]
        }
    ]

    const handleNext = () => {
        if (isAnimating) return

        if (currentSlide < testSteps.length - 1) {
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
            [currentSlide]: value
        }))
    }

    const isLastSlide = currentSlide === testSteps.length - 1

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0ece6',
            position: 'relative'
        }}>
            {/* Header */}
            <Box sx={{
                p: 3,
                textAlign: 'left',
                backgroundColor: "#f5f1eb",
                borderRadius: 4,
                mx: 4,
                mt: 8
            }}>
                <Typography variant="h1" sx={{
                    fontFamily: 'Fixel Text, serif',
                    fontWeight: 700,
                    color: '#333',
                    mb: 1,
                    fontSize: '1.5rem'
                }}>
                    {item.title || 'Personality Test'}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 4 }}>
                Питання {currentSlide + 1} з {testSteps.length}
            </Typography>


            {/* Carousel Container */}
            <Box sx={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Slides Container */}
                <Box sx={{
                    display: 'flex',
                    width: `${testSteps.length * 100}%`,
                    height: '100%',
                    transform: `translateX(-${(currentSlide * 100) / testSteps.length}%)`,
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}>
                    {testSteps.map((step, slideIndex) => (
                        <Box
                            key={slideIndex}
                            sx={{
                                width: `${100 / testSteps.length}%`,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                px: 4,
                                flexShrink: 0
                            }}
                        >
                            {/* Question */}
                            <Typography variant="h5" sx={{
                                textAlign: 'left',
                                mb: 1,
                                fontFamily: 'Fixel Text, serif',
                                fontWeight: 500,
                                color: '#333',
                                lineHeight: 1.2
                            }}>
                                {step.title}
                            </Typography>

                            {/* Options */}
                            <FormControl component="fieldset" sx={{ width: '100%' }}>
                                <RadioGroup
                                    value={selectedAnswers[slideIndex] || ''}
                                    onChange={(e) => {
                                        if (slideIndex === currentSlide) {
                                            handleAnswerChange(e.target.value)
                                        }
                                    }}
                                    sx={{ gap: 2 }}
                                >
                                    {step.options?.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option.title}
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
                                                p: 2,
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
                </Box>
            </Box>

            {/* Next Button */}
            <Box sx={{
                px: 4,
            }}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentSlide] || isAnimating}
                    sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 4,
                        backgroundColor: '#30304d',
                        '&:disabled': {
                            backgroundColor: '#ccc',
                        }
                    }}
                >
                    {isLastSlide ? 'Завершити тест' : 'Наступне питання'}
                </Button>
            </Box>
        </Box>
    )
}

export default TestVariantOneTemplate
