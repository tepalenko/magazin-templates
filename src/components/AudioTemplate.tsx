import React, { useEffect, useRef, useState } from 'react'
import {
    Typography,
    Box,
    Button,
    IconButton,
    LinearProgress,
    Grid
} from '@mui/material'
import {
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    VolumeUp as VolumeIcon,
    VolumeOff as MuteIcon,
} from '@mui/icons-material'
import WaveSurfer from 'wavesurfer.js'
import { IssueItem } from '../types'

interface AudioTemplateProps {
    item: IssueItem
    index: number
}

const AudioTemplate: React.FC<AudioTemplateProps> = ({ item }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const wavesurferRef = useRef<WaveSurfer | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!containerRef.current || !item.audio?.src) return

        // Initialize WaveSurfer
        wavesurferRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#d0d0d0',
            progressColor: '#30304d',
            cursorColor: '#30304d',
            height: 60,
            normalize: true,
            backend: 'WebAudio',
            mediaControls: false,
            barWidth: 2,
            barGap: 2
        })

        // Load audio file
        wavesurferRef.current.load(item.audio.src)

        // Event listeners
        wavesurferRef.current.on('ready', () => {
            setIsLoading(false)
            setDuration(wavesurferRef.current?.getDuration() || 0)
        })

        wavesurferRef.current.on('play', () => setIsPlaying(true))
        wavesurferRef.current.on('pause', () => setIsPlaying(false))
        wavesurferRef.current.on('finish', () => setIsPlaying(false))

        wavesurferRef.current.on('audioprocess', () => {
            setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0)
        })

        wavesurferRef.current.on('interaction', () => {
            setCurrentTime(wavesurferRef.current?.getCurrentTime() || 0)
        })

        // Cleanup
        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy()
                wavesurferRef.current = null
            }
        }
    }, [item.audio?.src])

    const togglePlay = () => {
        if (!wavesurferRef.current) return
        wavesurferRef.current.playPause()
    }

    const toggleMute = () => {
        if (!wavesurferRef.current) return
        wavesurferRef.current.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${minutes}:${secondsStr}`
    }

    if (!item.audio?.src) {
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
                    No audio file available
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0ece6',
            position: 'relative'
        }}>
            <Grid container sx={{ p: 4, pt: 14 }} spacing={5}>
                <Grid item xs={12}>
                    {item.images && item.images.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            <img
                                src={item.images[0]}
                                alt="Audio cover"
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderRadius: 42
                                }}
                            />
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {/* Waveform Container */}
                    <Box sx={{
                        flex: 1,
                        px: 2,
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {isLoading && (
                            <Box sx={{ mb: 2 }}>
                                <LinearProgress />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                                    Loading audio...
                                </Typography>
                            </Box>
                        )}

                        <Box
                            ref={containerRef}
                            sx={{
                                width: '100%',
                                opacity: isLoading ? 0.5 : 1,
                                transition: 'opacity 0.3s ease'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {/* Controls */}
                    <Box sx={{
                        px: 2,
                        pb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        {/* Play/Pause Button */}
                        <IconButton
                            onClick={togglePlay}
                            disabled={isLoading}
                            sx={{
                                bgcolor: '#30304d',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: '#404060',
                                },
                                '&:disabled': {
                                    bgcolor: '#ccc',
                                }
                            }}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </IconButton>

                        {/* Time Display */}
                        <Typography variant="body2" color="text.secondary">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </Typography>

                        {/* Mute Button */}
                        <IconButton
                            onClick={toggleMute}
                            disabled={isLoading}
                            sx={{
                                color: '#30304d',
                                '&:hover': {
                                    bgcolor: 'rgba(48, 48, 77, 0.1)',
                                }
                            }}
                        >
                            {isMuted ? <MuteIcon /> : <VolumeIcon />}
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AudioTemplate
