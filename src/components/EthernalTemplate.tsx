import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

interface EthernalTemplateProps {
    item: IssueItem
    index: number
}

const EthernalTemplate: React.FC<EthernalTemplateProps> = ({ item }) => {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            overflow: 'hidden',
            position: "relative",
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column'
        }}>

            {item.images && item.images.length > 0 && (
                <Box sx={{
                    height: '50%',
                    width: '100%',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}>
                    <img
                        src={item.images[0]}
                        alt="Item Image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            )}
            <Box sx={{
                position: 'absolute',
                width: '90%',
                top: '40%',
                right: 0,
                height: '60%',
                backgroundColor: "#fff",
                p: 2,
                pl: 3,
                pt: 3,
                overflow: 'auto',
                zIndex: 1
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'flex-start' }}>
                    {item.title &&
                        <Box sx={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-start', pr: 1 }}>
                            <Box sx={{ mt: 1, width: 2, height: 36, backgroundColor: item.color ?? 'pink' }} />
                        </Box>
                    }
                    <Box sx={{ flex: 2 }}>
                        {item.title && <Typography variant="h1" sx={{
                            textAlign: 'left',
                            fontFamily: 'Nyght Serif, serif',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 400,
                            fontSize: '2rem',

                        }}>
                            {item.title}
                        </Typography>}

                        {item.text && (
                            <Box sx={{ p: 2 }}>
                                <RichTextRenderer
                                    content={item.text}
                                    color={item.color}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>




            </Box>

        </Box>
    )
}

export default EthernalTemplate;
