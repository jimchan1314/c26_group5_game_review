
async function displayNotLogin(html) {
    document.querySelector('.collapse').innerHTML = html;
}

async function displayLogin(html) {
    document.querySelector('.collapse').innerHTML = html;

    let user = await localStorage.getItem('user')
    user = JSON.parse(user)
    // console.log(user.users_icon)

    document.querySelectorAll('#userIcon-navbar').forEach(icon => icon.setAttribute('username', " Hi " + user.users_name))
    document.querySelectorAll('#userIcon-navbar > img').forEach(img => img.src = user.users_icon ? user.users_icon : "user.png")
    document.querySelectorAll('.logout').forEach(btn =>
        btn.addEventListener('click', async e => {
            e.preventDefault()


            let res = await fetch('user/logout', {
                method: "POST",
                body: "",
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
                localStorage.removeItem('user');
                indexCheck()

            }
        })
    )
}


async function renderRegisterFormModal(html) {
    document.querySelector('.form-modal-body').innerHTML = html



    let form = document.querySelector('#registerForm')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let formData = new FormData(form)

        let res = await fetch('user/register', {

            method: "POST",
            body: formData
        })
        let json = await res.json()
        console.log(json)
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
                title: 'Successfully Register',
                showConfirmButton: false,
                timer: 1500
            })
            document.querySelector('#modalDismiss').click()





        }


    })
}

async function renderLoginFormModal(html) {
    document.querySelector('.form-modal-body').innerHTML = html
    let form = document.querySelector('#loginForm')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let formData = new FormData(form)

        let res = await fetch('user/login', {

            method: "POST",
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
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
            })
            document.querySelector('#modalDismiss').click()
            await localStorage.setItem("user", JSON.stringify(json.data))
            indexCheck()



        }




    })
}

async function changePassword(html) {
    document.querySelector('.content').innerHTML = html
    let form = document.querySelector('.profile_PrivateForm')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let formData = new FormData(form)
        let result = await sweetAlert.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        })
        if (result.isConfirmed) {
            let res = await fetch('user/changePassword', {
                method: 'PUT',
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
                    title: 'Your Password has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else if (result.isDenied) {
            sweetAlert.fire('Changes are not saved', '', 'info')
        }
    })
}



async function renderProfile(html) {
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    document.querySelector('.content').innerHTML = html
    document.querySelector('#username').value = user.users_name
    // document.querySelector('.changeIcon').src = user.users_icon
    document.querySelectorAll('.changeIcon').forEach(img => img.src = user.users_icon ? user.users_icon : "user.png")
    let profileIcon = document.querySelector('#icon')
    let inputImg = document.querySelector('#userIcon')


    profileIcon.addEventListener('click', async (e) => {
        e.target = inputImg.click()
        console.log(e.target)

    })
    inputImg.addEventListener('change', async (e) => {
        if (e.target.files) {
            document.querySelector('.changeIcon').src = URL.createObjectURL(e.target.files[0])
        }
    })
    let form = document.querySelector('.profileForm')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let formData = new FormData(form)



        let result = await sweetAlert.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        })
        if (result.isConfirmed) {
            let res = await fetch('user/editProfile', {
                method: 'PUT',
                body: formData
            })
            let json = await res.json()
            console.log(json)
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
                    title: 'Your information has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                await localStorage.setItem('user', JSON.stringify(json.data))

                await fetchTemplate('loginNavbar.html', displayLogin)
            }
        } else if (result.isDenied) {
            sweetAlert.fire('Changes are not saved', '', 'info')
        }
    })

}






