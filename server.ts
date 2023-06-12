import http from "http";
import express from "express"
import path from 'path'
import { UserController } from "./controller/UserController";
import { GameRoute, gameRoutes, MessageRoute, messageRoutes, UserRoute, userRoutes } from "./routes/Routes";
import { GameController } from "./controller/GameController";
import { MessageController } from "./controller/MessageController";
import {User,Profile} from "./types";
import { sessionMiddleware } from "./session";

const app = express();
const server = new http.Server(app)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let publicFolder = path.join(__dirname,'public');
let uploadFolder = path.join(__dirname,'uploads');
app.use(sessionMiddleware)

app.use("/user",userRoutes.routes)
app.use("/game",gameRoutes.routes)
app.use("/message",messageRoutes.routes)

app.use(express.static(publicFolder));
app.use(express.static(uploadFolder));

app.use("*",(req, res) => {
  res.sendFile(path.join(publicFolder,'404.html'))
});

server.listen(process.env.PORT,()=>{
    console.log(`Listening at http://localhost:${process.env.PORT}`);
})
