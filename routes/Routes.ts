import express from "express"
import { Request, Response } from "express";
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
}
export class UserRoute extends Routes{
    constructor(controller:UserController){
        super()
        this.routes.post('/register',controller.register)
        this.routes.post('/login',controller.login)
        this.routes.post('/logout',controller.logout)
        this.routes.get('/getCurrentUser',isLoggedInAPI,controller.getCurrentUser)
        this.routes.put('/editProfile',isLoggedInAPI,controller.editProfile)
    }

}