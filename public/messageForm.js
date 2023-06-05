renderAddMessage()
renderGetMessage()

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
        deleteMessage()
        editMessage(result.data)
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

//edit message
async function editMessage(messages) {
    document.querySelectorAll('.card-body > .messageCardBody > div > div > .fa-square-pen').forEach(i => i.addEventListener("click", async e => {
        console.log('edit clicked')
        console.log(messages)
        let id = e.target.dataset.id
        console.log(id)
        //let content = messages.filter(messsge => message.id == id)
        //console.log(content)
        //const messageForm = document.querySelector("#messageForm")
        //messageForm.text.defaultValue = message.

        //const res = await fetch(`message/editMessage/${id}`, {
        //    method: "PUT"
        //})
        //await res.json()
    })
    )
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

