import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";
import { IMessageController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";
import moment from "moment";

type Message = {
    text: string
}

export class MessageController implements IMessageController{
    //need user login
    async addMessage(req:Request,res:Response):Promise<void> {
        try {
            let form = await parseFormDataGame(req) as Message;
            let message = {...form}
            let userId = req.session.userId!
            let gameId = req.params.id
            
            await db.query(`INSERT INTO game_message (text,game_id,users_id) VALUES ($1,$2,$3)`,
            [message.text,gameId,userId])
            
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
            db.query(`DELETE FROM game_message where id=$1`,[messageID])
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    //no need user login
    async getMessage(req:Request,res:Response):Promise<void> {
        try {
            let gameId = req.params.id
            let {rows} = await db.query(`SELECT * from game_message WHERE game_id=$1 ORDER BY create_at ASC`,[gameId])
            //console.log(rows)
            res.json({isError:false,errMess:null,data:rows});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}