const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt)
    const now = new Date()
    const options = { month: "long", day: "numeric", year: "numeric" }
    const dateString = date.toLocaleDateString("en-US", options)
    const day = date.getDate()
    let suffix

    if (day % 10 === 1 && day !== 11) {
        suffix = "st"
    } else if (day % 10 === 2 && day !== 12) {
        suffix = "nd"
    } else if (day % 10 === 3 && day !== 13) {
        suffix = "rd"
    } else {
        suffix = "th"
    }

    const timeString = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
    })
    const weekday = date.toLocaleDateString("en-US", { weekday: 'long' })
    const dayDate = dateString.split(",")[0] + suffix + ", " + date.getFullYear()

    const isSameDay = date.toDateString() === now.toDateString()
    const isSameWeek = (now - date) / (1000 * 60 * 60 * 24) < 7 && now.getDay() >= date.getDay()

    if (isSameDay) {
        return timeString
    } else if (isSameWeek) {
        return weekday
    } else {
        return dayDate
    }
}

module.exports = formatCreatedAt
