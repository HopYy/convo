import { useEffect } from "react"
import { useSelector } from "react-redux"
import { find } from "lodash"

import { pusherClient } from "utils/pusher"

const useConversationHandlers = (setSortedConversations) => {
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const updateConversationSortHandler = (conversation) => {
      setSortedConversations((current) => {
        if (find(current, { _id: conversation._id })) {
          const updatedConversations = current.filter((convo) => (
            convo._id !== conversation._id
          ))
          const currConversation = current.find((convo) => (
            convo._id === conversation._id
          ))
          return [
            {
              ...currConversation,
              lastMessage: conversation.lastMessage
            },
            ...updatedConversations,
          ]
        }

        return [conversation, ...current]
      })
    }

    pusherClient.subscribe(user._id)
    pusherClient.bind("conversation:update", updateConversationSortHandler)

    return () => {
      pusherClient.unsubscribe(user._id)
      pusherClient.unbind("conversation:update", updateConversationSortHandler)
    }
  }, [user, setSortedConversations])
}

export default useConversationHandlers