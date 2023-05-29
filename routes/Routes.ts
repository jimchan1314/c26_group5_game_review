import express from "express"
import { Request, Response } from "express";
import { UserController } from "../controller/UserController";

class Route{
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