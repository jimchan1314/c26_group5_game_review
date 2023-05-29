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
            fetchTemplate('userDropDown.html',displayLogin)
            
            
            
        }

        
        

    })
}