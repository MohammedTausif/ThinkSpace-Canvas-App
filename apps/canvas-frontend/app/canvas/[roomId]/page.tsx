
import { RoomCanvas } from "@/components/Canvas/RoomCanvas";


async function CanvasPage({params}:{
    params :{
        roomId: string
    }
}) {
    const roomId = (await params).roomId
   
//     useEffect(() => {
// 
//         if (canvasRef.current) {
//             const canvas = canvasRef.current;
//             initDraw(canvas, "roomId")
//         }
// 
//     }, [canvasRef])

    return <RoomCanvas roomId={roomId}></RoomCanvas>

}

export default CanvasPage
