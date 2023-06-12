const nav = `
<nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img id="gameLogo" src="gamelogo.png">
    <div onclick="indexCheck()" class="title navbar-brand"> GamerVoice</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <!-- navbar -->
    </div>
  </div>
</nav>
<div class="modal fade" id="FormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content gameFormBorder">
      <div class="form-modal-body">


      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="editGameModal" tabindex="-1" aria-labelledby="editGameModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="editGameFormModal">
      <!-- <div class="form-modal-body1"> -->
      <div class="editGameForm">

      </div>
      <!-- </div> -->
    </div>
  </div>
</div>

<div class="modal fade" id="addMessageModal" tabindex="-1" aria-labelledby="addMessageModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="addMessageModal">
      <!-- <div class="form-modal-body1"> -->
      <div class="addMessageModal">

      </div>
      <!-- </div> -->
    </div>
  </div>
</div>

<!-- <section class="editGameForm">

</section> -->
<session class="content">

</session>
`;
const main = document.createElement("main");
main.innerHTML = nav;

document.querySelector("body").appendChild(main);
