import { SQL_SELECT_USER } from "../sql";
import { NewUser, User } from "../types";
import moment from "moment";
import { registerUserSchema } from "../schema";import { db } from "../db";
import { hashPassword } from "../bcrypt";
import { v4 as uuid } from 'uuid';

export class UserService{
    register = async (form:Partial<NewUser>)=>{
        const existedUsers = await db.query(SQL_SELECT_USER(form.email));
            if (existedUsers.rowCount > 0 ){
                throw new Error('Email has already registered!'); 
            }
            if(form.password !== form.confirmPassword){
                throw new Error('password not match!')
            }
            let time = new Date();
            let currTime = moment(time).format('MMMM Do YYYY, h:mm:ss a');
            const userId =  uuid() as string;
            
            await registerUserSchema.validate(form);
            const hash_password = await hashPassword(form.password)            
            const insertUser = await db.query(`INSERT INTO users (id,email,users_name,password,create_at) VALUES ($1,$2,$3,$4,$5)  RETURNING *`,
            [userId,form.email,form.users_name,hash_password,moment().format("YYYY-MM-DD") ]);
            return insertUser.rows[0]
            
    }
}