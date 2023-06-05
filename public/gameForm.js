// const { json } = require("stream/consumers");
// working...

// const { json } = require("stream/consumers");

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

      await fetchContent('homePage.html', displayContent, fetchGameGuest)
    }
    await form.reset();
  });


}


// get db games -routes

async function fetchGameGuest() {
  let res = await fetch('/game/getGameList')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGameGuest(json.data)
<<<<<<< HEAD
    //expandMessageBox()
=======
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
  }
}

function renderAllGameGuest(gameList) {
<<<<<<< HEAD

  gameList.forEach(obj =>
    obj.game_type === "Video Game" ? document.querySelector('#videoGame').innerHTML +=
      `
    <div class="gameBox card mb-3" style="max-width: 500px;">
    <div class="row g-0">
=======
console.log(gameList.data)
  gameList.forEach(obj =>
    obj.game_type === "Video Game" ? document.querySelector('#videoGame').innerHTML +=
      `
    <div class="gameBox mb-3">
    <div class="row box">
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
      <div class="col-md-4 gameCoverDiv">
      
        <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
      </div>
      <div class="col-md-8">
          <div class="card-body gBoxBody">
        
          <h4 class="card-title gBoxName">${obj.name}</h4>
          <div class="card-text gBoxType"><span style="color:#EF9A53">Game Type:</span> ${obj.game_type}</div>
          <p class="card-text gBoxDescription"><span style="color:#EF9A53">Description:</span><br>${obj.description}</p>
          <div class="card-text"><span style="color:#EF9A53">Created by:</span>${obj.users_name}</div>
          <div class="card-text"><span style="color:#EF9A53">Create at:</span>${obj.create_post}</div>
          </div>
          <div class="card-body gBoxCount">
          <i data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
          <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
          </div>
      </div>
      <div class="box-content">
        <div class="visit">Visit Page</div>
      </div>
    </div>
  </div>
  
  `
      : document.querySelector('#boardGame').innerHTML +=
      `
<<<<<<< HEAD
     <div class="gameBox card mb-3" style="max-width: 500px;">
     <div class="row g-0">
=======
     <div class="gameBox mb-3">
      <div class="row box">
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
       <div class="col-md-4 gameCoverDiv">
        
         <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
       </div>
       <div class="col-md-8">
           <div class="card-body gBoxBody">
           
           
           <h4 class="card-title gBoxName">${obj.name}</h4>
           <div class="card-text gBoxType"><span style="color:#EF9A53">Game Type:</span> ${obj.game_type}</div>
          <p class="card-text gBoxDescription"><span style="color:#EF9A53">Description:</span><br>${obj.description}</p>
          <div class="card-text"><span style="color:#EF9A53">Created by:</span>${obj.users_name}</div>
          <div class="card-text"><span style="color:#EF9A53">Create at:</span>${obj.create_post}</div>
           </div>
           <div class="card-body gBoxCount">
           <i data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
           <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
           </div>
       </div>
      <div class="box-content">
        <div class="visit">Visit Page</div>
      </div>
     </div>
   </div>  
     `)

}


async function fetchAllGame() {
  let res = await fetch('/game/getGameList')
  let json = await res.json()
  console.log(json)
  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGame(json.data)
    // console.log("GF65", json.data)
  }
}

async function fetchVideoGame() {
  let res = await fetch('/game/getVideoGameList')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderVideoTemplate(json.data)
    
  }
}



<<<<<<< HEAD
function renderVideoTemplate(obj, userId) {

  document.querySelector('#videoGame').innerHTML +=
    `
  <div class="gameBox card mb-3" style="max-width: 500px;">
  <div class="row g-0">
=======
function renderVideoTemplate(obj) {
console.log(obj.data)
obj.forEach(obj =>
  document.querySelector('#videoGame').innerHTML +=
    `
  <div class="gameBox mb-3">
  <div class="row box">
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
    <div class="col-md-4 gameCoverDiv">
    
      <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
    </div>
    <div class="col-md-8">
        <div class="card-body gBoxBody">
<<<<<<< HEAD
        ${obj.create_users_id === userId ?
      `
          <i data-id=${obj.post_id} class="btn fa-solid fa-square-pen" onclick="renderEditGame('${obj.post_id}')" data-bs-toggle="modal" data-bs-target="#editGameModal") > Edit</i>
          <i data-id=${obj.post_id} class="btn fa-solid fa-trash-can"> Delete</i>
          ` :
      ""
    }
=======
        
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
        <h4 class="card-title gBoxName">${obj.name}</h4>
        <div class="card-text gBoxType"><span style="color:#EF9A53">Game Type:</span> ${obj.game_type}</div>
        <p class="card-text gBoxDescription"><span style="color:#EF9A53">Description:</span> <br>${obj.description}</p>
        <div class="card-text"><span style="color:#EF9A53">Created by:</span> ${obj.users_name}</div>
        <div class="card-text"><span style="color:#EF9A53">Create at:</span> ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
<<<<<<< HEAD
        <i data-bs-toggle="modal" data-bs-target="#addMessageModal" data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
        <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
=======
        <i class="fa-regular fa-comment-dots"> Message: 100</i>
        <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart"> like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i>
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
        </div>
    </div>
    <div class="box-content">
      <div class="visit">Visit Page</div>
    </div>
  </div>
</div>

<<<<<<< HEAD
`

}

function renderBoardGameTemplate(obj, userId) {
  // console.log(obj.create_users_id,userId);
  document.querySelector('#boardGame').innerHTML +=
    `
  <div class="gameBox card mb-3" style="max-width: 500px;">
  <div class="row g-0">
=======
`).join('')

}

function renderBoardGameTemplate(obj) {
  
  document.querySelector('#boardGame').innerHTML +=
    `
  <div class="gameBox mb-3">
  <div class="row box">
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
    <div class="col-md-4 gameCoverDiv">
      
      <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
    </div>
    <div class="col-md-8">
        <div class="card-body gBoxBody">
<<<<<<< HEAD
        ${obj.create_users_id === userId ?
      `
        <i data-id=${obj.post_id} class="btn fa-solid fa-square-pen" onclick="renderEditGame('${obj.post_id}')" data-bs-toggle="modal" data-bs-target="#editGameModal") > Edit</i>
        <i data-id=${obj.post_id} class="btn fa-solid fa-trash-can"> Delete</i>
        ` :
      ""
    }
=======
        
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
        
        <h4 class="card-title gBoxName">${obj.name}</h4>
        <div class="card-text gBoxType"><span style="color:#EF9A53">Game Type:</span> ${obj.game_type}</div>
        <p class="card-text gBoxDescription"><span style="color:#EF9A53">Description:</span> <br>${obj.description}</p>
        <div class="card-text"><span style="color:#EF9A53">Created by:</span> ${obj.users_name}</div>
        <div class="card-text"><span style="color:#EF9A53">Create at:</span> ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
<<<<<<< HEAD
        <i data-bs-toggle="modal" data-bs-target="#addMessageModal" data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
        <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
=======
        <i class="fa-regular fa-comment-dots"> Message: 100</i>
        <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart">like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i> 
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
        </div>
    </div>
    <div class="box-content">
      <div class="visit">Visit Page</div>
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
    obj.game_type === "Video Game" ? renderVideoTemplate(obj, user.id) : renderBoardGameTemplate(obj, user.id))
<<<<<<< HEAD
=======

>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3


  // expand Message
  //expandMessageBox()
  //fetchTemplate('messageForm.html', expandMessageForm)

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

<<<<<<< HEAD
=======
  }))


    //like game
  document.querySelectorAll('.gBoxCount > i.fa-heart').forEach(i => i.addEventListener("click", async e => {
    let id = e.target.dataset.likeid
    // console.log('GF275',e.target.dataset.likeid)
    let res = await fetch(`game/likeGame/${id}`,{
      method:"POST",
      body:""
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
        title: 'Successfully Like Game',
        showConfirmButton: false,
        timer: 1500
      })

      indexCheck()
    }
    
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
  }))


}



//edit game form
async function renderEditGame(id) {
  let res = await fetch('editForm.html')
  let html = await res.text()

  document.querySelector('.editGameForm').innerHTML = html

  let gameData = await fetch(`game/getSingleGame/${id}`)
  let resGame = await gameData.json()
<<<<<<< HEAD
  console.log("gf289", resGame.data)
=======
  // console.log("gf289",resGame.data)
>>>>>>> 41463c7ceb32d9971f2cc8e71365979f181bf6d3
  document.querySelector('#gameName').value = resGame.data.name
  document.querySelector('#game_type').value = resGame.data.game_type
  document.querySelector('#description').value = resGame.data.description
  document.querySelector('#CurGameCover').innerHTML = `<img src=${resGame.data.game_cover} />`





  let form = document.querySelector('#editGameForm')
  // console.log(id)
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

      await fetchContent('homePage.html', displayContent, fetchAllGame)
    }
    await form.reset();
  });


}


async function fetchSingleGame(id) {
  let res = await fetch(`/game/getGameList/${id}`)
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGame(json.data)
    // console.log("GF352", json.data)
  }
}








