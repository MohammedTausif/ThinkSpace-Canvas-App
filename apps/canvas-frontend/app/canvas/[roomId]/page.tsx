
import { RoomCanvas } from "@/components/Canvas/RoomCanvas";


async function CanvasPage({params}:{
    params :{
        roomId: string
    }
}) {
    const roomId = (await params).roomId



    return <RoomCanvas roomId={roomId}></RoomCanvas>

}

export default CanvasPage
