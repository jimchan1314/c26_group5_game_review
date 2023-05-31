import express from "express";
import { Request, Response } from "express"
import path from "path"
import formidable from "formidable";
import jsonfile from "jsonfile"
import fs from "fs"
import { Client } from "pg";
import dotenv from "dotenv"
import { parseFormData } from "./formidable";

const app = express();
const PORT = 8080
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();
const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: "localhost"
});
client.connect();

app.use(express.static("public"))

app.get('/comment', (req, res)=> {
    res.sendFile(path.resolve('public', 'messageForm.html'))
})

type Comment = {
    message:string,
    messagePic:string
} 
app.post('/comment', async(req: Request, res: Response)=>{
    try{
        let form = await parseFormData(req) as Comment
        console.log(form)
        await client.query(`INSERT INTO game_message (text,image,create_at) VALUES ($1,$2,CURRENT_TIMESTAMP)`,[form['message'],form['messagePic']])
        //form.messagePic

        res.json({ success: true })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "failed to leave comment" })
    }

})

app.listen(PORT, () => {
    console.log(`listening to http://localhost/${PORT}`)
})