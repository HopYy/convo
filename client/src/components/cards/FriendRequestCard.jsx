import { useState } from "react";
import { useDispatch } from "react-redux";

import CardContainer from "./CardContainer";
import ProfileAvatar from "./ProfileAvatar";
import FriendCard from "./FriendCard";
import {
  acceptFriendRequestAction,
  rejectFriendRequestAction,
} from "redux store/actions/friendsActions";

const FriendRequestCard = ({ friend }) => {
  const dispatch = useDispatch();
  const [relationship, setRelationship] = useState({
    friends: false,
    decided: false,
  });

  const handleRejectFriendRequest = () => {
    setRelationship({
      friends: false,
      decided: true,
    });
    dispatch(rejectFriendRequestAction(friend._id));
  };

  const handleAcceptFriendRequest = () => {
    setRelationship({
      friends: true,
      decided: true,
    });
    dispatch(acceptFriendRequestAction(friend._id));
  };

  if (relationship.decided) {
    return <FriendCard friend={friend} friends={relationship.friends} />;
  }

  return (
    <CardContainer>
      <div className="flex items-center gap-2 overflow-hidden">
        <ProfileAvatar friend={friend} />
        <div className="flex gap-0.5 items-center min-w-0 max-w-full">
          <span className="text-md text-white">@</span>
          <span className="text-base text-white font-semibold tracking-wide overflow-hidden whitespace-nowrap text-ellipsis">
            {friend.username}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div
          className="px-3 py-1 bg-dark-gray border border-light-gray rounded-md"
          onClick={handleAcceptFriendRequest}
        >
          <span className="text-white font-semibold cursor-pointer">
            Accept
          </span>
        </div>
        <div
          className="px-3 py-1 bg-main-green rounded-md"
          onClick={handleRejectFriendRequest}
        >
          <span className="text-white font-semibold cursor-pointer">
            Reject
          </span>
        </div>
      </div>
    </CardContainer>
  );
};

export default FriendRequestCard;
