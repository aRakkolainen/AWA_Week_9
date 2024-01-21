window.onload = async () => {
    //let body = document.getElementById("body");
    let header = "Bearer " + localStorage.getItem("auth_token");
    let response = await fetch("/api/private", {
        method: "GET", 
        headers: {
            "authorization": header
        }
    })
    console.log(response.status)
    //let text = await response.json(); 
    //console.log(text);
    if (response.status == 401) {
        console.log("NO ACCESSS!");
        // Creating links: https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
        let register = document.createElement("a");
        let registerLink = document.createTextNode("Register");
        register.appendChild(registerLink)
        register.title = "Register";
        register.href = "/register.html";
        let login = document.createElement("a");
        let loginLink = document.createTextNode("Login");
        login.appendChild(loginLink)
        login.title = "Login";
        login.href = "/login.html";
        document.body.appendChild(login);
        document.body.appendChild(register);
    } else {
        console.log("AUTHENTICATED ACCESS PROVIDED!");
        let email = await response.json(); 
        let logOutBtn = document.createElement("button");
        logOutBtn.innerHTML = "Logout"
        let user = document.createElement("p");
        user.innerText = email.email;
        document.body.appendChild(logOutBtn);
        document.body.appendChild(user);

        logOutBtn.addEventListener("click", () => {
            localStorage.removeItem("auth_token");
        })


    }
}