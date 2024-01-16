<<<<<<< Updated upstream
//This file is created based on the lecture materials from week 9!!

window.onload(
    initializeCodeLogin(); 
)

function initializeCodeLogin(){
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}


async function onSubmit(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    fetch("/api/user/login", {
        method: "POST", 
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.token) {
            storeToken(data.token); 
            window.location.href="/";
        } else {
            if (data.message) {
                document.getElementById("error").innerHTML = data.message;
            } else {
                document.getElementById("error").innerHTML = "Strange error!";
            }
        }
    })


}

// Here is saved the token of client?
function storeToken(token) {
    localStorage.setItem("auth_token", token);
}
=======
//Based on lecture materials!

window.onload = () => {
    //let url = "/api/user/register"
    //const registerForm = document.getElementById("register-form");
    // Elements from registering form: 

    const submitBtn = document.getElementById("submitBtn");
    //registerForm.addEventListener("submit", onSubmit)
    submitBtn.addEventListener("click", onSubmit)

}



async function onSubmit(event) {
    event.preventDefault();
    let url = "/api/user/login"
    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");
    let user = {
        email: inputEmail.value, 
        password: inputPassword.value
    } 
    let response = await fetch(url, {
        method: "POST", 
        headers: {
        "Content-type": "application/json"
        }, 
        body: JSON.stringify(user)
    })

    console.log(await response.json());
}
>>>>>>> Stashed changes
