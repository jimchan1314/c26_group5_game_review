import express from "express"
import { Request, Response } from "express";
import { GameController } from "../controller/GameController";
import { UserController } from "../controller/UserController";
import { MessageController } from "../controller/MessageController";
import { isLoggedInAPI } from "../guard";

class Routes{
    routes:express.Router = express.Router();
}


export interface IUserController{
    register(req:Request,res:Response):Promise<void>
    login(req:Request,res:Response):Promise<void>
    logout(req:Request,res:Response):Promise<void>
    getCurrentUser(req:Request,res:Response):Promise<void>
    editProfile(req:Request,res:Response):Promise<void>
    changePassword(req:Request,res:Response):Promise<void>
}
export class UserRoute extends Routes{
    constructor(controller:UserController){
        super()
        this.routes.post('/register',controller.register)
        this.routes.post('/login',controller.login)
        this.routes.post('/logout',controller.logout)
        this.routes.get('/getCurrentUser',isLoggedInAPI,controller.getCurrentUser)
        this.routes.put('/editProfile',isLoggedInAPI,controller.editProfile)
        this.routes.put('/changePassword',isLoggedInAPI,controller.changePassword)
    }

}

export interface IGameController{
    addGameList(req:Request,res:Response):Promise<void>
    editGameList(req:Request,res:Response):Promise<void>
    deleteGameList(req:Request,res:Response):Promise<void>
    getGameList(req:Request,res:Response):Promise<void>
    getSingleGame(req:Request,res:Response):Promise<void>
    likeGame(req:Request,res:Response):Promise<void>
    getVideoGameList(req:Request,res:Response):Promise<void>
    getBoardGameList(req:Request,res:Response):Promise<void>
    getVideoRank(req:Request,res:Response):Promise<void>
    getBoardRank(req:Request,res:Response):Promise<void>
}

export class GameRoute  extends Routes{
    constructor(controller:GameController){
        super()
        this.routes.post('/addGameList',controller.addGameList)
        this.routes.put('/editGameList/:id',controller.editGameList)
        this.routes.delete('/deleteGameList/:id',controller.deleteGameList)
        this.routes.get('/getGameList',controller.getGameList)
        this.routes.get('/getSingleGame/:id',controller.getSingleGame)
        this.routes.post('/likeGame/:id',controller.likeGame)
        this.routes.get('/getVideoGameList/',controller.getVideoGameList)
        this.routes.get('/getBoardGameList/',controller.getBoardGameList)
        this.routes.get('/getVideoRank/',controller.getVideoRank)
        this.routes.get('/getBoardRank/',controller.getBoardRank)
    }

}

export interface IMessageController{
    addMessage(req:Request,res:Response):Promise<void>
    editMessage(req:Request,res:Response):Promise<void>
    deleteMessage(req:Request,res:Response):Promise<void>
    getMessage(req:Request,res:Response):Promise<void>
}

export class MessageRoute extends Routes {
    constructor(controller: MessageController) {
        super()
        this.routes.post('/addMessage/:id',isLoggedInAPI,controller.addMessage)
        this.routes.put('/editMessage/:id',isLoggedInAPI,controller.editMessage)
        this.routes.delete('/deleteMessage/:id',isLoggedInAPI,controller.deleteMessage)
        this.routes.get('/getMessage/:id',controller.getMessage)
    }
}