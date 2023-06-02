import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";

import { errorHandler } from "../errorHandler";
import { IGameController } from "../routes/Routes";
import moment from "moment";

// import jsonfile from "jsonfile";
// import { type } from "os";

type Game = {
    gameName:string,
    game_type:string,
    description:string,
    gameCover?:string,
}

export class GameController implements IGameController{
    
    async addGameList(req:Request,res:Response):Promise<void>{

        try {
            
            let form = await parseFormDataGame(req) as Game; 
            // console.log("25", form)
            let gameData = {...form}
            let time = new Date();
            let currTime = moment(time).format('MMMM Do YYYY, h:mm:ss a');   
            
            await db.query(`INSERT INTO game (name, game_type, like_count, description, create_users_id, game_cover, create_post) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            [gameData.gameName, gameData.game_type, 0, gameData.description, req.session.userId, gameData.gameCover, currTime])
            

            res.json({isError:false,errMess:null,data:gameData});

        } catch (error) {
            console.log(error.message)
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }

        
    }

    async editGameList(req:Request,res:Response):Promise<void>{
        try {
            let gameID = req.params.id
            let gameBody = req.body as Game
            
            db.query(`UPDATE game SET name=$1, game_type=$2, description=$3, game_cover=$4 WHERE id=$5`,[gameBody.gameName,gameBody.game_type,gameBody.description,gameBody.gameCover,gameID])
            res.json({isError:false,errMess:"",data:"Success edit memo"})

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }
    }

    async deleteGameList(req:Request,res:Response):Promise<void>{
        try {
            let gameID = req.params.id
            await db.query(`DELETE FROM game WHERE game.post_id=$1`,[gameID])
            res.json({isError:false,errMess:"",data:"Success delete Game"})

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }

    async getGameList(req:Request,res:Response):Promise<void> {
        try {
            
            let {rows} = await db.query(`SELECT * FROM game JOIN users ON users.id = game.create_users_id ORDER BY game.post_id DESC`);
            console.log(rows)
            res.json({isError:false,errMess:"",data:rows})    
            
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message, data:null})
        }
    }


    
}