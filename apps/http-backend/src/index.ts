import express from  'express'
import UserRoutes from './routes/userRoutes'
import RoomRoutes from './routes/roomRoutes'
import ChatRoutes from './routes/chatsRoutes'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', UserRoutes)
app.use('/api/v1',  RoomRoutes)
app.use('/api/v1/chats', ChatRoutes)

app.listen(4000, ()=>{
    console.log(`http server listening at port: 4000`)
})
