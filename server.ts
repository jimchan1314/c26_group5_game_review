import http from "http";
import express from "express"
import path from 'path'
import expressSession from "express-session";
import { UserController } from "./controller/UserController";
import { GameRoute, GroupRoute, MessageRoute, UserRoute } from "./routes/Routes";
import * as yup from 'yup';
import { GameController } from "./controller/GameController";
import { MessageController } from "./controller/MessageController";
import { GroupController } from "./controller/GroupController";
import { Server as SocketIO } from "socket.io";
import { Socket } from "dgram";


const app = express();
const server = new http.Server(app)
const io = new SocketIO(server)



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let publicFolder = path.join(__dirname,'public');
let uploadFolder = path.join(__dirname,'uploads');
app.use(express.static(publicFolder));
app.use(express.static(uploadFolder));

let sessionMiddleware = expressSession({
  secret: "ctyfn5ytru6bive8ter",
  resave: true,
  saveUninitialized: true,
})
  
app.use(sessionMiddleware)
    
declare module "express-session" {
  interface SessionData {
    isLogin?: boolean;
    userId?: string;
      
  }
}

export type User = {
    username:string,
    email:string,
    password:string,
    confirmPassword?:string,
    userIcon?:string
}

export type Profile = {
  profileConfirmPassword: any;
  profileUsername:string,
  profilePassword:string,
  profileIcon?:any
}

export let changePasswordSchema = yup.object().shape({
  profilePassword:yup.string().min(3, 'Password must be at least 3 characters long'),
  profileConfirmPassword:yup.string().min(3, 'Confirm password must be at least 3 characters long'),
})

export let registerUserSchema = yup.object().shape({
    username:yup.string().required(),
    email:yup.string().email(),
    password:yup.string().min(3, 'Password must be at least 3 characters long'),
    confirmPassword:yup.string().min(3, 'Confirm password must be at least 3 characters long'),
    userIcon:yup.string()
});
export let loginUserSchema = yup.object().shape({
    email:yup.string().email(),
    password:yup.string().min(3, 'Password must be at least 3 characters long'),
});



let userController = new UserController()
let userRoutes = new UserRoute(userController)
app.use("/user",userRoutes.routes)

let gameController = new GameController()
let gameRoutes = new GameRoute(gameController)
app.use("/game",gameRoutes.routes)

let messageController = new MessageController()
let messageRoutes = new MessageRoute(messageController)
app.use("/message",messageRoutes.routes)

let groupController = new GroupController()
let groupRoutes = new GroupRoute(groupController)
app.use("/group",groupRoutes.routes)


app.use("*",(req, res) => {
  res.sendFile(path.join(publicFolder,'404.html'))
});

io.use((socket, next) => {
  let req = socket.request as express.Request;
  let res = req.res as express.Response;
  sessionMiddleware(req, res, next as express.NextFunction);
})

io.on("connection", function (socket) {
  console.log(socket.id)
});

let port = 8080;
server.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
})
