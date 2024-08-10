import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  MessageSquareText,
  User,
  UserPlus,
  Handshake,
  LogOut,
} from "lucide-react";

import SidebarIcon from "./SidebarIcon";
import { USER_SIDEBAR } from "redux store/constants/profileConstants";
import SignOutModal from "components/modals/SignOutModal";

const icons = {
  top: [
    {
      label: "Messages",
      href: "/messages",
      icon: <MessageSquareText />,
    },
    {
      label: "Friends",
      href: "/friends",
      icon: <User />,
    },
    {
      label: "Add Friend",
      href: "/add-friends",
      icon: <UserPlus />,
    },
    {
      label: "Friend Request",
      href: "/friend-requests",
      icon: <Handshake />,
    },
  ],
  bottom: {
    label: "Sign out",
    href: null,
    icon: <LogOut />,
  },
};

const Sidebar = ({ user }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpenUserSidebar = () => {
    dispatch({
      type: USER_SIDEBAR,
      payload: user,
    });
  };

  return (
    <div className="max-md:w-screen max-md:h-20 w-20 h-screen flex md:flex-col md:justify-between items-center py-5 bg-dark-gray">
      <div className="max-md:flex max-md:justify-evenly max-md:items-center max-md:grow md:space-y-8">
        {icons.top.map((icon) => (
          <SidebarIcon key={icon.href} icon={icon} />
        ))}
        <div
          className="md:hidden w-9 h-9 overflow-hidden rounded-full cursor-pointer"
          onClick={handleOpenUserSidebar}
        >
          <img
            className="w-full h-full object-cover object-center"
            src={user.avatar}
            alt="Avatar"
            loading="lazy"
          />
        </div>
      </div>
      <div className="max-md:hidden flex flex-col items-center gap-y-8">
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          <SidebarIcon icon={icons.bottom} />
        </div>
        <SignOutModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
        <div
          className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
          onClick={handleOpenUserSidebar}
        >
          <img
            className="w-full h-full object-cover object-center"
            src={user.avatar}
            alt="Avatar"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
