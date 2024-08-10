import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MessageForm from "components/forms/MessageForm";
import Convo from "assets/convo.png";
import Error from "components/common/Error";
import MessagesList from "./MessagesList";
import useMessageHandlers from "hooks/useMessageHandlers";
import useWindowSize from "hooks/useWindowSize";
import Header from "./Header";

const DisplayMessages = () => {
  const conversation = useSelector(
    (state) => state.conversations.selectedConversation
  );
  const messages = useSelector((state) => state.conversations.messages);
  const errorMessage = useSelector(
    (state) => state.conversations.errorSelectedConversation
  );
  const open = useSelector((state) => state.profile.open);

  const { width } = useWindowSize();

  const [groupedMessages, setGroupedMessages] = useState([]);

  useMessageHandlers(conversation, setGroupedMessages);

  useEffect(() => {
    setGroupedMessages(messages.length > 0 ? messages : []);

    return () => {
      setGroupedMessages([]);
    };
  }, [messages]);

  if (width < 768 && (!conversation || open)) {
    return null;
  }

  return (
    <div
      className={`md:border-l border-white/10 flex flex-col flex-1 min-w-0
        ${
          conversation
            ? "flex-col bg-dark-gray"
            : "justify-center items-center bg-light-gray"
        }`}
    >
      {conversation && (
        <>
          <Header conversation={conversation} />
          <MessagesList
            conversation={conversation}
            groupedMessages={groupedMessages}
          />
          <MessageForm />
        </>
      )}
      {!conversation && (
        <img className="w-52 h-52" loading="lazy" src={Convo} alt="Logo" />
      )}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  );
};

export default DisplayMessages;
