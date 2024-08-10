import { useState, useEffect, cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CLOSE_CONVERSATION } from "redux store/constants/conversationConstants";
import { CLOSE_SIDEBAR } from "redux store/constants/profileConstants";
import useWindowSize from "hooks/useWindowSize";

const SidebarIcon = ({ icon }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showLabel, setShowLabel] = useState(false);
  const [iconSize, setIconSize] = useState(false);

  const { width } = useWindowSize();

  const handleMouseEnter = (label) => {
    setHoveredIcon(label);
    setTimeout(() => {
      setShowLabel(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
    setShowLabel(false);
  };

  const triggerSize = () => {
    if (width < 768) {
      dispatch({
        type: CLOSE_CONVERSATION,
      });

      dispatch({
        type: CLOSE_SIDEBAR,
      });
    }

    setIconSize(true);
    if (icon.href) {
      navigate(icon.href);
    }
  };

  useEffect(() => {
    if (iconSize) {
      setTimeout(() => {
        setIconSize(false);
      }, 150);
    }
  }, [iconSize]);

  const color = location.pathname === icon.href ? "#258c60" : "#c3c5ca";
  const className = `transition-all duration-150 ${
    iconSize ? "scale-75" : "scale-110"
  }`;

  return (
    <div className="md:w-20 flex place-content-center relative sc">
      <div
        className="cursor-pointer"
        onClick={triggerSize}
        onMouseEnter={() => handleMouseEnter(icon.label)}
        onMouseLeave={handleMouseLeave}
      >
        {cloneElement(icon.icon, {
          color,
          className,
        })}
      </div>
      {location.pathname === icon.href && (
        <div className="max-md:hidden w-1 h-6 absolute top-0 left-0 bg-main-green rounded-r-md" />
      )}
      <div className="absolute left-full">
        <div
          className={`max-md:hidden w-max ml-2 flex items-center p-1 bg-dark-gray rounded-md -translate-x-3 transition-all ${
            hoveredIcon === icon.label && showLabel
              ? "visible translate-x-0"
              : "invisible"
          }`}
        >
          <span className="text-xs text-white font-semibold">{icon.label}</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarIcon;
