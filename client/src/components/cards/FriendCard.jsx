import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import {
  removeFriendAction,
  sendFriendRequestAction,
} from "redux store/actions/friendsActions";
import CardContainer from "./CardContainer";
import { getSelectedConversationAction } from "redux store/actions/conversationActions";
import ProfileAvatar from "./ProfileAvatar";

const FriendCard = ({ friend, pending = false, friends = false }) => {
  const dispatch = useDispatch();

  const friendsIds = useSelector((state) => state.friends.userFriends).map(
    (friend) => friend._id
  );

  const [loading, setLoading] = useState(false);
  const [isPending, setIsPending] = useState(pending);
  const [isFriend, setIsFriend] = useState(
    friends || friendsIds.includes(friend._id)
  );

  const toggleFriendButton = (event) => {
    event.stopPropagation();

    if (isFriend || isPending) {
      handleRemoveFriend();
    } else if (!isPending) {
      handleAddFriend();
    }
  };

  const handleRemoveFriend = async () => {
    try {
      setLoading(true);
      dispatch(removeFriendAction(friend._id));
      setIsFriend(false);
      setIsPending(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async () => {
    try {
      setLoading(true);
      dispatch(sendFriendRequestAction(friend._id));
      setIsFriend(true);
      setIsPending(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConversation = () => {
    if (isFriend) {
      dispatch(getSelectedConversationAction(friend._id));
    }
  };

  const buttonClass =
    isFriend || isPending
      ? "bg-light-gray border border-dark-gray"
      : "bg-main-green";

  const buttonText = isPending
    ? "Pending..."
    : !isFriend
    ? "Follow"
    : "Following";

  return (
    <CardContainer onClick={handleOpenConversation}>
      <div className="flex items-center gap-2 overflow-hidden">
        <ProfileAvatar friend={friend} />
        <div className="flex gap-0.5 items-center min-w-0 max-w-full">
          <span className="text-md text-white">@</span>
          <span className="text-base text-white font-semibold tracking-wide overflow-hidden whitespace-nowrap text-ellipsis">
            {friend.username}
          </span>
        </div>
      </div>
      <div
        className={`px-5 py-1 rounded-md cursor-pointer flex gap-3 justify-center items-center transition-color duration-100 ${buttonClass}`}
        onClick={toggleFriendButton}
      >
        <span className="text-white text-sm font-semibold">{buttonText}</span>
        {loading && <ClipLoader size={17} color="white" />}
      </div>
    </CardContainer>
  );
};

export default FriendCard;
