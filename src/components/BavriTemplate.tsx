import React from 'react'
import {
    Typography,
    Box,
} from '@mui/material'
import { IssueItem } from '../types'
import RichTextRenderer from './RichTextRenderer'

interface BavriTemplateProps {
    item: IssueItem
    index: number
}

const BavriTemplate: React.FC<BavriTemplateProps> = ({ item }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflow: 'hidden', position: "relative", backgroundColor: item.color ?? '#767f62', display: 'flex', flexDirection: 'column' }}>

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
                width: '100%',
                top: '25%',
                height: 'auto',
                pl: 4,
                overflow: 'auto',
                zIndex: 2,
            }}>
                {item.title && <Typography variant="h1" sx={{
                    textAlign: 'left',
                    fontFamily: 'Fixel Text, serif',
                    fontWeight: 700,
                    fontSize: '2rem',
                    color: "#fff"
                }}>
                    {item.title}
                </Typography>}

            </Box>

            <Box sx={{
                position: 'absolute',
                width: '100%',
                top: '35%',
                height: '60%',
                backgroundColor: item.color ?? "#fff",
                p: 2,
                overflow: 'auto',
                zIndex: 1,
                borderTopRightRadius: '32px',
                borderTopLeftRadius: '32px',
            }}>
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
    )
}

export default BavriTemplate;
