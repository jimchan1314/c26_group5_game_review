function displayNotLogin(html){
    document.querySelector('.collapse').innerHTML = html;
}

async function displayLogin(html){
    document.querySelector('.collapse').innerHTML = html;

    let user = await localStorage.getItem('user')
    user = JSON.parse(user)

    document.querySelectorAll('.userIcon').forEach(icon=>icon.setAttribute('username'," Hi " + user.users_name)) 
    document.querySelectorAll('.userIcon > img').forEach(img=>img.src = user.user_icon ? user.user_icon : "user.png")
    document.querySelectorAll('.logout').forEach(btn=>
        btn.addEventListener('click',async e=>{
            e.preventDefault()
            
            
            let res = await fetch('user/logout',{
                method:"POST",
                body:"",
            })
            let json = await res.json()
            console.log(json)
            if(json.isError){
                await sweetAlert.fire({
                    icon: 'info',
                    title: json.errMess,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                await localStorage.removeItem('user');
                await fetchTemplate('nonLoginNavbar.html',displayNotLogin)
                
            }
        })    
        )
}











function renderRegisterFormModal(html){
    document.querySelector('.form-modal-body').innerHTML = html 

    

    let form = document.querySelector('.form')
    form.addEventListener('submit',async (e)=>{
        e.preventDefault()
        let formData = new FormData(form)
        
        let res = await fetch('user/register',{
           
            method:"POST",
            body:formData
        })
        let json = await res.json()
        console.log(json)
        if(json.isError){
            await sweetAlert.fire({
                icon: 'info',
                title: json.errMess,
                showConfirmButton: false,
                timer: 1500
              })
              
        }else{
            await sweetAlert.fire({
                icon: 'success',
                title: 'Successfully Register',
                showConfirmButton: false,
                timer: 1500
              })
            document.querySelector('#modalDismiss').click()  
            await localStorage.setItem("user",JSON.stringify(json.data)) 
            
            
            
            
        }
        

    })
}

function renderLoginFormModal(html){
    document.querySelector('.form-modal-body').innerHTML = html 
    let form = document.querySelector('.form')
    form.addEventListener('submit',async (e)=>{
        e.preventDefault()
        let formData = new FormData(form)
    
        let res = await fetch('user/login',{
            
            method:"POST",
            body:formData
        })
        let json = await res.json()
        

        if(json.isError){
            await sweetAlert.fire({
                icon: 'info',
                title: json.errMess,
                showConfirmButton: false,
                timer: 1500
              })

        }else{
            await sweetAlert.fire({
                icon: 'success',
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
              })
            document.querySelector('#modalDismiss').click()
            await localStorage.setItem("user",JSON.stringify(json.data))  
            fetchTemplate('loginNavbar.html',displayLogin)
            
            
            
        }

        
        

    })
}