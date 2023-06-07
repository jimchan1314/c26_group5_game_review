

async function fetchGameGuest() {
  let res = await fetch('/game/getGameList')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGameGuest(json.data)
  }
}

async function fetchAllGame() {
  let res = await fetch('/game/getGameList')
  let json = await res.json()
  console.log(json)
  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGame(json.data)

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
async function fetchBoardGame() {
  let res = await fetch('/game/getBoardGameList')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderBoardGameTemplate(json.data)
  }
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

async function fetchVideoRank() {
  let res = await fetch('game/getVideoRank/')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderVideoRankList(json.data)
  }
}

async function fetchBoardRank() {
  let res = await fetch('game/getBoardRank/')
  let json = await res.json()

  if (json.isError) {
    alert(json.errMess)
  } else {
    renderBoardRankList(json.data)
  }
}



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

      await fetchAllContent('homePage.html', displayContent, fetchBoardRank, fetchVideoRank)
    }
    await form.reset();
  });
}

async function renderAllGameGuest(gameList) {
  // console.log(gameList.data)

  gameList.forEach(async(obj) => {

    let messageRes = await fetch(`message/getMessageCount/${obj.post_id}`)
    let messageJson = await messageRes.json()
    let messageJsonCount = messageJson.data[0].count

    obj.game_type === "Video Game" ? document.querySelector('#videoGame').innerHTML +=
      `
    <div class="gameBox mb-3">
    <div id="ranking" class="rank_${i + 1}">NO.${i + 1}</div> 
    <div class="row box animate__animated animate__flipInX">
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
          
          <i class="fa-regular fa-comment-dots"> Message:<span id="messageCount-${obj.post_id}"> ${messageJsonCount}</span></i>
          <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart">like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i> 
          </div>
      </div>
      <div class="box-content">
        <div class="btn visit" onclick="fetchGameContentWID('gamepage.html',displayContent,${obj.post_id},fetchSingleGame)">Visit Page</div>
      </div>
    </div>
  </div>
  
  `
      : document.querySelector('#boardGame').innerHTML +=
      `
     <div class="gameBox mb-3">
     <div id="ranking" class="rank_${i + 1}">NO.${i + 1}</div> 
      <div class="row box animate__animated animate__flipInX">
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
           <i class="fa-regular fa-comment-dots"> Message:<span id="messageCount-${obj.post_id}"> ${messageJsonCount}</span></i>
           <i class="fa-regular fa-heart"> like: ${obj.like_count}</i>
           </div>
       </div>
      <div class="box-content">
        <div class="btn visit" onclick="fetchGameContentWID('gamepage.html',displayContent,${obj.post_id},fetchSingleGame)">Visit Page</div>
      </div>
     </div>
   </div>  
     `})

}
{/* <i data-id=${obj.post_id} class="fa-regular fa-comment-dots"> Message: 100</i>
          <i class="fa-regular fa-heart"> like: ${obj.like_count}</i> */}

