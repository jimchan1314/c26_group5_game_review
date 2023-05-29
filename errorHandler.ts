import path from 'path'
import jsonfile from 'jsonfile'

let jsonPath = path.join(__dirname, "errorLog.json")
export type ErrorType = {
    status:number
    route:string
    errMess:string
}
export async function errorHandler(obj:ErrorType){
    obj = Object.assign(obj,{dateTime:new Date()})
    await jsonfile.writeFile(jsonPath,obj,{ spaces: 2,flag: 'a' })
}