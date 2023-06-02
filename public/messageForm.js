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

//get message
async function renderGetMessage() {
    let messageContainer = document.querySelector(".messageContainer")
    let user = await localStorage.getItem('user')
    user = JSON.parse(user)

    window.addEventListener("load", async () => {
        let gameId = messageContainer.dataset.id //get comment div born as game is born

        const res = await fetch(`message/getMessage/${gameId}`, {
            method: "GET"
        })
        const result = await res.json()
        //console.log(result.data)
        document.querySelector('.messageContainer').innerHTML = result.data.map(obj => messageTemplate(obj, user.id)).join('')
        deletemessage()
    })
}

//let user = await localStorage.getItem('user')
//user = JSON.parse(user)


renderAddMessage()
renderGetMessage()

//delete message
async function deletemessage() {
    document.querySelectorAll('.card-body > .messageCardBody > div > div > .fa-trash-can').forEach(i => i.addEventListener("click", async e => {
        let id = e.target.dataset.id
        const res = await fetch(`message/deleteMessage/${id}`, {
            method: "DELETE"
        })
        await res.json()
        //const result = await res.json()
        //console.log(result)
    }))
}

function messageTemplate(obj, userId) {
    if (obj.users_id === userId) {
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
                    <div>
                        <i data-id=${obj.id} class="fa-solid fa-square-pen"> Edit</i>
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


