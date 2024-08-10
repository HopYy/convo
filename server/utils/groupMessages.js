const sameDay = (prev, curr) => {
    const prevDate = new Date(prev.createdAt)
    const currDate = new Date(curr.createdAt)

    if( prevDate.getDate() === currDate.getDate() &&
        prevDate.getMonth() === currDate.getMonth() &&
        prevDate.getFullYear() === currDate.getFullYear()
    ) {
        return true
    }
    return false
}

const groupMessages = (messages) => {
    let messagesGroup = [[]]

    if (messages.length > 0) {
        messagesGroup[messagesGroup.length - 1].push(messages[0])
        messages.forEach((message, index) => {
            if (index > 0 && index <= messages.length - 1) {
                const prevMessage = messages[index - 1]
                if (prevMessage.sender.equals(message.sender)) {
                    if (sameDay(prevMessage, message)) {
                        messagesGroup[messagesGroup.length - 1].push(message)
                    } else {
                        messagesGroup.push([message])
                    }
                } else {
                    messagesGroup.push([message])
                }
            }
        })

        return messagesGroup
    } else {
        return messages
    }
}

module.exports = groupMessages