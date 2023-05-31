import { parseFormData } from "../formidable";
import { Request, Response } from "express";
// import { db } from "../db";

import { errorHandler } from "../errorHandler";
import { IGameController } from "../routes/Routes";

import jsonfile from "jsonfile";
import { type } from "os";

type Game = {
    gameName:string,
    game_type:string,
    description:string,
    gameCover?:string,
}

export class GameController implements IGameController{
    
    async addGameList(req:Request,res:Response):Promise<void>{

        

        try {
            
            let form = await parseFormData(req) as Game; 

            let gameData = {...form}
            console.log(console.log(`ts game form result: ${gameData}`))
            
            // await db.query(`INSERT INTO game (name, game_type, like_count, description, create_users_id, game_cover) VALUES ($1,$2,$3,$4,$5,$6)`,
            // [gameData.gameName, gameData.game_type, 0, gameData.description, req.session.userId, gameData.gameCover])
            
             

            res.json({isError:false,errMess:null,data:gameData});

        } catch (error) {
            
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async editGameList(req:Request,res:Response):Promise<void>{
        try {
            
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async deleteGameList(req:Request,res:Response):Promise<void>{
        try {
            
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async getGameList(req:Request,res:Response):Promise<void> {
        try {
            // let {rows} = await db.query(`SELECT id,name,game_type,like_count,create_at, description, game_cover FROM game WHERE id = $1`,[gameData.game.id]);
            
            // res.json({isError:false,errMess:"",data:rows[0]})    
            
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }


    
}