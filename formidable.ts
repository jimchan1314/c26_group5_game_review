import formidable, { Fields, Files } from "formidable";
import fs from 'fs'
import { Request } from "express";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });
const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: (1024 ** 2) * 200, // the default limit is 1KB * 200
    filter: (part) => part.mimetype?.startsWith("image/") || false,
});

export function parseFormData(req: Request) {
  return new Promise<unknown>((resolve, reject:(reason?: unknown) => void) => {
    


    form.parse(req, (err, fields, files) => {
          
      if({err}.err !== null){
          reject({err})
      }
      resolve(formatIntoSingleObj({fields, files }));    

    });
  });
}





function formatIntoSingleObj(formResult:{ fields?: Fields; files?: Files }){
    let result = {}
    // console.log('46',formResult)
    if(JSON.stringify(formResult.fields) !== '{}'){
      // exist fields
        result = Object.assign(result,formResult.fields)
    }
    if(JSON.stringify(formResult.files) !== '{}'){
      // exist files
        let obj = {}
        let files = formResult.files as Files
        
        for(let k in files){
          // console.log('57',k)
          let file = files[k] as {newFilename:string}
          obj = Object.assign(obj,{[`${k}`]:file.newFilename})
        }
        
        
        result = Object.assign(result, obj)
    }
    // console.log('65',result)
    return result
}