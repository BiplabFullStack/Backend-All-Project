async function myFunc(event) {
    try {
        event.preventDefault();

        const expence = document.getElementById('expence').value;
        const describtion = document.getElementById('describtion').value;
        const category = document.getElementById('category').value;
        event.target.reset();

        const myObj = {

            expence,
            describtion,
            category

        }
        if (expence && describtion && category) {

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
    li.innerHTML = `${myObj.expence} - ${myObj.describtion} -${myObj.category}`;

    // Create Delete Button
    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.style.backgroundColor = 'red'



    delBtn.onclick = async () => {
        const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
        try {
            //ul.removeChild(li);
            if (myObj.category == 'Table 1') {
                ul1.removeChild(li);
            } else if (myObj.category == 'Table 2') {
                ul2.removeChild(li);
            } else {
                ul3.removeChild(li);
            }

        }
        catch (err) {
            console.log(err.message);
        }
    }

    // Create Edit Button
    const editBtn = document.createElement('input');
    editBtn.value = 'Edit';
    editBtn.type = 'button';
    editBtn.style.backgroundColor = 'yellow'
    editBtn.onclick = async () => {

        document.getElementById('expence').value = myObj.expence;
        document.getElementById('describtion').value = myObj.describtion;
        document.getElementById('category').value = myObj.category;
        const deletedItem = await axios.put(`http://localhost:3000/editdata/${myObj.id}`,
        {
            expence: expence,
            describtion: describtion,
            category: category
        })
        
            .then((result) => {
               console.log("update Successfully Done");
            })
            .catch(err => console.log(err.message))
        // const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
        // try {
        //     //ul.removeChild(li);
        //     if (myObj.category == 'Table 1') {
        //         ul1.removeChild(li);
        //     } else if (myObj.category == 'Table 2`') {
        //         ul2.removeChild(li);
        //     } else {
        //         ul3.removeChild(li);
        //     }
        // }
        // catch (err) {
        //     console.log(err.message);
        // }


    }
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    //ul.appendChild(li);
    if (myObj.category == 'Table 1') {
        li.style.color = 'Olive'
        ul1.appendChild(li);
    } else if (myObj.category == 'Table 2') {
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




// function totalexp(total){
//     let totalexp=document.getElementById('total');
//     // totalexp.textContent="total expendeture:"+total;
//     var totalexpenditure=0;

//     for(let i=0;i<total.data.length;i++){
//         totalexpenditure+=total.data[i].exp;
//     }

//     totalexp.textContent="total expendeture:"+totalexpenditure;


// }