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


























/*




var mode=null;

function myfunc(event){
    //event.preventDefault();
    let detail={
        name:document.getElementById('name').value,
        exp:document.getElementById('expence').value,
        item:document.getElementById('item').value,
        category:document.getElementById('category').value
    }
    // if(mode===null){
        axios.post('http://localhost:3000/datapost',detail).then(result=>{
        console.log(result);
        }).catch(error=>{
        console.log(error);
        })
    // }else{
    //     let element = axios.put(`http://localhost:3000/editdata/${mode}`,detail)
    //     axios.delete(element);
    // }
    // axios.post('http://localhost:3000/datapost',detail).then(result=>{
    //     console.log(result);
    // }).catch(error=>{
    //     console.log(error);
    // })

    document.getElementById('name').value=null;
    document.getElementById('expence').value=null;
    document.getElementById('item').value=null;
    document.getElementById('category').value=null;
}

window.addEventListener('DOMContentLoaded',()=>{
    let detail = axios.get('http://localhost:3000/getexpence').then((result)=>{
        console.log(result);
        // var total=0;
        totalexp(result)
        for(let i=0;i<result.data.length;i++){
            showDeleteEdit(result.data[i]);
            //total+=result.data[i].exp;
        }
        
    }).catch(err=>{
        console.log(err);
    })
    //totalexp(detail);
})

async function showDeleteEdit(detail){

    let expenceList=document.getElementById('expencelist');

    let expence=document.createElement('li');
    expence.textContent=`name: ${detail.name} expence: ${detail.exp} item: ${detail.item} under ${detail.category}`;

    let deleteKey=document.createElement('input');
    deleteKey.type='button';
    deleteKey.value='delete';
    deleteKey.onclick=()=>{
        let element = axios.delete(`http://localhost:3000/deletadata/${detail.id}`);
        axios.delete(element)
        expenceList.removeChild(expence);
    }

    //edit key
    // let editKey=document.createElement('input');
    // editKey.type='button';
    // editKey.value='edit';
    // editKey.onclick=()=>{
    //     document.getElementById('name').value=detail.name;
    //     document.getElementById('expence').value=detail.exp;

    //     mode=detail.data.id;
    //     expenceList.removeChild(expence);
    // }


    expence.appendChild(deleteKey);
    //expence.appendChild(editKey);
    expenceList.appendChild(expence);


}

function totalexp(total){
    let totalexp=document.getElementById('total');
    // totalexp.textContent="total expendeture:"+total;
    var totalexpenditure=0;

    for(let i=0;i<total.data.length;i++){
        totalexpenditure+=total.data[i].exp;
    }

    totalexp.textContent="total expendeture:"+totalexpenditure;


}

*/