import QRCode from 'qrcode'

/**
 * Generate a data URL PNG for the provided value.
 * Returns an empty string if value is missing or generation fails.
 */
export async function generateQrDataUrl(value, options = {}) {
    if (!value) return ''

    try {
        return await QRCode.toDataURL(value, {
            errorCorrectionLevel: 'M',
            margin: 2,
            scale: 6,
            ...options,
        })
    } catch (error) {
        console.error('Failed to generate QR data URL', error)
        return ''
    }
}
