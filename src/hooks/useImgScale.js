import { useState, useEffect, useRef } from 'react';

export const useImgScale = (
  w = 0 /* img width in px */,
  h = 0 /* img height in px */,
  isScale = false,
) => {
  const imgRef = useRef(null)
  const [scale, setScale] = useState(null)

  useEffect(() => {
    if (!isScale || (!w && !h)) {
      return (setScale('none'))
    }

    if (imgRef.current) {
      const { clientWidth: cw, clientHeight: ch } = imgRef.current
      const wRatio = w / cw
      const hRatio = h / ch
      const scale = wRatio > hRatio ? 'h' : 'w'
      setScale(scale)
    }

    return () => (imgRef.current ? imgRef.current = null : undefined)
  }, [h, w, isScale])

  return {
    imgRef,
    scale,
  }
}
