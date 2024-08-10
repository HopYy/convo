import SignUp from "pages/SignUp"
import Home from "pages/Home"
import Messages from "pages/Messages"
import Friends from "pages/Friends"
import AddFriends from "pages/AddFriends"
import FriendRequests from "pages/FriendRequests"

export const publicRoutes = [
    {
        path: "/sign-up",
        element: <SignUp />,
    }
]

export const privateRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/messages",
        element: <Messages />
    },
    {
        path: "/friends",
        element: <Friends />
    },
    {
        path: "/add-friends",
        element: <AddFriends />
    },
    {
        path: "/friend-requests",
        element: <FriendRequests /> 
    },
]