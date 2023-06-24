async function login(event){
    
    try{
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        event.target.reset();

        const obj ={
            email,
            password
        }

        const data = await axios.post('http://localhost:3000/login',obj)
        try{
            console.log(data);
            if(data.status === 200){
                alert("login Successfully")
            }
            else if(data.status === 400){
                console.log("Wrong email and password");
                alert("Wrong email and password")
            }
            else{
                alert("Something is Wrong")
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    catch(err){
        console.log(err.message);
    }
}