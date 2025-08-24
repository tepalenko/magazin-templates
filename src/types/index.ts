export interface IssueItem {
    item_type: IssueItemTypes
    title?: string
    subtitle?: string
    images?: string[]
    text?: string
}

export enum IssueItemTypes {
    EDITOR_LETTER = 'editor_letter',
    HALF_IMAGE = 'half_image',
    FULL_IMAGE = 'full_image',
    VIDEO = 'video',
}
