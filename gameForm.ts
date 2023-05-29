import express from "express";
import { Request, Response } from "express";
import { parseFormData } from "./formidable";
import fs from "fs";
import * as yup from 'yup';
// import { db } from "./db";
import { json } from "stream/consumers";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });
  
const app = express();
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


type Game = {
    gameName:string,
    gameType:EGameType,
    description:string,
    gameCover:string,
}

enum EGameType {
    boardGame,
    videoGame
}

let gameSchema = yup.object().shape({
    gameName:yup.string().required(),
    gameType:yup.enum[EGameType].required(),  //??
    description:yup.string().required(),
    gameCover:yup.string()
});
  
// When #contact-form submit, this route will receive the request
app.post('/gameList', async function addGame(req: Request, res: Response):Promise<void> {
    try {
        let form = await parseFormData(req) as Game
        await gameSchema.validate(form);
        // await db.query(`INSERT INTO game (name,type,like_count, description, create_users_id, game_cover) VALUES ($1,$2,$3,$4,$5,$6)`,[form.gameName, form.gameType, 0, form.description, req.session.userId, form.gameCover])  //enum??
        let res = 
    } catch (error) {
        res.json({isError:false,errMess:""})
    }

});

app.get