export function buildIOULink(key = '') {
    const origin = typeof window !== 'undefined' && window?.location?.origin
        ? window.location.origin
        : ''

    const safeKey = key ?? ''
    return `${origin}/find-buy-iou?key=${encodeURIComponent(safeKey)}`
}
