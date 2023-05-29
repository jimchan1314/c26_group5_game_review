function renderLoginFormModal(html) {
    document.querySelector('.form-modal-body').innerHTML = html
    let form = document.querySelector('.form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let formData = new FormData(form)
        let res = await fetch('user/login', {
            
            method: "POST",
            body: formData
        })
        let json = await res.json()
        console.log(json)

        await sweetAlert.fire({
            icon: 'success',
            title: 'Successfully Login',
            showConfirmButton: false,
            timer: 1500
        })
        document.querySelector('#close').click()
        await localStorage.setItem("user",JSON.stringify(json.data))
        fetchTemplate('userDropDown.html',displayLogin)
        document.querySelectorAll('.memo > i.fa-trash').forEach(i=>i.style.display = "block")
        document.querySelectorAll('.memo > i.fa-pen-to-square').forEach(i=>i.style.display = "block")

    })
}