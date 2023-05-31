// const { json } = require("stream/consumers");

// working...
// function renderGameFormModal(){
  

let form = document.querySelector('#gameForm')
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Serialize the Form afterwards
  
  console.log(form)
  const formData = new FormData(form);

  // Submit FormData(), no need to add "Content-Type": "application/json"
  const res = await fetch("game/gameList", {
    method: "POST",
    body: formData,
  });

  const result = await res.json(); // { success: true }
  console.log(`js game form result: ${result}`)

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
  }
  
  // const gameSection = document.querySelector(".gameSection")
  // gameSection.innerHTML += result;



});

