// const { json } = require("stream/consumers");
// working...

//back for main page? may change fm renderAllGame
// async function publicAreaGameList(html) {
//   document.querySelector('.gameSection').innerHTML = html;
// }

// async function specialAreaGameList(html) {
//   document.querySelector('.gameSection').innerHTML = html;
// }


async function renderCreateGame(html) {
  document.querySelector('.content').innerHTML = html
  let form = document.querySelector('#gameForm')
  document.querySelector('.submit').addEventListener("click", async function (event) {
    event.preventDefault();


    const formData = new FormData(form);

    let res = await fetch("game/addGameList", {
      method: "POST",
      body: formData,
    });

    let json = await res.json(); // { success: true }
    // console.log("80 ", json)

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
        title: 'Successfully Post Game',
        showConfirmButton: false,
        timer: 1500
      })

      await fetchContent('homePage.html', displayContent, fetchAllGame)
    }
    await form.reset();
  });


}


// get db games -routes

async function fetchGameGuest(){
  let res = await fetch('/game/getGameList')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGameGuest(json.data)
  } 
}

function renderAllGameGuest(gameList) {
  
  gameList.forEach(obj =>
    obj.game_type === "Video Game" ? document.querySelector('#videoGame').innerHTML += 
    `
    <div class="gameBox card mb-3" style="max-width: 500px;">
    <div class="row g-0">
      <div class="col-md-4 gameCoverDiv">
      
        <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
      </div>
      <div class="col-md-8">
          <div class="card-body gBoxBody">
        
          <h4 class="card-title gBoxName">${obj.name}</h4>
          <div class="card-text gBoxType">Game Type: ${obj.game_type}</div>
          <p class="card-text gBoxDescription">Description: <br>${obj.description}</p>
          <div class="card-text">Created by: ${obj.users_name}</div>
          <div class="card-text">Create at: ${obj.create_post}</div>
          </div>
          <div class="card-body gBoxCount">
          <i class="fa-regular fa-comment-dots"> Message: 100</i>
          <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
          </div>
  
      </div>
    </div>
  </div>
  
  `  
     : document.querySelector('#boardGame').innerHTML+=
     `
     <div class="gameBox card mb-3" style="max-width: 500px;">
     <div class="row g-0">
       <div class="col-md-4 gameCoverDiv">
        
         <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
       </div>
       <div class="col-md-8">
           <div class="card-body gBoxBody">
           
           
           <h4 class="card-title gBoxName">${obj.name}</h4>
           <div class="card-text gBoxType">Game Type: ${obj.game_type}</div>
           <p class="card-text gBoxDescription">Description: <br>${obj.description}</p>
           <div class="card-text">Created by: ${obj.users_name}</div>
           <div class="card-text">Create at: ${obj.create_post}</div>
           </div>
           <div class="card-body gBoxCount">
           <i class="fa-regular fa-comment-dots"> Message: 100</i>
           <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
           </div>
   
       </div>
     </div>
   </div>  
     `)

}


async function fetchAllGame() {
  let res = await fetch('/game/getGameList')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGame(json.data)
    console.log("GF65", json.data)
  }
}



function renderVideoTemplate(obj,userId){
  
  document.querySelector('#videoGame').innerHTML += 
  `
  <div class="gameBox card mb-3" style="max-width: 500px;">
  <div class="row g-0">
    <div class="col-md-4 gameCoverDiv">
    
      <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
    </div>
    <div class="col-md-8">
        <div class="card-body gBoxBody">
        ${obj.create_users_id === userId ? 
          `
<<<<<<< HEAD
          <i data-id=${obj.post_id} class="fa-solid fa-square-pen"> Edit</i>
=======
          <i data-id=${obj.post_id} class="fa-solid fa-square-pen" onclick="renderEditGame()"> Edit</i>
>>>>>>> d8ef9854831b35a8e59af0356e50486b44176110
          <i data-id=${obj.post_id} class="fa-solid fa-trash-can"> Delete</i>
          ` :
          ""
          }
        <h4 class="card-title gBoxName">${obj.name}</h4>
        <div class="card-text gBoxType">Game Type: ${obj.game_type}</div>
        <p class="card-text gBoxDescription">Description: <br>${obj.description}</p>
        <div class="card-text">Created by: ${obj.users_name}</div>
        <div class="card-text">Create at: ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
        <i class="fa-regular fa-comment-dots"> Message: 100</i>
        <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
        </div>

    </div>
  </div>
</div>

`  
  
}

function renderBoardGameTemplate(obj,userId){
  // console.log(obj.create_users_id,userId);
  document.querySelector('#boardGame').innerHTML +=
  `
  <div class="gameBox card mb-3" style="max-width: 500px;">
  <div class="row g-0">
    <div class="col-md-4 gameCoverDiv">
      
      <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
    </div>
    <div class="col-md-8">
        <div class="card-body gBoxBody">
        ${obj.create_users_id === userId ? 
        `
<<<<<<< HEAD
        <i data-id=${obj.post_id} class="fa-solid fa-square-pen"> Edit</i>
=======
        <i data-id=${obj.post_id} class="fa-solid fa-square-pen" onclick="renderEditGame('${obj.post_id}')") > Edit</i>
>>>>>>> d8ef9854831b35a8e59af0356e50486b44176110
        <i data-id=${obj.post_id} class="fa-solid fa-trash-can"> Delete</i>
        ` :
        ""
        }
        
        <h4 class="card-title gBoxName">${obj.name}</h4>
        <div class="card-text gBoxType">Game Type: ${obj.game_type}</div>
        <p class="card-text gBoxDescription">Description: <br>${obj.description}</p>
        <div class="card-text">Created by: ${obj.users_name}</div>
        <div class="card-text">Create at: ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
        <i class="fa-regular fa-comment-dots"> Message: 100</i>
        <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
        </div>

    </div>
  </div>
</div>  
  `
}

//put in game area
async function renderAllGame(gameList) {
 
  let user = await localStorage.getItem('user');
  user = JSON.parse(user);
  
  // if (gameList[0].game_type === "Video Game") {
  
  // if(user=null){
    // user.id ='public'}
  // }
  
  // console.log("123", user)
  gameList.forEach(obj =>
  obj.game_type === "Video Game" ? renderVideoTemplate(obj,user.id) : renderBoardGameTemplate(obj,user.id))
  



  //del game
  document.querySelectorAll('.gameBox > div > div > div > i.fa-trash-can').forEach(i => i.addEventListener("click", async e => {
    let id = e.target.dataset.id
    // console.log('GF103',id)
    let res = await fetch(`/game/deleteGameList/${id}`, {

      method: "DELETE",
      body: ""
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
        title: 'Successfully Delete Game',
        showConfirmButton: false,
        timer: 1500
      })

      indexCheck()
    }
    
  }))


  







}



//edit game form
async function renderEditGame(id) {
  let res = await fetch('editForm.html')
  let html = await res.text()
  document.querySelector('.editGameForm').innerHTML = html

  let form = document.querySelector('#editGameForm')
  console.log(id)
  form.addEventListener("submit", async function (event) {
    event.preventDefault();


    const formData = new FormData(form);

    let res = await fetch(`game/editGameList/${id}`, {
      method: "PUT",
      body: formData,
    });

    let json = await res.json(); // { success: true }
    // console.log("80 ", json)

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
        title: 'Successfully Post Game',
        showConfirmButton: false,
        timer: 1500
      })


    }
    await form.reset();
  });


}






