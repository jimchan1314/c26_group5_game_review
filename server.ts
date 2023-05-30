import http from "http";
import express from "express"
import path from 'path'
import expressSession from "express-session";
import { UserController } from "./controller/UserController";
import { GameRoute, UserRoute } from "./routes/Routes";
import * as yup from 'yup';
import { GameController } from "./controller/GameController";


const app = express();
const server = new http.Server(app)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let publicFolder = path.join(__dirname,'public');
let uploadFolder = path.join(__dirname,'uploads');
app.use(express.static(publicFolder));
app.use(express.static(uploadFolder));

let sessionMiddleware = expressSession({
    secret: "ajdhaskjdhiuashduiwhiqdoquhcnqwibciq",
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
  profileIcon?:string
}

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


let port = 8080;
server.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
})
