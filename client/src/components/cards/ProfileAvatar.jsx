import { useDispatch } from "react-redux";

import { OPEN_SIDEBAR } from "redux store/constants/profileConstants";

const ProfileAvatar = ({ friend }) => {
  const dispatch = useDispatch();

  const handleOpenSidebar = (event) => {
    event.stopPropagation();
    dispatch({
      type: OPEN_SIDEBAR,
      payload: friend,
    });
  };

  return (
    <div
      className="w-9 h-9 overflow-hidden rounded-full flex-shrink-0"
      onClick={handleOpenSidebar}
    >
      <img
        className="w-full h-full object-cover object-center"
        src={friend.avatar}
        alt="Avatar"
        loading="lazy"
      />
    </div>
  );
};

export default ProfileAvatar;
