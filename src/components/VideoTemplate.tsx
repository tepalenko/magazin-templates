import React, { useState, useRef, useEffect } from 'react'
import {
    Typography,
    Box,
    IconButton,
} from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import { IssueItem } from '../types'
import { formatItemTypeName } from '../utils/templateUtils'

interface VideoTemplateProps {
    item: IssueItem
    index: number
}

const VideoTemplate: React.FC<VideoTemplateProps> = ({
    item,
    index
}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Intersection Observer to detect when component is visible
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                const newIsVisible = entry.isIntersecting && entry.intersectionRatio > 0.5
                setIsVisible(newIsVisible)

                // Auto-pause when not visible
                if (!newIsVisible && videoRef.current && !videoRef.current.paused) {
                    videoRef.current.pause()
                    setIsPlaying(false)
                }
            },
            {
                threshold: [0, 0.5, 1],
                rootMargin: '0px'
            }
        )

        observer.observe(container)

        return () => {
            observer.disconnect()
        }
    }, [])

    const handlePlayClick = () => {
        if (videoRef.current && isVisible) {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    const handleVideoPlay = () => {
        setIsPlaying(true)
    }

    const handleVideoPause = () => {
        setIsPlaying(false)
    }

    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                height: "100vh",
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'black'
            }}>
            {/* Video Container - Full Screen */}
            <Box sx={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {item.video?.src ? (
                    <>
                        <video
                            ref={videoRef}
                            src={item.video.src}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            controls={isPlaying}
                            onClick={handlePlayClick}
                            onPlay={handleVideoPlay}
                            onPause={handleVideoPause}
                            onEnded={handleVideoPause}
                        />
                        {!isPlaying && (
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2
                            }}>
                                <IconButton
                                    onClick={handlePlayClick}
                                    sx={{
                                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                                        color: 'white',
                                        width: 80,
                                        height: 80,
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.8)',
                                            transform: 'scale(1.1)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <PlayArrow sx={{ fontSize: 48 }} />
                                </IconButton>
                            </Box>
                        )}
                    </>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                            📹
                        </Typography>
                        <Typography variant="h6">
                            No video source available
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Video Description - Overlay at bottom */}
            {item.text && (
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    p: 2,
                    zIndex: 1
                }}>
                    <Typography variant="body1" color="white" sx={{ textAlign: 'justify' }}>
                        {item.text}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default VideoTemplate
