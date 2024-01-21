window.onload = async () => {
    let response = await fetch("/api/private", {
        method: "GET", 
        headers: {
            "Authorization": 'Bearer ' + localStorage.getItem("auth_token")
        }
    })
    let text = await response.text(); 
    console.log(text);
    if (text === "Unauthorized") {
        console.log("NO ACCESSS!");
    } else if (text === "Authorized") {
        console.log("Has Access!");

    }
}