//get message
async function renderGetMessage(postId) {

    let user = await localStorage.getItem('user')
    user = JSON.parse(user)

    const res = await fetch(`message/getMessage/${postId}`)
    const result = await res.json()

    if (!user) {
        document.querySelector('.messageContainer').innerHTML = result.data.map(obj => messageTemplateGuest(obj)).join('')
    } else {
        document.querySelector('.messageContainer').innerHTML = result.data.map(obj => messageTemplate(obj, user.id, postId)).join('')
        document.querySelector('.expandMessageForm').innerHTML =
            `<i class="fa-solid fa-clipboard" id="expandButton" onclick="expandMessageForm(${postId})">Add Comment</i>`
    }
}


//add message
async function renderAddMessage(postId) {
    let messageForm = document.querySelector("#messageForm")
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const messageData = new FormData(messageForm)

        const res = await fetch(`message/addMessage/${postId}`, {
            method: "POST",
            body: messageData
        })
        const json = await res.json()
        //console.log(result)

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
                title: 'Successfully Post Comment',
                showConfirmButton: false,
                timer: 1500
            })

            await fetchMessage('gamepage.html', renderGetMessage(postId))
        }
        await messageForm.reset()
    })
}


//delete message
async function deleteMessage(msgId, postId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await fetch(`message/deleteMessage/${msgId}`, {
                method: "DELETE"
            })
            const json = await res.json()
            if (json.isError) {
                await sweetAlert.fire({
                    icon: 'info',
                    title: json.errMess,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Your comment has been deleted.',
                    showConfirmButton: false,
                    timer: 1500
                })
                await fetchMessage('gamepage.html', renderGetMessage(postId))
            }
        }
    })
}

//edit message
async function editMessage(msgId, postId) {
    getCurrentMessage(msgId)
    let editMessageForm = document.querySelector("#editMessageForm")
    editMessageForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const editMessageData = new FormData(editMessageForm)

        const res = await fetch(`message/editMessage/${msgId}`, {
            method: "PUT",
            body: editMessageData
        })
        const json = await res.json()

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
                title: 'Edit Comment Successfully',
                showConfirmButton: false,
                timer: 1500
            })

            await fetchMessage('gamepage.html', renderGetMessage(postId))
        }
        document.querySelector('.messageFormContaniner').innerHTML = "";
    })

}
//"Edit" button
async function expandEditMessage(msgId, postId) {
    let res = await fetch('editMessageForm.html')
    let html = await res.text()

    document.querySelector('.messageFormContaniner').innerHTML = html

    editMessage(msgId, postId)

}

//get current message
async function getCurrentMessage(msgId) {
    const res = await fetch(`message/getCurrMessage/${msgId}`, {
        method: "GET"
    })
    let result = await res.json()
    //console.log(result)
    let currMsg = result.data[0]["text"]
    document.querySelector("#edittext").defaultValue = currMsg
}

//"add comment" button
async function expandMessageForm(postId) {
    let res = await fetch('messageForm.html')
    let html = await res.text()

    document.querySelector('.messageFormContaniner').innerHTML = html

    renderAddMessage(postId)
}

//callback functions
function messageTemplate(obj, userId, postId) {
    if (obj.users_id === userId) {
        return `
        <div class="card messageCard" style="width: 70%;">
            <div class="card-body">
                <div class="userInfo">
                    <img src="${obj.users_icon}">
                    <div>user name: ${obj.users_name}</div>
                </div>
                <div class="messageCardBody">
                  <div>${obj.text}</div>
                  <div>
                    <div>created at: ${obj.message_create_at}</div>
                    <div>
                        <i class="btn btn-primary" data-bs-toggle="modal" id="expandEditMessage" data-id=${obj.message_id} class="fa-solid fa-square-pen" onclick="expandEditMessage(${obj.message_id},${postId})"> Edit</i>
                        <i data-id=${obj.message_id} class="fa-solid fa-trash-can" onclick="deleteMessage(${obj.message_id},${postId})"> Delete</i> 
                    </div>
                  </div>
                </div>
            </div>
        </div>
        `
    } else {
        return `
        <div class="card messageCard" style="width: 70%;">
            <div class="card-body">
                <div class="userInfo">
                    <img src="${obj.users_icon}">
                    <div>user name: ${obj.users_name}</div>
                </div>
                <div class="messageCardBody">
                  <div>${obj.text}</div>
                  <div>
                    <div>created at: ${obj.message_create_at}</div>
                    <div></div>
                  </div>
                </div>
            </div>
        </div>
        `
    }
}

function messageTemplateGuest(obj) {
    return `
        <div class="card messageCard" style="width: 70%;">
            <div class="card-body">
                <div class="userInfo">
                    <img src="${obj.users_icon}">
                    <div>user name: ${obj.users_name}</div>
                </div>
                <div class="messageCardBody">
                  <div>${obj.text}</div>
                  <div>
                    <div>created at: ${obj.message_create_at}</div>
                    <div></div>
                  </div>
                </div>
            </div>
        </div>
        `
}

async function fetchMessage(path, cb) {
    let res = await fetch(path)
}

// step 1
//async function regCardEvent(gameId) {
//    // document.querySelectorAll('.card.messageCard').forEach(card => {
//    //     card.addEventListener('click', async (e) => {
//    await fetchTemplate('messageForm.html', renderContent)
//    await renderGetMessage(gameId)
//    // })
//    // })
//}
//function renderContent(html) {
//    document.querySelector('.content').innerHTML = html
//}
