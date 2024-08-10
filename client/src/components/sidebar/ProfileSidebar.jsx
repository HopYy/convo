import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import { CLOSE_SIDEBAR } from "redux store/constants/profileConstants";
import BlockFriend from "./BlockFriend";
import EditProfile from "./EditProfile";
import DeleteProfile from "./DeleteProfile";
import Button from "components/common/Button";
import SignOutModal from "components/modals/SignOutModal";

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.profile.open);
  const profile = useSelector((state) => state.profile.profile);
  const isUser = useSelector((state) => state.profile.isUser);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseSidebar = () => {
    dispatch({
      type: CLOSE_SIDEBAR,
    });
  };

  return (
    <div
      className={`max-h-full overflow-y-auto md:border-l border-white/10 h-screen bg-light-gray flex flex-col justify-between items-center gap-4 transition-all ${
        open ? "max-md:w-screen md:w-1/5 md:min-w-72 p-4" : "w-0 p-0"
      }`}
    >
      {profile && (
        <>
          <div className="w-full space-y-8">
            <div className="w-full flex justify-end">
              <X
                className="cursor-pointer"
                color="white"
                onClick={handleCloseSidebar}
              />
            </div>
            <div className="mx-auto w-40 h-40 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={profile.avatar}
                alt="Avatar"
              />
            </div>
            <div className="text-center">
              <h1 className="text-white text-xl font-bold tracking-wider overflow-hidden whitespace-nowrap text-ellipsis">
                {profile.name}
              </h1>
              <h1 className="text-white/70 text-md font-semibold tracking-wider overflow-hidden whitespace-nowrap text-ellipsis">
                @{profile.username}
              </h1>
            </div>
            <div className="text-start">
              <span className="text-white text-lg font-bold tracking-wider">
                Bio:
              </span>
              <p className="text-white/70">{profile.bio}</p>
            </div>
          </div>
          {isUser && (
            <div className="flex flex-col gap-y-4">
              <Button
                variant="danger"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Sign out
              </Button>
              <SignOutModal
                open={openModal}
                onClose={() => {
                  setOpenModal(false);
                }}
              />
              <EditProfile />
              <DeleteProfile />
            </div>
          )}
          {!isUser && <BlockFriend friend={profile} />}
        </>
      )}
    </div>
  );
};

export default ProfileSidebar;
