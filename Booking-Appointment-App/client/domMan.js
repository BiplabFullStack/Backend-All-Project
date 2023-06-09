async function myFunc(event) {
    try {
        event.preventDefault();


        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;

        event.target.reset();

        const myObj = {
            name,
            email,
            phone,
            date

        }
        if (name && phone && email && date) {
            onScreenFunction(myObj);
            const postdata = await axios.post("http://localhost:3000/postdata", myObj)
            try {
                onScreenFunction(myObj);
                console.log("Data Create Successfull");
            }
            catch (err) {
                console.log(err.message);
            }
        } else {
            alert('Enter All the things please');
        }
    }
    catch (err) {
        console.log(err);
    }
}



function onScreenFunction(myObj) {
    const ul = document.getElementById('users');


    const li = document.createElement('li');
    li.innerHTML = `${myObj.name} - ${myObj.phone} - ${myObj.email}`;

    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.style.backgroundColor = 'red'

    delBtn.onclick = async () => {
        try {
            const deletedData = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
            try {
                ul.removeChild(li);
            }
            catch (err) {
                console.log(err.message);
            }

        }
        catch (err) {
            console.log(err.message)
        }
    }

    const editBtn = document.createElement('input');
    editBtn.value = 'Edit';
    editBtn.type = 'button';
    editBtn.style.backgroundColor = 'yellow'
    editBtn.onclick = async () => {
        try {
            document.getElementById('name').value = myObj.name;
            document.getElementById('phon').value = myObj.phone;
            document.getElementById('email').value = myObj.email;

            const deletedData = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
            try {
                ul.removeChild(li);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);

}


document.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:3000/getdata")
        .then((response) => {
            console.log(response);
            response.data.forEach((element) => {
                console.log(element);
                onScreenFunction(element)
            })
        })
        .catch((err) => {
            console.error(err.message)
        })
})

