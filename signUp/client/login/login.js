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
            else{
                throw new Error(data.data.message)
            }
        }
        catch(err){
            console.log(JSON.stringify(err));
            document.body.innerHTML += `<div style ="color: red;">${err.message}</div>`
        }
    }
    catch(err){
 
        console.log(JSON.stringify(err));
            document.body.innerHTML += `<div style ="color: red;">${err.message}</div>`
    }
}