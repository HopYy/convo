import { useState } from "react";
import { useSelector } from "react-redux";

import EditProfileModal from "components/modals/EditProfileModal";
import Button from "components/common/Button";
import useProfileHandlers from "hooks/useProfileHandlers";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  useProfileHandlers(user);

  return (
    <>
      <EditProfileModal
        user={user}
        open={openModal}
        close={() => {
          setOpenModal(false);
        }}
      />
      <Button
        variant="danger"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Edit profile
      </Button>
    </>
  );
};

export default EditProfile;
