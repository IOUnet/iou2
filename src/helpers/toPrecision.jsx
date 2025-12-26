const DOT = '.'

const addZeroes = (amount) => {
  if (amount === 0) {
    return '0'
  }
  return new Array(amount).fill(0).join('')
}

const addDelimiter = (integer) => {
  let formatted = ''
  const arr = Array.from(integer)
  while (arr.length > 3) {
    const part = arr.splice(-3).join('')
    formatted = formatted ? `${part} ${formatted}` : part
  }
  return `${arr.join('')} ${formatted}`
}

// value without exponent
export const toPrecision = (value = '0.0', precision = 0, delimiter = true) => {
  const valueNum = Number(value)

  if (Number.isNaN(valueNum) || Number.isNaN(precision)) {
    return value
  }

  const dotIndex = value.indexOf(DOT)
  let integer = (dotIndex === -1) ? value : value.substring(0, dotIndex)
  const decimal = (dotIndex === -1) ? '' : value.substring(dotIndex + 1)

  if (delimiter && integer.length > 3) {
    integer = addDelimiter(integer)
  }

  if (precision < 0) {
    return `${integer}${decimal ? `${DOT}${decimal}` : ''}`
  }

  if (dotIndex === -1) {
    return `${integer}${DOT}${addZeroes(precision)}`
  }

  if (precision === 0) {
    return integer
  }

  if (decimal.length > precision) {
    return `${integer}${DOT}${decimal.substring(0, precision)}...`
  }

  if (decimal.length < precision) {
    return `${integer}${DOT}${decimal}${addZeroes(precision - decimal.length)}`
  }

  return value
}
