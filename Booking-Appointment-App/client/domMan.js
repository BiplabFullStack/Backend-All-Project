async function myFunc(event) {
    try {
        event.preventDefault();


        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;

        event.target.reset();

        let myObj = {
            name,
            email,
            phone,
            date

        }
        if (name && phone && email) {
            onScreenFunction(myObj);
            const postdata = await axios.post("http://localhost:3000/postdata", myObj)
            

            //onScreenFunction(myObj);
            console.log("Data Create Success full");

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
            await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
            ul.removeChild(li);

        }
        catch (err) {
            console.log(err)
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

            await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)

            ul.removeChild(li);
        }
        catch (err) {
            console.log(err)
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
            console.error(err)
        })
})

