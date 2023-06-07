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

type EditGame = {
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
            // console.log(error.message)
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

            
            let {rows} = await db.query(`SELECT * FROM game JOIN users ON users.id = game.create_users_id ORDER BY game.like_count DESC`);
            // console.log(rows)
            res.json({isError:false,errMess:"",data:rows})    
            
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message, data:null})
        }
    }

    async editGameList(req:Request, res:Response):Promise<void>{
        try{
            
            let gameID = req.params.id
            
            let form = await parseFormDataGame(req) as EditGame
            let gameData = {...form} 
            
            let time = new Date();
            let currTime = moment(time).format('MMMM Do YYYY, h:mm:ss a');

            if(!gameData.gameCover){
                let {rows} = await db.query(`UPDATE game SET name = $1, game_type = $2, description = $3, update_post = $4 WHERE post_id = $5`,
                [gameData.gameName, gameData.game_type, gameData.description, currTime, gameID]);
                res.json({isError:false,errMess:"",data:rows[0]})

            }else{
                let {rows} = await db.query(`UPDATE game SET name = $1, game_type = $2, description = $3, game_cover = $4, update_post = $5 WHERE post_id = $6`,
                [gameData.gameName, gameData.game_type, gameData.description, gameData.gameCover, currTime, gameID]);
                res.json({isError:false,errMess:"",data:rows[0]})
            }

            
            

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }

    }

    async getSingleGame(req:Request, res:Response):Promise<void> {
        try {
            let gameID = req.params.id
            // console.log("gts-111",gameID)
            let {rows} = await db.query(`SELECT name, game_type, description, game_cover, create_post, update_post, like_count, create_users_id, id, users_name  FROM game JOIN users ON users.id = game.create_users_id where post_id = $1;`,[gameID]);
            // console.log('GCts',rows)
            res.json({isError:false,errMess:"",data:rows[0]})
            // console.log('gts-114',rows[0])    
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }

    async likeGame(req:Request,res:Response):Promise<void>{

        try {
            let gameID = req.params.id
            console.log("gc124",gameID)
            console.log('gc125',req.session.id)
            // console.log('gc126',req.session.id)

            let {rows} = await db.query(`UPDATE game SET like_count=like_count+1 WHERE post_id=$1 AND create_users_id!=$2 AND post_id NOT IN (SELECT game_id FROM like_game WHERE users_id = $3) RETURNING *`,
            [gameID,req.session.userId,req.session.userId])
            if(!req.session.isLogin){
                throw new Error('Please Login before Like memo!') 
            }

            if(rows.length===0){
                throw new Error('Cannot like memo!') 
            }
    
            await db.query(`INSERT INTO like_game (users_id,game_id) VALUES ($1,$2)`,[req.session.userId,gameID])
    
            res.json({isError:false,errMess:"",data:rows[0]})
    
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }

    async getVideoGameList(req:Request, res:Response):Promise<void> {
        try{
            // let {rows} = await db.query(`SELECT * FROM game WHERE game_type = 'Video Game' ORDER BY game.create_post DESC`);
            let {rows} = await db.query(`SELECT * FROM (SELECT * FROM game WHERE game_type = 'Video Game') as table1 inner JOIN users ON users.id = table1.create_users_id  ORDER BY table1.create_post DESC`)
            
            res.json({isError:false,errMess:"",data:rows})    

        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    } 

    async getBoardGameList(req: Request, res: Response): Promise<void> {
        try{
            //checking
            // let {rows} = await db.query(`SELECT * FROM game WHERE game_type = 'Board Game' ORDER BY game.create_post DESC`)
            let {rows} = await db.query(`SELECT * FROM (SELECT * FROM game WHERE game_type = 'Board Game') as table1 inner JOIN users ON users.id = table1.create_users_id  ORDER BY table1.create_post DESC`)
            

            res.json({isError:false,errMess:"",data:rows})
        } catch (error) {
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }

    async getVideoRank(req: Request, res: Response): Promise<void>{
        try {
            // let {rows} = await db.query(`SELECT * FROM game WHERE game_type = 'Video Game' ORDER BY game.like_count DESC LIMIT 10`)
            let {rows} = await db.query(`SELECT * FROM (SELECT * FROM game WHERE game_type = 'Video Game') as table1 inner JOIN users ON users.id = table1.create_users_id  ORDER BY table1.create_post DESC LIMIT 10`)

            res.json({isError:false,errMess:"",data:rows})
        } catch (error){
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }

    async getBoardRank(req: Request, res: Response): Promise<void>{
        try {
            // let {rows} = await db.query(`SELECT * FROM game WHERE game_type = 'Board Game' ORDER BY game.like_count DESC LIMIT 10`)
            let {rows} = await db.query(`SELECT * FROM (SELECT * FROM game WHERE game_type = 'Board Game') as table1 inner JOIN users ON users.id = table1.create_users_id  ORDER BY table1.create_post DESC LIMIT 10`)

            res.json({isError:false,errMess:"",data:rows})
        } catch (error){
            errorHandler({status:error.status,route:req.path,errMess:error.message})
            res.json({isError:true,errMess:error.message,data:null})
        }
    }
}