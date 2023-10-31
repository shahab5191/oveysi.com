export const getFormattedTime = () => {
  const date = new Date()
  const month = date.getMonth()
  const day = date.toLocaleDateString().slice(3,5)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${MONTHES[month]} ${day} ${hours}:${minutes}`
}

const MONTHES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]