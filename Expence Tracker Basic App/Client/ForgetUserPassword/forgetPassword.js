async function forgetPassword(event){
    try{
    event.preventDefault();
    const email = document.getElementById('email').value;

    const obj ={email}

    const password =await axios.post('http://localhost:3000/password/forgotpassword',obj)
    
    if(password.status === 201){
        alert(password.data.message)
        window.location.href = '../SignIn/signIn.html'
    }
    else{
        alert("Enter Valid Email")
        
    }
}
catch(err){
    console.log(err.message);
}
}