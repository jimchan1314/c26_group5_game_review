export const SQL_SELECT_USER = (email:string|undefined)=>{
    return `SELECT * FROM users WHERE email='${email}'`
}