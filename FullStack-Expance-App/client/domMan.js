async function myFunc(event) {
    try {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const expence = document.getElementById('expence').value;
        const item = document.getElementById('item').value;
        const category = document.getElementById('category').value;
        event.target.reset();

        const myObj = {
            name,
            expence,
            item,
            category

        }
        if (name && expence && item && category) {

            const postdata = await axios.post("http://localhost:3000/postdata", myObj)
            try {
                onScreenFunction(myObj);

                console.log("Data Create Success full");
            }
            catch (err) {
                console.log(err);
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
    li.innerHTML = `${myObj.name} - ${myObj.expence} - ${myObj.item} -${myObj.category}`;

    // Create Delete Button
    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.style.backgroundColor = 'red'

    delBtn.onclick = async () => {
        const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
            try{
                ul.removeChild(li);
            }
            catch(err){
                console.log(err.message);
            } 
    }

    // Create Edit Button
    const editBtn = document.createElement('input');
    editBtn.value = 'Edit';
    editBtn.type = 'button';
    editBtn.style.backgroundColor = 'yellow'
    editBtn.onclick = async () => {
        try {
            document.getElementById('name').value = myObj.name;
            document.getElementById('expence').value = myObj.expence;
            document.getElementById('item').value = myObj.item;
            document.getElementById('category').value = myObj.category;

            const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
            try{
                ul.removeChild(li);
            }
            catch(err){
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
            console.error(err)
        })
})

