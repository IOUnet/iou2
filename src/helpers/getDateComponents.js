const formatted = (timeComponent) => timeComponent < 10 ? `0${timeComponent}` : String(timeComponent)

export const getDateComponents = (dateTimestamp /* in ms */) => {
  if (!dateTimestamp) {
    return null
  }

  const date = new Date(dateTimestamp)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return {
    year: String(year),
    month: formatted(month),
    day: formatted(day),
    hour: formatted(hours),
    minute: formatted(minutes),
  }
}
