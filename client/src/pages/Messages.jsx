import { useState, useEffect, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import Error from "components/common/Error";
import { getConversationsAction } from "redux store/actions/conversationActions";
import useConversationHandlers from "hooks/useConversationHandlers";
import MessageCard from "components/cards/MessageCard";

const MemoizedMessageCard = memo(MessageCard);

const Messages = () => {
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state) => state.conversations.conversations
  );
  const errorMessage = useSelector((state) => state.conversations.errorMessage);

  const [loading, setLoading] = useState(true);
  const [sortedConversations, setSortedConversations] = useState([]);

  useConversationHandlers(setSortedConversations);

  useEffect(() => {
    dispatch(getConversationsAction()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    setSortedConversations(conversations.length > 0 ? conversations : []);
  }, [conversations]);

  const memoizedMessageCard = useMemo(
    () =>
      sortedConversations.map((conversation) => (
        <MemoizedMessageCard
          key={conversation._id}
          conversation={conversation}
        />
      )),
    [sortedConversations]
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

  if (sortedConversations.length > 0) {
    return <div className="flex-1 overflow-y-auto">{memoizedMessageCard}</div>;
  }

  return (
    <div className="p-4 m-5 bg-dark-gray rounded-lg text-center">
      <h1 className="text-white text-lg font-semibold">
        You have no conversations
      </h1>
    </div>
  );
};

export default Messages;
