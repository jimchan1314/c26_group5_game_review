import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";
import { IMessageController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";

type Message = {
    text: string,
    image: string,
    //game_id: number|string,
    //user_id: number|string
}

export class MessageController implements IMessageController{
    //need user login
    async addMessage(req:Request,res:Response):Promise<void> {
        try {
            let form = await parseFormDataGame(req) as Message;
            let message = {...form}

            console.log(message)
            
            //await db.query(`INSERT INTO game_message (text,image,game_id,users_id) VALUES ($1,$2,$3,$4)`,
            //[message.text,message.image,message.game_id,message.user_id])

            let gameId = await db.query(`SELECT id from game limit 1`)
            let userId = await db.query(`SELECT id from users limit 1`)

            await db.query(`INSERT INTO game_message (text,image,game_id,users_id) VALUES ($1,$2,$3,$4)`,
            [message.text,message.image,gameId,userId])
            
            res.json({isError:false,errMess:null,data:form});

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async editMessage(req:Request,res:Response):Promise<void> {
        try {
            let messageID = req.params.id
            let form = await parseFormDataGame(req) as Message
            db.query(`UPDATE game_message SET text=$1 where id=$2`,[form.text,messageID])
            res.json({isError:false,errMess:null,data:"edited successfully"});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async deleteMessage(req:Request,res:Response):Promise<void> {
        try {
            let messageID = req.params.id
            db.query(`DELETE game_message where id=$1`,[messageID])
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    //no need user login
    async getMessage(req:Request,res:Response):Promise<void> {
        try {
            let messages = await db.query(`SELECT * from game_message asc`)
            res.json({isError:false,errMess:null,data:messages});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}