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

async function displayOffcanvas(html) {
    document.querySelector('.offcanvas-body').innerHTML = html;
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

async function fetchGameList() {
    let res = await fetch(`/group/getGroupList/`)
    let json = await res.json()
    console.log(json.data)

    if (json.isError) {
        alert(json.errMess)
    } else {
        renderGroupList(json.data)
    }
}

async function fetchJoinGroupList() {
    let res = await fetch(`/group/getJoinGroupList/`)
    let json = await res.json()

    if (json.isError) {
        alert(json.errMess)
    } else {
        renderJoinGroupList(json.data)
    }
}

let messageButton = document.querySelector(".messageBox")
let offcanvas = document.querySelector(".disable")

messageButton.addEventListener('click', async function (e) {
    e.target = offcanvas.click()
    await fetchAllContent('groupList.html', displayOffcanvas, fetchGameList, fetchJoinGroupList)
})

async function renderGroupFormModal(html) {

    document.querySelector('.form-modal-body').innerHTML = html
    let form = document.querySelector('#groupForm')
    form.addEventListener('submit', async function (e) {
        e.preventDefault()
        let formData = new FormData(form)

        let res = await fetch('group/createGroup', {

            method: 'POST',
            body: formData
        })
        let json = await res.json()
        if (json.isError) {
            await sweetAlert.fire({
                icon: 'info',
                title: json.errMess,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            await sweetAlert.fire({
                icon: 'success',
                title: 'Successfully created group',
                showConfirmButton: false,
                timer: 1500
            })
            document.querySelector('#modalDismiss').click()
            await fetchAllContent('groupList.html', displayOffcanvas, fetchGameList, fetchJoinGroupList)
        }
    })
}

async function renderGroupList(obj) {

    obj.forEach(obj => document.querySelector('#multiCollapseExample1').innerHTML += `
    
        <div onclick="fetchChatRoom('chatRoom.html',displayOffcanvas,${obj.group_id})"  class="groupList">
            ${obj.group_name}
            <i data-id="${obj.group_id}" id="joinGroup" class="fa-solid fa-plus joinGroup"></i>
        </div>
          
    `)

    let join = document.querySelectorAll('.joinGroup')

    join.forEach(btn => btn.addEventListener('click', async (e) => {
        let id = e.target.dataset.id
        e.preventDefault()


        let res = await fetch(`group/joinGroup/${id}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({})
        })

        let json = await res.json()

        if (json.isError) {
            await sweetAlert.fire({
                icon: 'info',
                title: json.errMess,
                showConfirmButton: false,
                timer: 1500
            })

        } else {
            await sweetAlert.fire({
                icon: 'success',
                title: 'Successfully Join Group',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    )
}

async function renderJoinGroupList(obj) {

    obj.forEach(obj => document.querySelector('#multiCollapseExample').innerHTML += `
    
    
        <div onclick="fetchChatRoom('chatRoom.html',displayOffcanvas,${obj.group_id})" class="joinGroupList">
            ${obj.group_name}
            <i data-id="${obj.group_id}" id="joinGroup" class="fa-solid fa-plus joinGroup"></i>
        </div>
    
    `)
}

async function renderChatGroup(groupID) {
    console.log(groupID)
    let res = await fetch(`/group/getChatGroup/${groupID}`)
    let json = await res.json()
    console.log(json.data)

    let user = localStorage.getItem('user')
    user = JSON.parse(user)

    json.data.forEach(i => {
        if (i.users_id === user.id) {
            document.querySelector('.msgContainer').setAttribute('data-msg', `${groupID}`)

            document.querySelector('.msgContainer').innerHTML +=
                `
            
            
              
              <div class="inputMessage">
                <input type="text" name="groupName" class="msgbox" placeholder="Type Message here">
                <button type="submit" class="submitMsg" role="button">123</button>
                
              </div>
            
            `
        }
    })
    const message = document.querySelector('.inputMessage');
    const messageInput = document.querySelector('msgbox');
    message.addEventListener('submit', async (e) => {
        
        e.preventDefault();
        let users = localStorage.getItem('users');


        let inputMessage = {
            userName: users.user_name.value,
            userIcon: users.user_icon.value,
            message: message.groupName.value,
            groupID: message.dataset.value
        }
        let res = await fetch('group/addGroupMsg', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify(inputMessage),
        })
        let json = await res.json()
        json.data.forEach(obj => {
            if (obj.users_id === user.id) {


                document.querySelector('.msgContainer').innerHTML +=
                    `
                
                <div class="chatbox send">
                    <img src="${obj.users.users_icon}">
                    <div class="chat">
                        <div class="chatName">${obj.users.users_name}</div>
                        <div>${obj.group_message.message}</div>
                    </div>
                </div>
                
                `
            } else {
                document.querySelector('.msgContainer').innerHTML +=
                    `
                
                <div class="chatbox receive">
                    <img src="${obj.users.users_icon}">
                    <div class="chat">
                        <div class="chatName">${obj.users.users_name}</div>
                        <div>${obj.group_message.message}</div>
                    </div>
                </div>
                
                `

            }
        })
        if (json.isError) {
            alert(json.errMess)
        }
        messageInput.reset();
    })

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

async function fetchGameContentWID(path, cb, game_postID) {

    let res = await fetch(path)
    let html = await res.text()

    await cb(html)

    // let user = await getCurrentUser()
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    console.log('index75', user)

    // let gameUserId = json.data.create_users_id 
    let gameIDD = await game_postID
    // console.log('index79',gameIDD)

    await fetchSingleGame(gameIDD)
}

async function fetchChatRoom(path, cb, game_postID) {
    let res = await fetch(path)
    let html = await res.text()

    await cb(html)

    let gameID = game_postID


    await renderChatGroup(gameID)


}



