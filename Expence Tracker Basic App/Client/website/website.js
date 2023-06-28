async function myWebFunc(event) {
    try {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const expence = document.getElementById('expence').value;
        const item = document.getElementById('item').value;
        const category = document.getElementById('category').value;
        event.target.reset();

        const myObj = {
            itemName,
            expence,
            item,
            category

        }
        if (itemName && expence && item && category) {
            const token = localStorage.getItem('token')
            const postdata = await axios.post("http://localhost:3000/postwebdata", myObj, {headers:{"Authorization": token}})
            
                onScreenFunction(myObj);
                console.log(`ItemName : ${itemName} -  Expence : ${expence} - Item : ${item} - Category : ${category}`);

        } else {
            alert('Enter All the things please');
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

function onScreenFunction(myObj) {
    const ul = document.getElementById('listOnScreen');


    const li = document.createElement('li');
    li.innerHTML = `ItemName : ${myObj.itemName}  -  Expence : ${myObj.expence} - Item : ${myObj.item} -  Category : ${myObj.category}   `;

    // Create Delete Button
    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.style.backgroundColor = 'red'
    delBtn.style.color ='white'
    delBtn.style.borderRadius ='5px'
    
    //when Mouse over the Delete Button
    delBtn.addEventListener('mouseover',(e)=>{
        delBtn.style.backgroundColor ='green';
    })

    //when Mouse remove from Delete Button
    delBtn.addEventListener('mouseout',(e)=>{
        delBtn.style.backgroundColor ='red';
    })

    delBtn.onclick = async () => {
        if(confirm("Are you sure, want to cancel this expence ?")){
            const token = localStorage.getItem('token')
        const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`,{headers:{"Authorization": token}})
            ul.removeChild(li);
        }
        else{
            console.log("Nothing");
        }
    }


    li.appendChild(delBtn);
    li.style.color = 'Maroon'
    ul.appendChild(li);

}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:3000/getdata",{headers:{"Authorization": token}})
        .then((response) => {
            response.data.forEach((element) => {
                onScreenFunction(element)
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
})















