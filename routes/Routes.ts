import express from "express"
import { Request, Response } from "express";
import { GameController } from "../controller/GameController";
import { UserController } from "../controller/UserController";
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
}

export class GameRoute  extends Routes{
    constructor(controller:GameController){
        super()
        this.routes.post('/gameList',controller.addGameList)
        this.routes.put('/gameList',controller.editGameList)
        this.routes.delete('/gameList',controller.deleteGameList)
        this.routes.get('/gameList',controller.getGameList)

        
        
    }

}