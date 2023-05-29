import express from "express";
import { Request, Response } from "express";
import formidable from "formidable";
import fs from "fs";



const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: (1024 ** 2) * 200, // the default limit is 200KB
    filter: (part) => part.mimetype?.startsWith("image/") || false,
});
  
const app = express();
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  
// When #contact-form submit, this route will recive the request
app.post("/gameList", function addGameForm(req: Request, res: Response) {
    form.parse(req, (err, fields, files) => {
        if(err){
            console.log(err)
        } else {
            console.log({ fields, files });
            res.json({ success: true });
        }
       
    });
});