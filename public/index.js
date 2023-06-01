// const { getParsedCommandLineOfConfigFile } = require("typescript")

async function indexCheck(){
    let user = await getCurrentUser()

    if(user){

        await fetchTemplate('loginNavbar.html', displayLogin)
        
    }else{
        await fetchTemplate('nonLoginNavbar.html', displayNotLogin)

    }
}
indexCheck()

async function getCurrentUser(){
    let res = await fetch('/user/getCurrentUser')
    let json = await res.json()
    if(json.isError){
        return null
    }else{
        await localStorage.setItem("user",JSON.stringify(json.data))
        return json.data
    }
    
}

async function fetchTemplate(path,cb){
    
    let res = await fetch(path)
    let html = await res.text()
    
    cb(html)
}

// fm gameForm.js
async function indexGame(){
    let res = await fetch('/game/getGameList')
    let json = await res.json()
    // console.log("indexJs-37")
    
    if(json.isError){
        alert(json.errMess)
    }else{
        renderAllGame(json.data)
    }
}
indexGame();

async function userCheckLimit(){
    let res = await fetch('/game/getGameList')
    let json = await res.json()
    console.log(json)
    let user = await getCurrentUser()
    let gameId = json.data.create_users_id 
    // let objId = json.data.id
    console.log(gameId)


    if(user.id = gameId){

        document.querySelectorAll(`[data-user*=${gameId}]`).forEach(i=>i.style.display = "block")

        
    }else{

        document.querySelectorAll('.gameBox > div > div > div > i.fa-trash-can').forEach(i=>i.style.display = "none")
    }
}
userCheckLimit()

