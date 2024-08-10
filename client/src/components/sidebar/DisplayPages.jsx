import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Search from "components/sidebar/Search";
import FriendCard from "components/cards/FriendCard";
import FriendRequestCard from "components/cards/FriendRequestCard";
import Routes from "./Routes";
import BlockedCard from "components/cards/BlockedCard";
import useWindowSize from "hooks/useWindowSize";

const DisplayPages = () => {
  const searchFriends = useSelector((state) => state.friends.searchFriends);
  const conversation = useSelector(
    (state) => state.conversations.selectedConversation
  );
  const open = useSelector((state) => state.profile.open);

  const { width } = useWindowSize();

  const memoizedSearchFriends = useMemo(() => {
    const {
      friends = [],
      requests = [],
      pendings = [],
      blocked = [],
      nonFriends = [],
    } = searchFriends || {};

    return (
      <>
        {friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} friends={true} />
        ))}
        {requests.map((request) => (
          <FriendRequestCard key={request._id} friend={request} />
        ))}
        {pendings.map((request) => (
          <FriendCard key={request._id} friend={request} pending={true} />
        ))}
        {blocked.map((blocked) => (
          <BlockedCard key={blocked._id} friend={blocked} />
        ))}
        {nonFriends.map((nonFriend) => (
          <FriendCard key={nonFriend._id} friend={nonFriend} />
        ))}
      </>
    );
  }, [searchFriends]);

  if (width < 768 && (conversation || open)) {
    return null;
  }

  return (
    <div className="bg-light-gray max-md:w-screen md:w-1/3 md:max-w-96 flex flex-col">
      <div className="p-5 space-y-4">
        <Routes />
        <Search />
      </div>
      {searchFriends && (
        <div className="flex-1 overflow-y-auto">{memoizedSearchFriends}</div>
      )}
      {!searchFriends && <Outlet />}
    </div>
  );
};

export default DisplayPages;
