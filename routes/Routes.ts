import express from "express"
import { Request, Response } from "express";
import { GameController } from "../controller/GameController";
import { UserController } from "../controller/UserController";

class Routes{
    routes:express.Router = express.Router();
}


export interface IUserController{
    register(req:Request,res:Response):Promise<void>
    login(req:Request,res:Response):Promise<void>
    
}
export class UserRoute extends Routes{
    constructor(controller:UserController){
        super()
        this.routes.post('/register',controller.register)
        
        this.routes.post('/login',controller.login)
        
    }

}

export class GameRoute  extends Routes{
    constructor(controller:GameController){
        super()
        this.routes.post('/gameList',controller.addGameList)
        
        
    }

}