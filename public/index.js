async function indexCheck(){
    let user = await getCurrentUser()

    if(user){
        await fetchTemplate('loginNavbar.html', displayLogin)
        await fetchTemplate('homePage.html', displayContent)
    }else{
        await fetchTemplate('nonLoginNavbar.html', displayNotLogin)
        await fetchTemplate('homePage.html', displayContent)
    }
}
indexCheck()
async function displayContent(html){
    document.querySelector('.content').innerHTML = html;
}

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