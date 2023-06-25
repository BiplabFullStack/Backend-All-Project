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
        if(email && password){

        const data = await axios.post('http://localhost:3000/login',obj)
            if(data.status === 200){
                alert("login Successfully")
            }
            else{
                throw new Error(data.data.message)
            }
        }else{
            alert("Please fill all the Options");
        }
        }
   
    catch(err){
 
        console.log(JSON.stringify(err));
            document.body.innerHTML += `<div style ="color: red;">${err.message}</div>`
    }
}