import { useState, useEffect, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import { getNewFriendsAction } from "redux store/actions/friendsActions";
import FriendCard from "components/cards/FriendCard";
import Error from "components/common/Error";

const MemoizedFriendCard = memo(FriendCard);

const AddFriends = () => {
  const dispatch = useDispatch();
  const newFriends = useSelector((state) => state.friends.newFriends);
  const errorMessage = useSelector((state) => state.friends.errorMessage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getNewFriendsAction()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const memoizedFriendCards = useMemo(
    () =>
      newFriends.map((friend) => (
        <MemoizedFriendCard key={friend._id} friend={friend} />
      )),
    [newFriends]
  );

  if (loading) {
    return (
      <div className="flex justify-center">
        <ClipLoader size={30} color="white" />
      </div>
    );
  }

  if (newFriends.length > 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        {errorMessage && <Error errorMessage={errorMessage} />}
        {memoizedFriendCards}
      </div>
    );
  }

  return (
    <div className="p-4 m-5 bg-dark-gray rounded-lg text-center">
      <h1 className="text-white text-lg font-semibold">
        It looks like there are no friends to add right now
      </h1>
    </div>
  );
};

export default AddFriends;
