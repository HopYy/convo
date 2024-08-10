import { useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";

import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { removeFriendAction } from "redux store/actions/friendsActions";
import { clearConversationAction } from "redux store/actions/conversationActions";

const RemoveFriendModal = ({ friendId, conversationId, open, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleBlockFriend = async () => {
    setLoading(true);
    await dispatch(removeFriendAction(friendId));
    if (conversationId) await dispatch(clearConversationAction(conversationId));
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      {!loading && (
        <>
          <h1 className="text-white text-md font-semibold mb-6">
            Are you sure you want to unfollow this profile?
          </h1>
          <div className="flex items-center gap-4">
            <Button disabled={loading} variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="danger"
              onClick={handleBlockFriend}
            >
              Unfollow profile
            </Button>
          </div>
        </>
      )}
      {loading && <ClipLoader color="white" />}
    </Modal>
  );
};

export default RemoveFriendModal;
