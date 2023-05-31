// const { json } = require("stream/consumers");
// working...

//back for main page? may change fm renderAllGame
// async function publicAreaGameList(html) {
//   document.querySelector('.gameSection').innerHTML = html;
// }

// async function specialAreaGameList(html) {
//   document.querySelector('.gameSection').innerHTML = html;
// }

  

let form = document.querySelector('#gameForm')
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  
  console.log(form)
  const formData = new FormData(form);

  let res = await fetch("game/addGameList", {  
    method: "POST",
    body: formData,
  });

  let json = await res.json(); // { success: true }
  // console.log("80 ", json)

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

    // await renderAllMemo(json.data)  
  }
  await form.reset();

  // socketAddMemo(json.data[`${json.data.length - 1}`])

});

// get db games -routes
async function fetchAllGame(){
  let res = await fetch('/game/getGameList')
  let json = await res.json()
  
  if(json.isError){
      alert(json.errMess)
  }else{
      renderAllGame(json.data)
      console.log("GF63", json.data)
  }
}

//put in game area
async function renderAllGame(gameList){
  document.querySelector('.gameSession').innerHTML = gameList.map(obj=>`
  
  <div class="gameBox card mb-3" style="max-width: 500px;">
      <div class="row g-0">
        <div class="col-md-4">
        Game Cover  
          <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
        </div>
        <div class="col-md-8">
            <div class="card-body gBoxBody">
            <div class="card-text gBoxType">Game Type: ${obj.game_type}</div>
            <h4 class="card-title gBoxName">${obj.name}</h4>
            <p class="card-text gBoxDescription">Description: <br>${obj.description}</p>
            <div class="card-text">Created by: ${obj.create_users_id}</div>
            <div class="card-text">Create at: ${obj.create_at}</div>
            </div>
            <div class="card-body gBoxCount">
            <i class="fa-regular fa-comment-dots"> Message: 100</i>
            <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
            </div>

        </div>
      </div>
  </div>

  `).join('')

}

