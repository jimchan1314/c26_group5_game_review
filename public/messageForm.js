// renderAddMessage()
// renderGetMessage()


// step 1
async function regCardEvent(gameId) {
    // document.querySelectorAll('.card.messageCard').forEach(card => {
    //     card.addEventListener('click', async (e) => {
    await fetchTemplate('messageForm.html', renderContent)
    await renderGetMessage(gameId)
    // })
    // })
}
function renderContent(html) {
    document.querySelector('.content').innerHTML = html
}

//get message
async function renderGetMessage(gameId) {
    // let messageContainer = document.querySelector(".messageContainer")
    let user = await localStorage.getItem('user')
    user = JSON.parse(user)
    // let postId = gameId

    // let postId = messageContainer.dataset.id

    const res = await fetch(`message/getMessage/${gameId}`)
    const result = await res.json()
    //console.log(result.data)
    document.querySelector('.messageContainer').innerHTML = result.data.map(obj => messageTemplate(obj, user.id)).join('')



    deleteMessage()
    editMessage()


}


//add message
async function renderAddMessage() {
    let messageForm = document.querySelector("#messageForm")
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        console.log('submit clicked')
        let gameId = messageForm.dataset.id //as game is born or button is clicked -> html with id is generated.

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





//delete message
async function deleteMessage() {
    document.querySelectorAll('.card-body > .messageCardBody > div > div > .fa-trash-can').forEach(i => i.addEventListener("click", async e => {
        let id = e.target.dataset.id
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

// async function displayEditMessageForm(html) {

//     document.querySelector('.addMessageModal').innerHTML = html

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

//edit message
async function editMessage() {
    document.querySelectorAll('.card-body > .messageCardBody > div > div > .fa-square-pen').forEach(i => i.addEventListener("click", async e => {
        console.log('edit clicked')

        // let msgId = e.target.dataset.id
        //console.log(msgId)
        // getCurrentMessage(msgId)


        await fetchTemplate('editMessageForm.html', displayEditMessageForm)


        await messageForm.reset()
    })
    )
}

async function getCurrentMessage(msgId) {
    const res = await fetch(`message/getCurrMessage/${msgId}`, {
        method: "GET"
    })
    let result = await res.json()
    let currMsg = result.data[0]["text"]
    //console.log(currMsg)
    document.querySelector("#messageText").defaultValue = currMsg
}

function messageTemplate(obj, userId) {
    if (obj.users_id === userId) {
        return `
        <div class="card messageCard" style="width: 400px;">
            <div class="card-body">
                <div class="userInfo">
                    <img src="user_pic">
                    <div>user id: ${obj.users_id}</div>
                </div>
                <div class="messageCardBody">
                  <div>${obj.text}</div>
                  <div>
                    <div>created at: ${obj.create_at}</div>
                    <div>
                        <i class="btn btn-primary" data-bs-toggle="modal" data-id=${obj.id} class="fa-solid fa-square-pen"> Edit</i>
                        <i data-id=${obj.id} class="fa-solid fa-trash-can"> Delete</i> 
                    </div>
                  </div>
                </div>
            </div>
        </div>
        `
    } else {
        return `
        <div class="card messageCard" style="width: 400px;">
            <div class="card-body">
                <div class="userInfo">
                    <img src="users_pic">
                    <div>user id: ${obj.users_id}</div>
                </div>
                <div class="messageCardBody">
                  <div>${obj.text}</div>
                  <div>
                    <div>created at: ${obj.create_at}</div>
                    <div></div>
                  </div>
                </div>
            </div>
        </div>
        `
    }
}


async function expandEditMessageForm(html, msgId) {
    document.querySelector('.editMessageModal').innerHTML = html
    console.log(document.querySelector('.editMessageModal').innerHTML)
}

//await fetchTemplate('editMessageForm.html',)