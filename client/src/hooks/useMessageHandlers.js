import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { pusherClient } from "utils/pusher"
import {
  getNewestConversationAction,
  seenMessageAction,
} from "redux store/actions/conversationActions"

const useMessageHandlers = (conversation, setGroupedMessages) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const messageHandler = (message) => {
      dispatch(seenMessageAction(conversation._id))
      dispatch(getNewestConversationAction(conversation._id))

      setGroupedMessages((current) => {
        const lastGroup = current[current.length - 1]
        if (lastGroup && lastGroup[0].sender === message.sender) {
          return [...current.slice(0, -1), [...lastGroup, message]]
        } else {
          return [...current, [message]]
        }
      })
    }

    const updateMessageSeenHandler = (message) => {
      setGroupedMessages((current) => {
        return current.map((group) => (
          group.map((mess) => (
            mess._id === message._id ? message : mess
          ))
        )
        )
      })
    }

    const deleteMessageSeenHandler = (message) => {
      setGroupedMessages((current) =>
        current
          .map((group) => (
            group.filter((mess) => (
              mess._id !== message._id
            ))
          )
          )
          .filter((group) => (
            group.length > 0
          ))
      )
    }

    const editMessageSeenHandler = (message) => {
      setGroupedMessages((current) =>
        current.map((group) => (
          group.map((mess) => (
            mess._id === message._id ? message : mess
          ))
        )
        )
      )
    }

    if (conversation) {
      dispatch(seenMessageAction(conversation._id))

      pusherClient.subscribe(conversation._id)
      pusherClient.bind("message:new", messageHandler)
      pusherClient.bind("message:update", updateMessageSeenHandler)
      pusherClient.bind("message:edit", editMessageSeenHandler)
      pusherClient.bind("message:delete", deleteMessageSeenHandler)
    }

    return () => {
      if (conversation) {
        pusherClient.unsubscribe(conversation._id)
        pusherClient.unbind("message:new", messageHandler)
        pusherClient.unbind("message:update", updateMessageSeenHandler)
        pusherClient.unbind("message:edit", editMessageSeenHandler)
        pusherClient.unbind("message:delete", deleteMessageSeenHandler)
      }
    }
  }, [conversation, dispatch, setGroupedMessages])
}

export default useMessageHandlers
