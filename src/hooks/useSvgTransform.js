import { useState, useEffect, useRef } from 'react';

export const useSvgTransform = (
  w = 0 /* svg width in px */,
  h = 0 /* svg height in px */,
  isScale = true,
) => {
  const svgRef = useRef(null)
  const [transform, setTransform] = useState(null)

  useEffect(() => {
    if (svgRef.current) {
      const { x, y, width, height } = svgRef.current.getBBox()

      const scaleX = w / width
      const scaleY = h / height
      const scaleResult = Math.min(scaleX, scaleY)
      const scale = `scale(${scaleResult})`

      const translateY = (h - height * scaleResult) / 2 - y * scaleResult
      const translateX = (w - width * scaleResult) / 2 - x * scaleResult
      const translate = `translate(${translateX}, ${translateY})`

      setTransform(`${translate} ${isScale ? scale : ''}`.trim())
    }

    return () => (svgRef.current ? svgRef.current = null : undefined)
  }, [h, w, isScale])

  return {
    svgRef,
    transform,
  }
}
