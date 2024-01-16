//Based on lecture materials!

/*window.onload = () => {
    //let url = "/api/user/register"
    //const registerForm = document.getElementById("register-form");
    // Elements from registering form: 

    const submitBtn = document.getElementById("submitBtn");
    //registerForm.addEventListener("submit", onSubmit)
    submitBtn.addEventListener("click", onSubmit)

}



async function onSubmit(event) {
    event.preventDefault();
    let url = "/api/user/register"
    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");
    let newUser = {
        email: inputEmail.value, 
        password: inputPassword.value
    } 
    let response = await fetch(url, {
        method: "POST", 
        headers: {
        "Content-type": "application/json"
        }, 
        body: JSON.stringify(newUser)
    })

    //console.log(await response.json());
}*/