let messageContainer = document.querySelector(".messageContainer")

window.addEventListener("load", async () => {
    let gameId = messageContainer.dataset.id //get comment div born as game is born

    const res = await fetch(`message/getMessage/${gameId}`, {
        method: "GET"
    })
    const result = await res.json()
    //console.log(result.data)
    document.querySelector('.messageContainer').innerHTML = result.data.map(obj => message(obj)).join('')
})

function message(obj) {
    return `
    <div class="card messageCard" style="width: 400px;">
        <div class="card-body">
            <div class="userInfo">
                <img src="users_pic">
                <div>${obj.users_id}</div>
            </div>
            <div class="messageCardBody">
              <div>${obj.text}</div>
            </div>
        </div>
    </div>
    `
}

{/* <img src="${obj.image}"></img> */ }
