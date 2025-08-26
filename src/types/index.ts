export interface IssueItem {
    item_type: IssueItemTypes
    title?: string
    subtitle?: string
    images?: string[]
    text?: string,
    paragraphs?: { text: string }[],
    quote?: string
}

export enum IssueItemTypes {
    EDITOR_LETTER = 'editor_letter',
    EDITOR_LETTER_GAP = 'editor_letter_gap',
    HALF_IMAGE = 'half_image',
    THIRD_IMAGE = 'third_image',
    FULL_IMAGE = 'full_image',
    VIDEO = 'video',
}
