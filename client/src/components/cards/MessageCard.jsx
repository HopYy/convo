import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "lucide-react";

import CardContainer from "./CardContainer";
import ProfileAvatar from "./ProfileAvatar";
import { getSelectedConversationAction } from "redux store/actions/conversationActions";

const MessageCard = ({ conversation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [seen, setSeen] = useState(true);

  const handleOpenConversation = () => {
    dispatch(getSelectedConversationAction(conversation.friend._id));
    setSeen(true);
  };

  useEffect(() => {
    setSeen(
      !conversation.lastMessage.seen &&
        conversation.lastMessage.sender !== user._id
        ? false
        : true
    );
  }, [conversation, user]);

  const messageMediaText =
    conversation.lastMessage.sender === conversation.friend._id
      ? "Media"
      : "You: Media";

  const messageBodyText =
    conversation.lastMessage.sender === conversation.friend._id
      ? conversation.lastMessage.body
      : `You: ${conversation.lastMessage.body}`;

  return (
    <div className="cursor-pointer">
      <CardContainer onClick={handleOpenConversation}>
        <div className="flex grow justify-between items-start max-w-full">
          <div className="flex items-center gap-2 overflow-hidden">
            <ProfileAvatar friend={conversation.friend} />
            <div className="min-w-0 max-w-full">
              <h3 className="text-base text-white font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                {conversation.friend.name}
              </h3>
              <div
                className={`whitespace-nowrap overflow-hidden text-ellipsis ${
                  seen ? "text-gray-300" : "text-white font-semibold"
                }`}
              >
                {conversation.lastMessage.media ? (
                  <div className="flex gap-1 items-center">
                    <span>{messageMediaText}</span>
                    <Image size={18} color="rgb(209 213 219)" />
                  </div>
                ) : (
                  <span
                    className={
                      seen ? "text-gray-300" : "text-white font-semibold"
                    }
                  >
                    {messageBodyText}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-sm whitespace-nowrap text-gray-300">
            {conversation.lastMessage.createdAt}
          </span>
        </div>
      </CardContainer>
    </div>
  );
};

export default MessageCard;
