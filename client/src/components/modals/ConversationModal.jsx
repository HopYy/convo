import { useState } from "react";
import { useDispatch } from "react-redux";
import { Pen, Trash2 } from "lucide-react";

import Modal from "components/common/Modal";
import Button from "components/common/Button";
import MessageForm from "components/forms/MessageForm";
import { deleteMessageAction } from "redux store/actions/conversationActions";

const ConversationModal = ({ message, open, onClose }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleDeleteMessage = async () => {
    setLoading(true);
    await dispatch(deleteMessageAction(message._id));
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={openEditForm}
        onClose={() => {
          setOpenEditForm(false);
        }}
      >
        <div className="flex gap-2 justify-center items-center">
          {openEditForm && (
            <MessageForm
              message={message}
              onClose={() => {
                setOpenEditForm(false);
              }}
            />
          )}
        </div>
      </Modal>
      <Modal open={open} onClose={onClose}>
        <div className="flex gap-2 justify-center items-center">
          <Button
            disabled={loading}
            onClick={() => {
              setOpenEditForm(true);
              onClose();
            }}
          >
            <Pen color="white" size={16} />
            Edit message
          </Button>
          <Button
            variant="danger"
            disabled={loading}
            onClick={handleDeleteMessage}
          >
            <Trash2 color="white" size={16} />
            Delete message
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConversationModal;
