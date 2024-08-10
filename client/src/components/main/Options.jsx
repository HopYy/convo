import { useState } from "react";
import { useDispatch } from "react-redux";
import { EllipsisVertical } from "lucide-react";

import Button from "components/common/Button";
import { clearConversationAction } from "redux store/actions/conversationActions";
import BlockFriendModal from "components/modals/BlockFriendModal";
import RemoveFriendModal from "components/modals/RemoveFriendModal";

const Options = ({ conversation, friendId }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openUnfollowModal, setOpenUnfollowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClearConversation = async () => {
    setLoading(true);
    await dispatch(clearConversationAction(conversation._id));
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center z-50">
      <div
        className={`
            absolute top-16 right-0 space-y-2 shadow bg-light-gray rounded-lg p-2 transition-transform duration-100 transform
            ${open ? "visible translate-y-0" : "invisible -translate-y-5"}`}
      >
        <Button
          variant="danger"
          disabled={loading}
          onClick={handleClearConversation}
        >
          Clear conversation
        </Button>
        <Button
          variant="danger"
          disabled={loading}
          onClick={() => {
            setOpenUnfollowModal(true);
          }}
        >
          Remove friend
        </Button>
        <Button
          className="bg-red-500"
          disabled={loading}
          onClick={() => {
            setOpenBlockModal(true);
          }}
        >
          Block friend
        </Button>
      </div>
      <BlockFriendModal
        conversationId={conversation._id}
        friendId={friendId}
        open={openBlockModal}
        onClose={() => {
          setOpenBlockModal(false);
        }}
      />
      <RemoveFriendModal
        conversationId={conversation._id}
        friendId={friendId}
        open={openUnfollowModal}
        onClose={() => {
          setOpenUnfollowModal(false);
        }}
      />
      <div
        className={`
          cursor-pointer rounded-full p-2 transition-all duration-100
          ${open ? "bg-white/10" : "bg-white/0"}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <EllipsisVertical color="white" />
      </div>
    </div>
  );
};

export default Options;
