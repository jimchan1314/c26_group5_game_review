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

//get message
async function renderGetMessage(postId) {

    let user = await localStorage.getItem('user')
    user = JSON.parse(user)

    const res = await fetch(`message/getMessage/${postId}`)
    const result = await res.json()

    if (!user) {
        document.querySelector('.messageContainer').innerHTML = result.data.map(obj => messageTemplateGuest(obj)).join('')
    } else {
        document.querySelector('.messageContainer').innerHTML = result.data.map(obj => messageTemplate(obj, user.id)).join('')
        document.querySelector('.expandMessageForm').innerHTML =
            `<i class="fa-solid fa-clipboard" id="expandButton" onclick="expandMessageForm(${postId})">Add Comment</i>`

        // deleteMessage()
        // editMessage()
    }
}


//add message
async function renderAddMessage(gameId) {
    let messageForm = document.querySelector("#messageForm")
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        console.log('submit clicked')

        const messageData = new FormData(messageForm)

        const res = await fetch(`message/addMessage/${gameId}`, {
            method: "POST",
            body: messageData
        })
        const result = await res.json()
        console.log(result)
        await messageForm.reset()
    })
}


//delete message: not yet finish
async function deleteMessage() {
    document.querySelectorAll('.card-body > .messageCardBody > div > div > .fa-trash-can').forEach(i => i.addEventListener("click", async e => {
        let id = e.target.dataset.id //get from ??
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
                const res = await fetch(`message/deleteMessage/${id}`, {
                    method: "DELETE"
                })
                Swal.fire(
                    'Deleted!',
                    'Your comment has been deleted.',
                    'success'
                )
                await res.json()
            }
        })
    }))
}

//edit message: not yet finish
async function editMessage() {
    document.querySelectorAll('.card-body > .messageCardBody > div > div > .fa-square-pen').forEach(i => i.addEventListener("click", async e => {
        await fetchTemplate('editMessageForm.html', displayEditMessageForm)
        await messageForm.reset()
    })
    )
}

//get current message: not yet finish
async function getCurrentMessage(msgId) {
    const res = await fetch(`message/getCurrMessage/${msgId}`, {
        method: "GET"
    })
    let result = await res.json()
    let currMsg = result.data[0]["text"]

    document.querySelector("#messageText").defaultValue = currMsg
}

function messageTemplate(obj, userId) {
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
                        <i class="btn btn-primary" data-bs-toggle="modal" data-id=${obj.message_id} class="fa-solid fa-square-pen"> Edit</i>
                        <i data-id=${obj.message_id} class="fa-solid fa-trash-can"> Delete</i> 
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

async function expandMessageForm(postId) {
    let res = await fetch('messageForm.html')
    let html = await res.text()

    //console.log(postId) //able to get post Id

    document.querySelector('.messageFormContaniner').innerHTML = html

    renderAddMessage(postId)
}


//edit:
// async function displayEditMessageForm(html) {

//     document.querySelector('.editMessageModal').innerHTML = html

//     //not yet
//     const editMessageForm = document.querySelector("#editMessageForm")
//     const messageData = new FormData(editMessageForm)

//     const res = await fetch(`message/editMessage/${msgId}`, {
//         method: "PUT",
//         body: messageData
//     })
//     const result = await res.json()
//     console.log(result)
// }


//async function expandEditMessageForm(html, msgId) {
//    document.querySelector('.editMessageModal').innerHTML = html
//    console.log(document.querySelector('.editMessageModal').innerHTML)
//}