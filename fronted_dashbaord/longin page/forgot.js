function recover(){
    const email=
    document.getElementById("email").value;
    const user=
    json.perse(localStorage.getItem(email));
    if(!user){
        alert("email not found");
        return
    }
    alert("your passowrd is:" + user.password)
}