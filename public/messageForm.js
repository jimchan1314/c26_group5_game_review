let messageForm = document.querySelector("#messageForm")
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('submit clicked')

    //const message = e.target
    const messageData = new FormData(messageForm)
    //messageData.append('message', message.message.value)
    //messageData.append('messagePic', message.messagePic.files[0])

    const res = await fetch('message/addMessage', {
        method: "POST",
        body: messageData
    })
    const result = await res.json()
    console.log(result)
    await messageForm.reset()
})
