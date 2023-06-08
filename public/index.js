// const { getParsedCommandLineOfConfigFile } = require("typescript")

async function indexCheck() {
    let user = await getCurrentUser()

    if (user) {
        await fetchTemplate('loginNavbar.html', displayLogin)
        await fetchAllContent('homePage.html', displayContent, fetchBoardRank, fetchVideoRank)
    } else {
        await fetchTemplate('nonLoginNavbar.html', displayNotLogin)
        await fetchAllContent('homePage.html', displayContent, fetchBoardRank, fetchVideoRank)

    }
}
indexCheck()



async function displayContent(html) {
    document.querySelector('.content').innerHTML = html;
}

async function getCurrentUser() {
    let res = await fetch('/user/getCurrentUser')
    let json = await res.json()
    if (json.isError) {
        return null
    } else {
        await localStorage.setItem("user", JSON.stringify(json.data))
        return json.data
    }

}



async function fetchTemplate(path, cb) {

    let res = await fetch(path)
    let html = await res.text()

    cb(html)
}

async function fetchContent(path, cb, cb2) {

    let res = await fetch(path)
    let html = await res.text()

    await cb(html)
    await cb2()
}

async function fetchAllContent(path, cb, cb2, cb3) {

    let res = await fetch(path)
    let html = await res.text()

    await cb(html)
    await cb2()
    await cb3()
}
// fm gameForm.js
async function indexGame() {
    let res = await fetch('/game/getGameList')
    let json = await res.json()
    // console.log("indexJs-37")

    if (json.isError) {
        alert(json.errMess)
    } else {
        renderAllGame(json.data)
    }
}


// indexGame()

// async function fetchGameContentWID(path, cb, game_postID) {

//     let res = await fetch(path)
//     let html = await res.text()

//     await cb(html)

//     let user = await getCurrentUser()
//     user = 
//     //console.log('index75', user)

//     // let gameUserId = json.data.create_users_id 
//     // console.log('index79',gameIDD)

//     fetchSingleGame(game_postID)
//     await renderGetMessage(gameIDD)
// }


async function fetchGameContentWID(path, cb, game_postID) {
    let res = await fetch(path)
    let html = await res.text()

    await cb(html)

    // let user = await getCurrentUser()
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    //console.log('index75', user)
    let gameIDD = game_postID
//     await cb(html)

    await fetchSingleGame(gameIDD)
    await renderGetMessage(gameIDD)
}

