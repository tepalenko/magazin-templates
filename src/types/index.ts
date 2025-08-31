export interface IssueItem {
    item_type: IssueItemTypes
    article_index?: number
    title?: string
    subtitle?: string
    images?: string[]
    text?: string,
    paragraphs?: { text: string }[],
    quote?: string,
    color?: string
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
    BAVRI = 'bavri'
}
