import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";
import { IMessageController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";
import moment from "moment";

type Message = {
    text: string
}

type EditedMessage = {
    edittext: string
}

export class MessageController implements IMessageController{
    async addMessage(req:Request,res:Response):Promise<void> {
        try {
            let form = await parseFormDataGame(req) as Message;
            let message = {...form}
            let userId = req.session.userId!
            let postId = req.params.id
            let time = new Date();
            let currTime = moment(time).format('MMMM Do YYYY, h:mm:ss a');  
            
            await db.query(`INSERT INTO game_message (text,post_id,users_id,message_create_at) VALUES ($1,$2,$3,$4)`,
            [message.text,postId,userId,currTime])
            
            res.json({isError:false,errMess:null,data:form});

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async editMessage(req:Request,res:Response):Promise<void> {
        try {
            let messageID = req.params.id
            let form = await parseFormDataGame(req) as EditedMessage
            db.query(`UPDATE game_message SET text=$1 where message_id=$2`,[form.edittext,messageID])
            res.json({isError:false,errMess:null,data:"edited successfully"});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async deleteMessage(req:Request,res:Response):Promise<void> {
        try {
            let messageID = req.params.id
            db.query(`DELETE FROM game_message where message_id=$1`,[messageID])
            res.json({isError:false,errMess:null,data:"delete successfully"});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async getMessage(req:Request,res:Response):Promise<void> {
        try {
            let postId = req.params.id

            let {rows} = await db.query(`SELECT message_id,text,post_id,users_id,message_create_at,users_icon,users_name 
            FROM game_message JOIN users ON users_id = users.id where post_id=$1 ORDER BY message_id ASC`,[postId])
            res.json({isError:false,errMess:null,data:rows});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
    async getCurrentMessage(req:Request,res:Response):Promise<void>{
        try{
            let msgId = req.params.id
            let {rows} = await db.query(`SELECT text from game_message WHERE message_id=$1`,[msgId])
            res.json({isError:false,errMess:null,data:rows});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}