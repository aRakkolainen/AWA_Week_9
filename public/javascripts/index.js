window.onload = async () => {
    //let body = document.getElementById("body");
    let header = "Bearer " + localStorage.getItem("auth_token");
    let response = await fetch("/api/private", {
        method: "GET", 
        headers: {
            "authorization": header
        }
    })
    //let text = await response.json(); 
    //console.log(text);
    if (response.status == 401) {
        console.log("NO ACCESSS!");
        // Creating links: https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
        let register = document.createElement("a");
        let registerLink = document.createTextNode("Register");
        register.appendChild(registerLink)
        register.href = "/register.html";
        let login = document.createElement("a");
        let loginLink = document.createTextNode("Login");
        login.appendChild(loginLink)
        login.href = "/login.html";
        document.body.appendChild(login);
        document.body.appendChild(register);
    } else {
        console.log("AUTHENTICATED ACCESS PROVIDED!");
        //Rendering existing items: 
        let email = await response.json(); 
        let logOutBtn = document.createElement("button");
        logOutBtn.innerHTML = "Logout"
        logOutBtn.setAttribute("id", "logout");
        let user = document.createElement("p");
        user.innerText = email.email;
        document.body.appendChild(logOutBtn);
        document.body.appendChild(user);

        logOutBtn.addEventListener("click", () => {
            localStorage.removeItem("auth_token");
            window.location.href="/";
        })

        let todo = document.createElement("input");
        todo.setAttribute("type", "text");
        todo.setAttribute("id", "add-item");
        todo.setAttribute("placeholder", "Add todo..");
        document.body.appendChild(todo);
        //Based on this: https://blog.devgenius.io/how-to-detect-the-pressing-of-the-enter-key-in-a-text-input-field-with-javascript-380fb2be2b9e
        todo.addEventListener("keyup", async (event) => {
            if (event.key === "Enter") {
                console.log(todo.value)
                if (todo.value) {
                    let todoItem = {
                        "items": [todo.value]
                    }
                    let result = await fetch("/api/todos", {
                        method: "POST", 
                        headers: {
                            "Content-type": "application/json", 
                            "authorization": "Bearer " + localStorage.getItem("auth_token")
                        }, 
                        body: JSON.stringify(todoItem)                   
                    })
                    console.log(result.status);
                }
            }
        })
        //Rendering existing items: 
        let todosResponse = await fetch("/api/todos")
        let todos = await todosResponse.json(); 
        console.log(todos);
    }
}