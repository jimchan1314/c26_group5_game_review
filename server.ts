import express from "express";
import { Request, Response } from "express";
import path from 'path';

const app = express();
let publicFolder  = path.join(__dirname,'public');
let uploadFolder = path.join(__dirname,'uploads');
app.use(express.static(publicFolder));
app.use(express.static(uploadFolder));


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});