async function fetchAllGame() {
  let res = await fetch('/game/getGameList')
  let json = await res.json()
  // console.log(json)
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



async function renderVideoTemplate(obj) {
  console.log("gf217", obj)

  obj.forEach(async(obj) => {

    let messageRes = await fetch(`message/getMessageCount/${obj.post_id}`)
    let messageJson = await messageRes.json()
    let messageJsonCount = messageJson.data[0].count

    document.querySelector('#videoGame').innerHTML +=
    `
  <div class="gameBox mb-3">
    <div class="row box animate__animated animate__flipInY">
    <div class="col-md-4 gameCoverDiv">
    
      <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
    </div>
    <div class="col-md-8">
        <div class="card-body gBoxBody">
        
        <h4 class="card-title gBoxName">${obj.name}</h4>

        
        <div class="card-text"><span style="color:#EF9A53">Created by:</span> ${obj.users_name}</div>
        <div class="card-text"><span style="color:#EF9A53">Create at:</span> ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
        <i class="fa-regular fa-comment-dots"> Message:<span id="messageCount-${obj.post_id}"> ${messageJsonCount}</span></i>
        <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart"> like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i>
        </div>
    </div>
    <div class="box-content">
      <div class="btn visit" onclick="fetchGameContentWID('gamepage.html',displayContent,${obj.post_id},fetchSingleGame)">Visit Page</div>
    </div>
  </div>
</div>

`})



}

async function renderBoardGameTemplate(obj) {

  obj.forEach(async (obj) => {

    let messageRes = await fetch(`message/getMessageCount/${obj.post_id}`)
    let messageJson = await messageRes.json()
    let messageJsonCount = messageJson.data[0].count

    document.querySelector('#boardGame').innerHTML +=
      `
        <div class="gameBox mb-3">
        <div class="row box animate__animated animate__flipInY">
          <div class="col-md-4 gameCoverDiv">
            
            <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
          </div>
          <div class="col-md-8">
              <div class="card-body gBoxBody">
              
              
              <h4 class="card-title gBoxName">${obj.name}</h4>

              
              <div class="card-text"><span style="color:#EF9A53">Created by:</span> ${obj.users_name}</div>
              <div class="card-text"><span style="color:#EF9A53">Create at:</span> ${obj.create_post}</div>
              </div>
              <div class="card-body gBoxCount">
              <i class="fa-regular fa-comment-dots"> Message:<span id="messageCount-${obj.post_id}"> ${messageJsonCount}</span></i>
              <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart">like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i> 
              </div>
          </div>
          <div class="box-content">
            <div class="btn visit" onclick="fetchGameContentWID('gamepage.html',displayContent,${obj.post_id},fetchSingleGame)">Visit Page</div>
          </div>
        </div>
      </div>  
      `
  })

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
  // gameList.forEach(obj =>
  //   obj.game_type === "Video Game" ? renderVideoTemplate(obj, user.id) : renderBoardGameTemplate(obj, user.id))


  // expand Message
  //expandMessageBox()
  //fetchTemplate('messageForm.html', expandMessageForm)

  //del game
  document.querySelectorAll('.userbtnSet > i.fa-trash-can').forEach(i => i.addEventListener("click", async e => {
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


  //like game
  document.querySelectorAll('#likeCount1').forEach(i => i.addEventListener("click", async e => {
    if (!e.target.id) {
      let id = e.target.dataset.likeid
      // console.log('GF275', id)
      let res = await fetch(`game/likeGame/${id}`, {
        method: "POST",
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
          title: 'Successfully Like Game',
          showConfirmButton: false,
          timer: 1500
        })

        indexCheck()
      }
    }
  }))

}


//edit game form
async function renderEditGame(id) {
  let res = await fetch('editForm.html')
  let html = await res.text()

  document.querySelector('.editGameForm').innerHTML = html

  let gameData = await fetch(`game/getSingleGame/${id}`)
  let resGame = await gameData.json()
  // console.log("gf289",resGame.data)
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


    }
    await form.reset();
    await fetchAllContent('homePage.html', displayContent, fetchBoardRank, fetchVideoRank)
    document.querySelector('.edit-close').click()
  });

}

async function renderVideoRankList(obj) {

  obj.forEach(async(obj, i) => {

    let messageRes = await fetch(`message/getMessageCount/${obj.post_id}`)
    let messageJson = await messageRes.json()
    let messageJsonCount = messageJson.data[0].count

    document.querySelector('#videoGame').innerHTML +=
    `
    
    <div class="gameBox mb-3">
    <div id="ranking" class="rank_${i + 1}">NO.${i + 1}</div> 
      <div class="row box animate__animated animate__flipInY">
      <div class="col-md-4 gameCoverDiv">
      
        <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
      </div>
      <div class="col-md-8">
          <div class="card-body gBoxBody">
          
          <h4 class="card-title gBoxName">${obj.name}</h4>

          
          <div class="card-text"><span style="color:#EF9A53">Created by:</span> ${obj.users_name}</div>
          <div class="card-text"><span style="color:#EF9A53">Create at:</span> ${obj.create_post}</div>
          </div>
          <div class="card-body gBoxCount">
          <i class="fa-regular fa-comment-dots"> Message:<span id="messageCount-${obj.post_id}"> ${messageJsonCount}</span></i>
          <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart"> like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i>
          </div>
      </div>
      <div class="box-content">
        <div class="btn visit" onclick="fetchGameContentWID('gamepage.html',displayContent,${obj.post_id},fetchSingleGame)">Visit Page</div>
      </div>
    </div>
  </div>
  
  `})
}

