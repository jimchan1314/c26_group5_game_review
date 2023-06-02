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
