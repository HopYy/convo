import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = [
  {
    href: "/messages",
    title: "Messages",
  },
  {
    href: "/friends",
    title: "Friends",
  },
  {
    href: "/add-friends",
    title: "Add Friend",
  },
  {
    href: "/friend-requests",
    title: "Friend Requests",
  },
];

const Routes = () => {
  const location = useLocation();
  const [route, setRoute] = useState(titles[0]);

  useEffect(() => {
    const currRoute = titles.find((title) => title.href === location.pathname);
    setRoute(currRoute || titles[0]);
  }, [location]);

  return <h1 className="text-3xl font-bold text-white">{route.title}</h1>;
};

export default Routes;
