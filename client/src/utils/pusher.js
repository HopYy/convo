import PusherClient from "pusher-js"

export const pusherClient = new PusherClient(
    process.env.REACT_APP_PUSHER_APP_KEY,
    {
        cluster: 'eu'
    }
)