import { HTTP_URL } from "@/config";
import axios from "axios";
import { json } from "stream/consumers";


// to get all the previous existing shapes
export default async function getExistingShapes(roomId: string) {
    try {
        const res = await axios.get(`${HTTP_URL}/api/v1/chats/${roomId}`);
        const messages = res.data.messages;
        let id;
        const shapes = messages.map((x: { message: any }) => {
            id = JSON.parse((x as any).id)
            const messageData = JSON.parse(x.message)
            const shape = messageData.shape
            return shape
        })
        return shapes
    } catch (error) {
        console.error(error)
    }

}