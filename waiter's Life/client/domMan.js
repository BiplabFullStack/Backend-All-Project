async function myFunc(event) {
    try {
        event.preventDefault();

        const price = document.getElementById('price').value;
        const disk = document.getElementById('disk').value;
        const table = document.getElementById('table').value;
        event.target.reset();

        const myObj = {
            price,
            disk,
            table

        }
        if (price && disk && table) {

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
    const ul1 = document.getElementById('listOnScreen1');
    const ul2 = document.getElementById('listOnScreen2');
    const ul3 = document.getElementById('listOnScreen3');


    const li = document.createElement('li');
    li.innerHTML = `${"Price :"+myObj.price+" rupees"} --   ${"Disk : "+ myObj.disk} --   ${"Table :"+ myObj.table}   `;

    // Create Delete Button
    const delBtn = document.createElement('input');
    delBtn.value = 'Delete Order';
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

    //When Click the Delete Button
    delBtn.onclick = async () => {
        //alert("Are you sure want to delete permanently ?")
        if(confirm("Are you sure want to delete permanently ?")){
              
        const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
        try {
            if (myObj.table == 'Table 1') {
                ul1.removeChild(li);
            } else if (myObj.table == 'Table 2') {
                ul2.removeChild(li);
            } else {
                ul3.removeChild(li);
            }

        }
        catch (err) {
            console.log(err.message);
        }
    }
    else{
        console.log("Delete Cancel");
    }
    }

    
    li.appendChild(delBtn);
    //ul.appendChild(li);
    if (myObj.table == 'Table 1') {
        li.style.color = 'Olive'
        ul1.appendChild(li);
    } else if (myObj.table == 'Table 2') {
        li.style.color = 'Maroon'
        ul2.appendChild(li);
    } else {
        li.style.color = 'blue'
        ul3.appendChild(li);
    }

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

