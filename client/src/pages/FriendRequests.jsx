import { useState, useEffect, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import { getAllFriendRequestsAction } from "redux store/actions/friendsActions";
import Error from "components/common/Error";
import FriendRequestCard from "components/cards/FriendRequestCard";

const MemoizedFriendRequestCard = memo(FriendRequestCard);

const FriendRequests = () => {
  const friendRequests = useSelector((state) => state.friends.friendRequests);
  const errorMessage = useSelector((state) => state.friends.errorMessage);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFriendRequestsAction()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const memoizedFriendRequestsCards = useMemo(
    () =>
      friendRequests.map((request) => (
        <MemoizedFriendRequestCard key={request._id} friend={request.sender} />
      )),
    [friendRequests]
  );

  if (loading) {
    return (
      <div className="flex justify-center">
        <ClipLoader size={30} color="white" />
      </div>
    );
  }

  if (errorMessage) {
    return <Error errorMessage={errorMessage} />;
  }

  if (friendRequests.length > 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        {memoizedFriendRequestsCards}
      </div>
    );
  }

  return (
    <div className="p-4 m-5 bg-dark-gray rounded-lg text-center">
      <h1 className="text-white text-lg font-semibold">
        You have no new friend requests
      </h1>
    </div>
  );
};

export default FriendRequests;
