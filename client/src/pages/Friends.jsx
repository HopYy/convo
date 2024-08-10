import { useState, useEffect, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { getFriendsAction } from "redux store/actions/friendsActions";
import Error from "components/common/Error";
import FriendCard from "components/cards/FriendCard";

const MemoizedFriendCard = memo(FriendCard);

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.userFriends);
  const errorMessage = useSelector((state) => state.friends.errorMessage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getFriendsAction()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const memoizedFriendCards = useMemo(
    () =>
      friends.map((friend) => (
        <MemoizedFriendCard key={friend._id} friend={friend} />
      )),
    [friends]
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

  if (friends.length > 0) {
    return <div className="flex-1 overflow-y-auto">{memoizedFriendCards}</div>;
  }

  return (
    <div className="p-4 m-5 bg-dark-gray rounded-lg text-center">
      <h1 className="text-white text-lg font-semibold">
        You haven't added any friends yet
      </h1>
      <Link
        to="/add-friends"
        className="text-white text-md font-semibold pb-1 border-b border-white"
      >
        find friends
      </Link>
    </div>
  );
};

export default Friends;
