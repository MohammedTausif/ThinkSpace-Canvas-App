import express from  'express'
import { signin, signup } from './controllers/Auth'
import { UserMiddleware } from './middlewares/UserAuth';
import { CreateRoom } from './controllers/room';
import UserRoutes from './routes/UserRoutes'

const app = express();
app.use(express.json())

app.use('/user', UserRoutes)
app.post('/room', UserMiddleware, CreateRoom)

app.listen(4000, ()=>{
    console.log(`http server listening at port: 4000`)
})
