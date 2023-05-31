// const { json } = require("stream/consumers");

// working...

  

let form = document.querySelector('#gameForm')
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  
  // console.log(form)
  const formData = new FormData(form);

  let res = await fetch("game/gameList", {
    method: "POST",
    body: formData,
  });

  let json = await res.json(); // { success: true }
  console.log(json)

  if(json.isError){
    await sweetAlert.fire({
        icon: 'info',
        title: gameResult.errMess,
        showConfirmButton: false,
        timer: 1500
  })
      
  }else{
    await sweetAlert.fire({
        icon: 'success',
        title: 'Successfully Post Game',
        showConfirmButton: false,
        timer: 1500
    })
  }
  await form.reset();

  // document.querySelector('#modalDismiss').click()
  
  // const gameSection = document.querySelector(".gameSection")
  // gameSection.innerHTML += `
  //   <div class="gamebox card mb-3" style="max-width: 500px;">
  //   <div class="row g-0">
  //     <div class="col-md-4">
  //       Game Cover
  //       <img src="" class="img-fluid rounded-start gBoxCover" alt="...">
  //     </div>
  //     <div class="col-md-8">
  //       <div class="card-body gBoxBody">
  //         <div class="card-text gBoxType">Game Type</div>
  //         <h4 class="card-title gBoxName">Game Name</h4>
  //         <p class="card-text gBoxDescription">This is a wider card with supporting text below as a natural lead-in
  //           to additional content. This content is a little bit longer.</p>
  //         <div class="card-text">Created by:</div>
  //         <div class="card-text">Create at</div>
  //       </div>
  //       <div class="card-body gBoxCount">
  //         <i class="fa-regular fa-comment-dots"> Message: 100</i>
  //         <i class="fa-regular fa-heart"> like: 100</i>
  //       </div>

  //     </div>
  //   </div>
  // </div>

  // `;



});

