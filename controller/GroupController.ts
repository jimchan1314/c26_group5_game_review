import { IGroupController} from "../routes/Routes";
import { parseFormData } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";
import { errorHandler } from "../errorHandler";

type Group = {
    groupName: string,
}

type GroupMsg = {
    userName: string,
    userIcon: string,
    message: string,
    groupID: string
}

export class GroupController implements IGroupController{
    async createGroup(req:Request,res:Response):Promise<void>{
        try {
            let form = await parseFormData(req) as Group;
            let userData = {...form}
            
            
        
            let {rows} = await db.query(`INSERT INTO chat_group (group_name) VALUES ($1) RETURNING id`,[userData.groupName])
            await db.query(`INSERT INTO ref_group_users (group_id,users_id) VALUES ($1,$2)`,[rows[0].id, req.session.userId])
            
            res.json({isError:false,errMess:null,data:userData});
        }catch(error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }   
    }

    async getGroupList(req: Request, res: Response):Promise<void> {
        try{


            let {rows} = await db.query(`SELECT * FROM ref_group_users
             INNER JOIN chat_group ON chat_group.id = ref_group_users.group_id
             WHERE ref_group_users.users_id != $1
             `, [req.session.userId])


             res.json({isError:false,errMess:null,data:rows});

        }catch(error){
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async getJoinGroupList(req: Request, res: Response):Promise<void> {
        try{
            let {rows} = await db.query(`SELECT * FROM ref_group_users
             INNER JOIN chat_group ON chat_group.id = ref_group_users.group_id
             WHERE ref_group_users.users_id = $1`,[req.session.userId])

             res.json({isError:false,errMess:null,data:rows});
        }catch(error){
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async joinGroup(req: Request, res: Response):Promise<void> {
        try{
            let id = req.params.id;
            let users = req.session.userId;

            let {rows} = await db.query(`INSERT INTO ref_group_users (group_id,users_id) VALUES ($1,$2) RETURNING *`,[id,users])
            res.json({isError:false,errMess:null,data:rows});
        }catch(error){
        errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
    }
    }
    
    async getChatGroup(req: Request, res: Response):Promise<void> {
        try{
            let id = req.params.id
            console.log(id)

            let {rows} = await db.query(`SELECT * FROM ref_group_users WHERE group_id = $1`,[id])


            res.json({isError:false,errMess:null,data:rows});
        }catch(error){
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async addGroupMsg(req: Request, res: Response):Promise<void> {
        try{
            let data = req.body

            let {rows} = await db.query(`INSERT INTO group_message (group_id, message, users_id) VALUES ($1, $2, $3)
            RETURNING group_id, users_id`,[data.groupID,data.message,req.session.userId])

            let display = await db.query(`
            SELECT group_message.message users.users_name users.users_icon users_id FROM group_message
            INNER JOIN chat_group ON chat_group.id = group_message.group_id 
            INNER JOIN users ON users.id = group_message.users_id
            WHERE users.id = $1 group_id = $2`,[rows[0].users_id, rows[0].group_id])

            res.json({isError:false,errMess:null,data:display});
        }catch (error) {
            
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}  