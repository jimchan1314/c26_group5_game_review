import { parseFormData } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";

import { errorHandler } from "../errorHandler";

type Game = {
    gameName:string,
    game_type:string,
    description:string,
    gameCover?:string,
}

export class GameController{
    async addGameList(req:Request,res:Response):Promise<void>{
        try {
            
            let form = await parseFormData(req) as Game; 
            // if(form.password !== form.confirmPassword){
            //     throw new Error('password not match!')
            // }
            let gameData = {...form}

            await db.query(`INSERT INTO game (name, game_type, like_count, description, create_users_id, game_cover) VALUES ($1,$2,$3,$4,$5,$6)`,
            [gameData.gameName, gameData.game_type, 0, gameData.description, req.session.userId, gameData.gameCover])
            
            res.json({isError:false,errMess:null,data:gameData});

        } catch (error) {
            
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }


    }
}