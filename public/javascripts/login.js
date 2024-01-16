
//This file is created based on the lecture materials from week 9!!
if (document.readyState !== "loading") {
    initializeCodeLogin(); 
} else {
    document.addEventListener("DOMContentLoaded", function() {
        initializeCodeLogin();
    })
}


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
        console.log(data.token)
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
