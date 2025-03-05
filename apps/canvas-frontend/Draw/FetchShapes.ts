import { HTTP_URL } from "@/config";
import axios from "axios";


// to get all the previous existing shapes
export default async function getExistingShapes(roomId: string) {
    try {
        const res = await axios.get(`${HTTP_URL}/api/v1/chats/${roomId}`);
        const messages = res.data.messages;
        
        const shapes = messages.map((x: {id: any , message: any}) => {
            const messageData = JSON.parse(x.message)

            let shape = messageData.shape;
            if(shape.message){
                shape = shape.message;
            }
            return {id: x.id , ...shape }
        })
        console.log("shapes" , shapes)
        return shapes
    } catch (error) {
        console.error(error);
        return []
    }

}