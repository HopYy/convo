import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { deleteProfileAction } from "redux store/actions/authActions";

const DeleteProfileModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteProfile = async () => {
    setLoading(true);
    await dispatch(deleteProfileAction());
    setLoading(false);
    navigate("/sign-in");
  };

  return (
    <Modal open={open} onClose={onClose}>
      {!loading && (
        <>
          <h1 className="text-white text-md font-semibold mb-6">
            Are you sure you want to delete this profile?
          </h1>
          <div className="flex items-center gap-4">
            <Button disabled={loading} variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="danger"
              onClick={handleDeleteProfile}
            >
              Delete profile
            </Button>
          </div>
        </>
      )}
      {loading && <ClipLoader color="white" />}
    </Modal>
  );
};

export default DeleteProfileModal;