async function renderBoardRankList(obj) {
  obj.forEach(async(obj, i) => {

    let messageRes = await fetch(`message/getMessageCount/${obj.post_id}`)
    let messageJson = await messageRes.json()
    let messageJsonCount = messageJson.data[0].count

    document.querySelector('#boardGame').innerHTML +=
    `
  <div class="gameBox mb-3">
  <div id="ranking" class="rank_${i + 1}">NO.${i + 1}</div> 
  <div class="row box animate__animated animate__flipInY">
    <div class="col-md-4 gameCoverDiv">
      
      <img src="${obj.game_cover}" class="img-fluid rounded-start gBoxCover">
    </div>
    <div class="col-md-8">
        <div class="card-body gBoxBody">
        
        
        <h4 class="card-title gBoxName">${obj.name}</h4>

        
        <div class="card-text"><span style="color:#EF9A53">Created by:</span> ${obj.users_name}</div>
        <div class="card-text"><span style="color:#EF9A53">Create at:</span> ${obj.create_post}</div>
        </div>
        <div class="card-body gBoxCount">
        <i class="fa-regular fa-comment-dots"> Message:<span id="messageCount-${obj.post_id}"> ${messageJsonCount}</span></i>
        <i data-likeid=${obj.post_id} class="btn fa-regular fa-heart">like:<span id="likeCount-${obj.post_id}"> ${obj.like_count}</span></i> 
        </div>
    </div>
    <div class="box-content">
      <div class="btn visit" onclick="fetchGameContentWID('gamepage.html',displayContent,${obj.post_id},fetchSingleGame)">Visit Page</div>
    </div>
  </div>
</div>  

`})
}
async function fetchSingleGame(gameIDD) {

  //console.log("gf386", gameIDD)
  // console.log(gf387,user)
  let res = await fetch(`/game/getSingleGame/${gameIDD}`)
  let json = await res.json()
  // console.log("gfjs387",json)
  let messageRes = await fetch(`message/getMessageCount/${gameIDD}`)
  let messageJson = await messageRes.json()
  let messageJsonCount = messageJson.data[0].count
  // console.log('messageccc',messageJson.data[0].count)
  // messageJson.data[0]['count']




  document.querySelector('#gameName1').textContent = json.data.name
  document.querySelector('#gameType1').textContent = json.data.game_type
  document.querySelector('#description').textContent = json.data.description
  document.querySelector('#createPost1').textContent = json.data.create_post
  document.querySelector('#likeCount1').innerHTML = `<i data-likeid=${gameIDD} class="fa-regular fa-heart"> like: ${json.data.like_count}</i>`
  document.querySelector('#usersName1').textContent = json.data.users_name
  document.querySelector('#curGameCover').innerHTML = `<img src=${json.data.game_cover} />`
  document.querySelector('#messageCount').innerHTML = `<i class=" fa-regular fa-comment-dots" > Message: ${messageJsonCount}</i>`


  let user = localStorage.getItem('user')
  user = JSON.parse(user)
  // console.log('gfjs402',user.id)

  // checking
  if (!user) {
    console.log("guest111")
  } else {

    if (json.data.create_users_id === user.id) {

      document.querySelector('.userbtnSet').innerHTML =
        `
      <i data-id=${gameIDD} class="btn col-12 fa-solid fa-square-pen" onclick="renderEditGame('${gameIDD}')" data-bs-toggle="modal" data-bs-target="#editGameModal") > Edit</i>
      <i data-id=${gameIDD} class="btn col-12 fa-solid fa-trash-can"> Delete</i>
      `;
      document.querySelector('#likeCount1').innerHTML =
        `<i data-likeid=${gameIDD} class="btn fa-regular fa-heart"> like: ${json.data.like_count}</i>`;
    }
    else {
      // ""

      document.querySelector('#likeCount1').innerHTML =
        `<i data-likeid=${gameIDD} class="btn fa-regular fa-heart"> like: ${json.data.like_count}</i>`

    }

    // `<i data-likeid=${gameIDD} class="btn fa-regular fa-heart"> like: ${json.data.like_count}</i>`
    // document.querySelector('#likeCount1').innerHTML = `<i data-likeid=${gameIDD} class="fa-regular fa-heart" style="width: 200px;border: 1px solid white"> like: ${json.data.like_count}</i>`
  }




  if (json.isError) {
    alert(json.errMess)
  } else {
    renderAllGame(json.data)
    //console.log("GF352", json.data)
  }
}

// document.querySelectorAll('#likeCount1').forEach
// async function renderMessageCount(gameID){
//   let res = await fetch(`message/getMessageCount/${gameID}`)
//   let json = await res.json()
//   console.log('counting', json)

//   document.querySelector('#videoGame').innerHTML = 



// }











