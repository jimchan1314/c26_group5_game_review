import { parseFormDataGame } from "../formidable";
import { Request, Response } from "express";
import { db } from "../db";

import { errorHandler } from "../errorHandler";
import { IGameController } from "../routes/Routes";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// import jsonfile from "jsonfile";
// import { type } from "os";

type Game = {
    gameName:string,
    game_type:string,
    description:string,
    gameCover?:string,
}

const SQL_UPDATE_GAME = (game:Game,gameId:number)=>{
    const keys = Object.keys(game);
    const values = Object.values(game);
    const str_values = values.map((value,idx)=>`${keys[idx]} = '${value}'`);
    return `UPDATE game SET ${str_values.join(",")} WHERE id=${gameId}`;
};


export class GameController implements IGameController{
    editGameList(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async addGameList(req:Request,res:Response):Promise<void>{

        try {
            
            let form = await parseFormDataGame(req) as Game; 
            // console.log("25", form)
            let gameData = {...form}
            
            await db.query(`INSERT INTO game (name, game_type, like_count, description, create_users_id, game_cover) VALUES ($1,$2,$3,$4,$5,$6)`,
            [gameData.gameName, gameData.game_type, 0, gameData.description, req.session.userId, gameData.gameCover])
            

            res.json({isError:false,errMess:null,data:gameData});

        } catch (error) {
            
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message})
        }

        
    }

    //ver 1 test
    // async editGameList(req:Request,res:Response):Promise<void>{
    //     try {
    //         let gameID = req.params.id
    //         let gameBody = req.body as Game
            
    //         db.query(`UPDATE game SET name=$1, game_type=$2, description=$3, game_cover=$4 WHERE id=$5`,
    //         [gameBody.gameName, gameBody.game_type, gameBody.description, gameBody.gameCover, gameID])

    //         res.json({isError:false,errMess:"",data:"Success edit memo"})

    //     } catch (error) {
    //         errorHandler({status:error.status,route:req.path,errMess:error.message})
    //         res.json({isError:true,errMess:error.message})
    //     }
    // }

    // //ver 2 test
    // async editGameList2(req:Request,res:Response):Promise<void>{
    //     const {gameID} = req.params;//<-string
    //     const int_id = parseInt(gameID);


        
    //     try {
    //         let form = await parseFormDataGame(req) as Game; 
    //         // console.log("25", form)
    //         let gameData = {...form}
            
    //         db.query(`UPDATE game SET name=$1, game_type=$2, description=$3, game_cover=$4 WHERE id=$5`,
    //         [gameBody.gameName, gameBody.game_type, gameBody.description, gameBody.gameCover, gameID])
            

    //         res.json({isError:false,errMess:null,data:gameData});
            
    //     } catch (error) {
    //         errorHandler({status:error.status,route:req.path,errMess:error.message})
    //         res.json({isError:true,errMess:error.message})
    //     }
    // }


    async deleteGameList(req:Request,res:Response):Promise<void>{
        try {
            let gameID = req.params.id
            await db.query(`DELETE FROM game WHERE id=$1`,[gameID])
            res.json({isError:false,errMess:"",data:"Success delete Game"})

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }

    async getGameList(req:Request,res:Response):Promise<void> {
        try {

            let {rows} = await db.query(`SELECT * FROM game ORDER BY id DESC`);
            // const result = await db.query(`SELECT * FROM game ORDER BY id DESC`);
            // const gameList: Game[] = result.rows 
            // res.json({isError:false,errMess:"",data:gameList})    
            res.json({isError:false,errMess:"",data:rows})    
            
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message, data:null})
        }
    }
    

    
}