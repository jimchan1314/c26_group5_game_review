import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";
import { IMessageController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";

type Message = {
    message: string,
    image: string,
    game_id: number|string,
    user_id: number|string
}

export class MessageController implements IMessageController{
    async addMessage(req:Request,res:Response):Promise<void> {
        try {

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async editMessage(req:Request,res:Response):Promise<void> {
        try {

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async deleteMessage(req:Request,res:Response):Promise<void> {
        try {

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async getMessage(req:Request,res:Response):Promise<void> {
        try {

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}