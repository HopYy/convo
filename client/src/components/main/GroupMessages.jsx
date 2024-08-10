import { useDispatch, useSelector } from "react-redux";

import ConversationMessage from "./ConversationMessage";
import {
  OPEN_SIDEBAR,
  USER_SIDEBAR,
} from "redux store/constants/profileConstants";

const GroupMessages = ({ group, isLastGroup, friend }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const isUserSender = group.length > 0 && group[0].sender === user._id;
  const seen =
    isLastGroup &&
    group.length > 0 &&
    group[group.length - 1].seen &&
    group[group.length - 1].sender === user._id;

  const handleOpenSidebar = () => {
    dispatch({
      type: isUserSender ? USER_SIDEBAR : OPEN_SIDEBAR,
      payload: isUserSender ? user : friend,
    });
  };

  return (
    <div
      className={`max-lg:py-3 my-0.5 flex ${
        isUserSender ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`flex ${isUserSender && "flex-row-reverse"}`}>
        <div
          className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
          onClick={handleOpenSidebar}
        >
          <img
            src={isUserSender ? user.avatar : friend.avatar}
            className="w-full h-full object-center object-cover"
            alt="Avatar"
          />
        </div>
        <div
          className={`flex flex-1 flex-col mx-2 ${
            isUserSender ? "items-end" : "items-start"
          }`}
        >
          {group.length > 0 && (
            <div
              className={`flex gap-2 items-center ${
                isUserSender ? "justify-end" : "justify-start flex-row-reverse"
              }`}
            >
              <span className="text-gray-300 text-xs">
                {group[0].createdAt}
              </span>
              <span className="text-white text-sm font-semibold">
                {isUserSender ? "You" : friend.name}
              </span>
            </div>
          )}
          {group.map((message) => (
            <ConversationMessage
              key={message._id}
              message={message}
              friend={friend}
            />
          ))}
          {seen && (
            <div className="my-0.5">
              <span className="text-gray-300 float-right">seen</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupMessages;
