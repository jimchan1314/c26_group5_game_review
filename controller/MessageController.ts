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
            let postId = req.params.id
            let time = new Date();
            let currTime = moment(time).format('MMMM Do YYYY, h:mm:ss a');  
            
            await db.query(`INSERT INTO game_message (text,post_id,users_id,create_at) VALUES ($1,$2,$3,$4)`,
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
            let postId = req.params.id
            let {rows} = await db.query(`SELECT * from game_message WHERE post_id=$1 ORDER BY create_at ASC`,[postId])
            //console.log(rows)
            res.json({isError:false,errMess:null,data:rows});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
    async getCurrentMessage(req:Request,res:Response):Promise<void>{
        try{
            let msgId = req.params.id
            //console.log(msgId)
            let {rows} = await db.query(`SELECT text from game_message WHERE id=$1`,[msgId])
            //console.log(rows)
            res.json({isError:false,errMess:null,data:rows});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}