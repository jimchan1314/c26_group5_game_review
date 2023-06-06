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
    function renderVideoTemplate(obj, userId) {
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
          <i data-id=${obj.post_id} class="btn fa-solid fa-square-pen" onclick="renderEditGame('${obj.post_id}')" data-bs-toggle="modal" data-bs-target="#editGameModal") > Edit</i>
          <i data-id=${obj.post_id} class="btn fa-solid fa-trash-can"> Delete</i>
          ` :
      ""
    }
        <h4 class="card-title gBoxName">${obj.name}</h4>
        <div class="card-text gBoxType"><span style="color:#ACBCFF">Game Type:</span> ${obj.game_type}</div>
        <p class="card-text gBoxDescription"><span style="color:#ACBCFF">Description:</span> <br>${obj.description}</p>
        <div class="card-text"><span style="color:#ACBCFF">Created by:</span> ${obj.users_name}</div>
        <div class="card-text"><span style="color:#ACBCFF">Create at:</span> ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
        <i data-bs-toggle="modal" data-bs-target="#addMessageModal" data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
        <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
        </div>
    
    </div>
    </div>
    </div>
    `
    }
    function renderBoardGameTemplate(obj, userId) {
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
        <i data-id=${obj.post_id} class="btn fa-solid fa-square-pen" onclick="renderEditGame('${obj.post_id}')" data-bs-toggle="modal" data-bs-target="#editGameModal") > Edit</i>
        <i data-id=${obj.post_id} class="btn fa-solid fa-trash-can"> Delete</i>
        ` :
      ""
    }
    
        <h4 class="card-title gBoxName">${obj.name}</h4>
        <div class="card-text gBoxType"><span style="color:#ACBCFF">Game Type:</span> ${obj.game_type}</div>
        <p class="card-text gBoxDescription"><span style="color:#ACBCFF">Description:</span> <br>${obj.description}</p>
        <div class="card-text"><span style="color:#ACBCFF">Created by:</span> ${obj.users_name}</div>
        <div class="card-text"><span style="color:#ACBCFF">Create at:</span> ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
        <i data-bs-toggle="modal" data-bs-target="#addMessageModal" data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
        <i class="fa-regular fa-heart" > like: ${obj.like_count}</i>
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
    obj.game_type === "Video Game" ? renderVideoTemplate(obj, user.id) : renderBoardGameTemplate(obj, user.id))
    // expand Message
    //expandMessageBox()
    //fetchTemplate('messageForm.html', expandMessageForm)
    //del game
    document.querySelectorAll('.gameBox > div > div > div > i.fa-trash-can').forEach(i => i.addEventListener("click", async e => {
    let id = e.target.dataset.id
    // console.log('GF103',id)
    let res = await fetch(/game/deleteGameList/${id}, {
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