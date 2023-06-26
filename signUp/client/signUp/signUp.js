async function myFunc(event) {
    try {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
     
        event.target.reset();

        const myObj = {
            name,
            email,
            password
        }




        // if (name && email && password) {

            const postdata = await axios.post("http://localhost:3000/postdata", myObj)
            try {      

                console.log("Succesfully Create your Profile");
            }
            catch (err) {
                console.log(err);
            }

        // } else {
        //     alert('Enter All the things please');
        // }
    }
    catch (err) {
        console.log(err);
    }
}
