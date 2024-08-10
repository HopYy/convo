import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { pusherClient } from "utils/pusher"
import { USER_SIDEBAR } from "redux store/constants/profileConstants"

const useProfileHandlers = (user) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const updateProfileHandler = (profile) => {
            dispatch({
                type: USER_SIDEBAR,
                payload: profile,
            })
        }

        if (user) {
            pusherClient.subscribe(user._id)
            pusherClient.bind("profile:update", updateProfileHandler)
        }

        return () => {
            if (user) {
                pusherClient.unsubscribe(user._id)
                pusherClient.unbind("profile:update", updateProfileHandler)
            }
        }
    }, [user, dispatch])
}

export default useProfileHandlers