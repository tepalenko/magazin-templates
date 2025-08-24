/**
 * Utility functions for template components
 */

/**
 * Formats item type name from snake_case to Title Case
 * @param type - The item type string
 * @returns Formatted string
 */
export const formatItemTypeName = (type: string): string => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}
