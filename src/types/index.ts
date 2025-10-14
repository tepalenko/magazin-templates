export interface IssueItem {
    item_type: IssueItemTypes
    article_index?: number
    title?: string
    subtitle?: string
    images?: string[]
    content_list?: { title: string, description?: string, category?: string }[]
    text?: string,
    paragraphs?: { text: string }[],
    quote?: string,
    color?: string,
    test?: {
        description?: string,
        steps: {
            title: string,
            options: {
                title: string,
                points: number
            }[]
        }[],
        results: {
            start: number,
            end: number,
            text: string
        }[]
    },
    downloadButton?: {
        text: string,
        url: string,
        color: string
    },
    carousel?: {
        items: {
            text?: string,
            buttonText?: string
        }[]
    },
    audio?: {
        title?: string,
        src?: string
    },
    video?: {
        title?: string,
        src?: string
    }
}

export enum IssueItemTypes {
    CONTENT_LIST = 'content_list',
    EDITOR_LETTER = 'editor_letter',
    EDITOR_LETTER_GAP = 'editor_letter_gap',
    HALF_IMAGE = 'half_image',
    THIRD_IMAGE = 'third_image',
    FULL_IMAGE = 'full_image',
    VIDEO = 'video',
    FOCUS = 'focus',
    GREEN = 'green',
    ETHERNAL = 'ethernal',
    STUDIO = 'studio',
    BAVRI = 'bavri',
    TEST_VARIANT_ONE = 'test_variant_one',
    CAROUSEL_VARIANT_ONE = 'carousel_variant_one',
    AUDIO = 'audio'
}
