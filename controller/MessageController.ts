import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";
import { IMessageController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";

type Message = {
    text: string,
    image: string
}

export class MessageController implements IMessageController{
    //need user login
    async addMessage(req:Request,res:Response):Promise<void> {
        try {
            let form = await parseFormDataGame(req) as Message;
            let message = {...form}
            let userId = req.session.userId!
            let gameId = req.params.id
            //console.log(message)
            
            //await db.query(`INSERT INTO game_message (text,image,game_id,users_id) VALUES ($1,$2,$3,$4)`,
            //[message.text,message.image,message.game_id,message.user_id])

            // let gamequery = await db.query(`SELECT id from game limit 1`)
            // if(gamequery.rows.length === 0){
            //     throw new Error('not exist this game')
            // }
            // let userQuery = await db.query(`SELECT id from users limit 1`)
            // if(userQuery.rows.length === 0){
            //     throw new Error('not exist this user')
            // }
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
            console.log(rows)
            res.json({isError:false,errMess:null,data:rows});
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}