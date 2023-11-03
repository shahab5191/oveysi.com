export const getFormattedTime = () => {
  const date = new Date()
  const month = date.getMonth()
  const day = getDay(date.toLocaleDateString())
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${MONTHES[month]} ${day} ${
    hours.toString().length === 2 ? hours : "0" + hours
  }:${minutes.toString().length === 2 ? minutes : "0" + minutes}`
}

const getDay = (date: string) => {
  const firstSlash = date.indexOf("/")
  const lastSlash = date.lastIndexOf("/")
  let day = date.slice(firstSlash + 1, lastSlash)
  return day
}

const MONTHES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
