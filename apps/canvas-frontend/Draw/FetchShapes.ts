import { HTTP_URL } from "@/config";
import axios from "axios";


// to get all the previous existing shapes
export default async function getExistingShapes(roomId:string) {
    const res = await axios.get(`${HTTP_URL}/api/v1/chats/${roomId}`);
    const messages = res.data.messages;
    const shapes = messages.map((x: {message : any})=>{
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })
    return shapes;
}