import { parseFormData } from "../formidable";
import { Request, Response } from "express";
import { User, loginUserSchema, registerUserSchema } from "../server";
import { checkPassword, hashPassword } from "../bcrypt";
import { v4 as uuid } from 'uuid';
import { db } from "../db";
import { IUserController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";

export class UserController implements IUserController{
    async register(req:Request,res:Response):Promise<void>{
        try {
        
            let form = await parseFormData(req) as User; 
            if(form.password !== form.confirmPassword){
                throw new Error('password not match!')
            }
            let userData = {...form}
            
            
            await registerUserSchema.validate(userData);
            

            delete userData.confirmPassword
            userData.password = await hashPassword(userData.password)
            req.session.userId = uuid() as string
            req.session.isLogin = true

            
            
            db.query(`INSERT INTO users (id,username,password,role,user_icon) VALUES ($1,$2,$3,$4,$5)`,
            [req.session.userId,userData.username,userData.password,"member",userData.userIcon ? userData.userIcon : ""])
            
            // set_onlineUsers(req.session.userId,userData.username)
            // userDb.set(req.session.userId,JSON.stringify(userData))
            res.json({isError:false,errMess:null,data:userData});    
        } catch (error) {
            
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try {
            let form = await parseFormData(req) as User;
            await loginUserSchema.validate(form);
            let {rows} = await db.query(`SELECT id,username,password,role,user_icon FROM users WHERE username = $1`,[form.username]);
            
            if(rows.length === 0){
                throw new Error('username does not exist')
            }
            let boo = await checkPassword(form.password,rows[0].password)
            if(!boo){
                throw new Error('password does not match')
            }
            req.session.userId = rows[0].id as string
            req.session.isLogin = true
            // set_onlineUsers(req.session.userId,form.username)
            res.json({isError:false,errMess:null,data:rows[0]});
      
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }
}