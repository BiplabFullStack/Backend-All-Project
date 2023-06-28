async function myLogInFunc(event) {
    event.preventDefault();
    try{

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    event.target.reset();

    
    const myObj ={email,password}
    if(email && password){
        const data = await axios.post('http://localhost:3000/login',myObj)
        if(data.status === 200){
            alert("Login Successfully")
            localStorage.setItem('token',data.data.token)
            window.location.href = '../website/website.html';
        }
        else{
            throw new Error(data.data.message)
        }
    }else{
        alert("Please enter both username and Password")
    }
    }
    catch(err){
        console.log(JSON.stringify(err));
        alert("Invalid Username and Password")
       // document.body.innerHTML += `<div style ="color:red">${err.message}</div>`
    }

}