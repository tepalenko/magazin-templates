import React from 'react'
import AudioTemplate from '../components/AudioTemplate'
import { IssueItem, IssueItemTypes } from '../types'

const AudioExample: React.FC = () => {
    // Example audio item with uploaded file
    const audioItem: IssueItem = {
        item_type: IssueItemTypes.AUDIO,
        title: 'Sample Audio',
        images: ['https://example.com/cover-image.jpg'],
        audio: {
            title: 'My Audio Track',
            src: 'https://psymagazine.vsesvit.us/timestamp-audio-file.mp3' // URL from BaseFileSection upload
        }
    }

    return (
        <div style={{ width: '400px', height: '500px' }}>
            <AudioTemplate item={audioItem} index={0} />
        </div>
    )
}

export default AudioExample
