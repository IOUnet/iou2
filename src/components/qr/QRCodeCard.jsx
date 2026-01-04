import React, { useMemo, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const containerStyle = {
    width: '100%',
    maxWidth: 420,
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 16,
    background: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
}

const titleStyle = {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#111827'
}

const captionStyle = {
    margin: 0,
    fontSize: 13,
    color: '#4b5563'
}

const qrWrapperStyle = {
    alignSelf: 'center',
    padding: 12,
    background: '#f9fafb',
    borderRadius: 12,
    border: '1px solid #e5e7eb'
}

const valueStyle = {
    fontFamily: 'ui-monospace, SFMono-Regular, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: 13,
    color: '#111827',
    wordBreak: 'break-all',
    margin: 0
}

const buttonsStyle = {
    display: 'flex',
    gap: 10,
    flexDirection: 'column'
}

const buttonBaseStyle = {
    width: '100%',
    minHeight: 44,
    borderRadius: 10,
    border: '1px solid #111827',
    background: '#111827',
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    touchAction: 'manipulation'
}

const secondaryButtonStyle = {
    ...buttonBaseStyle,
    background: '#fff',
    color: '#111827'
}

function formatValue(value) {
    if (!value) return ''
    if (value.length <= 34) return value
    return `${value.slice(0, 14)}…${value.slice(-10)}`
}

export default function QRCodeCard({ value, title = 'QR Code', caption, size = 220, onCopy }) {
    const canvasRef = useRef(null)
    const [copyState, setCopyState] = useState('idle')
    const [downloadError, setDownloadError] = useState('')

    const displayValue = useMemo(() => formatValue(value), [value])

    const handleCopy = async () => {
        if (!value) return
        try {
            if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(value)
            }
            onCopy?.(value)
            setCopyState('copied')
            setTimeout(() => setCopyState('idle'), 1500)
        } catch (error) {
            console.error('Copy failed', error)
            setCopyState('failed')
            setTimeout(() => setCopyState('idle'), 2000)
        }
    }

    const handleDownload = () => {
        if (!value) return
        try {
            const canvas = canvasRef.current
            if (!canvas || typeof canvas.toDataURL !== 'function') {
                setDownloadError('Unable to download QR')
                return
            }

            const dataUrl = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = 'iou-qr.png'
            link.click()
            setDownloadError('')
        } catch (error) {
            console.error('QR download failed', error)
            setDownloadError('Download failed')
        }
    }

    return (
        <div style={containerStyle}>
            {title ? <h3 style={titleStyle}>{title}</h3> : null}
            {caption ? <p style={captionStyle}>{caption}</p> : null}

            <div style={qrWrapperStyle}>
                <QRCodeCanvas
                    ref={canvasRef}
                    value={value || ''}
                    size={size}
                    includeMargin
                    level="M"
                    aria-label={`QR code for ${value || 'empty value'}`}
                />
            </div>

            {value ? (
                <p style={valueStyle} title={value}>
                    {displayValue}
                </p>
            ) : null}

            <div style={buttonsStyle}>
                <button
                    type="button"
                    aria-label="Copy QR value"
                    onClick={handleCopy}
                    style={buttonBaseStyle}
                >
                    {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'}
                </button>
                <button
                    type="button"
                    aria-label="Download QR code as PNG"
                    onClick={handleDownload}
                    style={secondaryButtonStyle}
                >
                    Download PNG
                </button>
                {downloadError ? (
                    <span style={{ color: '#b91c1c', fontSize: 12 }}>{downloadError}</span>
                ) : null}
            </div>
        </div>
    )
}
