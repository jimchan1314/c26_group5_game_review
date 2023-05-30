import express from "express";
import { Request, Response } from "express"
import path from "path"
import formidable from "formidable";
import jsonfile from "jsonfile"
import fs from "fs"
//import { Client } from "pg";
//import dotenv from "dotenv"

const app = express();
const PORT = 8083
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, {recursive: true})
let uploadCounts = 0;
const form = formidable({
    uploadDir, 
    keepExtensions: true,
    maxFiles: 1,
    maxFieldsSize: 2 * 1024 ** 2,
    filter: (part) => part.mimetype?.startsWith("image/") || false, 
    filename: (originalName, originalExt, part, form) => {
    uploadCounts++
    let fieldName = part.name;
    let timestamp = Date.now();
    let ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}-${uploadCounts}.${ext}`;
  },
})

app.use(express.static("public"))

app.get('/comment', (req, res)=> {
    res.sendFile(path.resolve('public', 'messageForm.html'))
})


app.post('/comment', (req: Request, res: Response)=>{
    try{
        form.parse(req, (err: Error, fields, files?) => {
            const message = fields['message']
            const image = (files.pic as formidable.File)?.newFilename
            console.log(message)
            console.log(image)
        })
        res.json({ success: true })
        //res.json()
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "failed to leave comment" })
    }

})

app.listen(PORT, () => {
    console.log(`listening to http://localhost/${PORT}`)
})