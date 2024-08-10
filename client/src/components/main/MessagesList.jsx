import { useRef, useMemo, memo, useEffect } from "react";

import GroupMessages from "./GroupMessages";

const MemoizedGroupMessages = memo(GroupMessages);

const MessagesList = ({ conversation, groupedMessages }) => {
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [groupedMessages]);

  const memoizedConversationMessage = useMemo(() => {
    if (conversation && groupedMessages.length > 0) {
      return groupedMessages.map((group, index) => (
        <MemoizedGroupMessages
          key={index}
          group={group}
          isLastGroup={groupedMessages.length - 1 === index}
          friend={conversation.friend}
        />
      ));
    }
    return null;
  }, [groupedMessages, conversation]);

  return (
    <div
      ref={conversationRef}
      className="flex-1 flex flex-col-reverse overflow-y-auto bg-dark-gray"
    >
      <div className="max-lg:px-1 px-12 py-5">
        {memoizedConversationMessage}
      </div>
    </div>
  );
};

export default MessagesList;
