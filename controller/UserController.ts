import { parseFormData } from "../formidable";
import { Request, Response } from "express";
import {User,Profile, NewUser} from "../types";
import {changePasswordSchema, loginUserSchema, registerUserSchema } from "../schema";
import { checkPassword, hashPassword } from "../bcrypt";
import { v4 as uuid } from 'uuid';
import { db } from "../db";
import { IUserController } from "../routes/Routes";
import { errorHandler } from "../errorHandler";
import moment from "moment";
import { UserService } from "../services/UserService";


export class UserController implements IUserController{
    private userService:UserService;
    constructor(){
        this.userService = new UserService();
    }
    async register(req:Request,res:Response):Promise<void>{
        try {
            let form = await parseFormData(req) as User;
            const user:NewUser = this.userService.register(form);
            req.session.userId = user.id;
            res.json({isError:false,errMess:null,data:user});    
        } catch (error) {
            
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try {
            let form = await parseFormData(req) as User;
            await loginUserSchema.validate(form);
            let {rows} = await db.query(`SELECT id,users_name,email,password,users_icon FROM users WHERE email = $1`,[form.email]);
            
            if(rows.length === 0){
                throw new Error('email does not exist')
            }
            let boo = await checkPassword(form.password,rows[0].password)
            if(!boo){
                throw new Error('password does not match')
            }
            req.session.userId = rows[0].id as string
            req.session.isLogin = true
            
            res.json({isError:false,errMess:null,data:rows[0]});
      
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async logout(req:Request,res:Response):Promise<void>{ 
        try {
            req.session.destroy(()=>{
                req.session.userId = ""
                req.session.isLogin = false
                res.json({isError:false,errMess:null,data:null});  
            });  
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async getCurrentUser(req:Request,res:Response):Promise<void>{
        try {
            let {rows} = await db.query(`SELECT id,email,users_name,users_icon FROM users WHERE id = $1`,[req.session.userId]);
            
            res.json({isError:false,errMess:"",data:rows[0]})    
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async editProfile(req:Request, res:Response):Promise<void>{
        try{
            let userID = req.session.userId;
            let form = await parseFormData(req) as Profile            
            let {rows} = await db.query(`UPDATE users SET users_name = $1, users_icon = $2 WHERE id = $3 RETURNING users_name, users_icon, id, email`,[form.profileUsername,form.profileIcon,userID]);
            res.json({isError:false,errMess:"",data:rows[0]})

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }

    }

    async changePassword(req: Request, res: Response):Promise<void>{
        try{
            let form = await parseFormData(req) as Profile
            let userID = req.session.userId;            
            if(form.profilePassword !== form.profileConfirmPassword){
                throw new Error('password not match!')
            }
            await changePasswordSchema.validate(form)
            const updated_hashed_password = await hashPassword(form.profilePassword)

            await db.query(`UPDATE users SET password = $1 WHERE id = $2`, [updated_hashed_password,userID])
            res.json({isError:false,errMess:null,data:form});    
        }
        catch (error){
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }
}