// working...

document.querySelector("#gameForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formData = new FormData(form);

    // Submit FormData(), no need to add "Content-Type": "application/json"
    const res = await fetch("/gameList", {
      method: "POST",
      body: formData,
    });

    const result = await res.json(); // { success: true }
    console.log(result)
    // document.querySelector("#contact-result").textContent = result;
});