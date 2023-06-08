function onsignup(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const phone = document.getElementById('phon')
    const email = document.getElementById('email')
    event.target.reset();

    let myObj = {
        name,
        phone,
        email
    }
    if (name && phone && email) {
         axios.post('http://localhost:3000/createUser', myObj)
            .then((resolve) => {
                onScreenFunction(myObj);
                console.log(resolve);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        alert('Enter All the things please');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/getUser')
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

function onScreenFunction(myObj) {
    const ul = document.getElementById('listOnScreen');


    const li = document.createElement('li');
    li.innerHTML = `${myObj.name} - ${myObj.phone} - ${myObj.email}`;

    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.style.backgroundColor ='red'
   
     delBtn.onclick = async() => {
      try{
      await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
      ul.removeChild(li);

      }
      catch(err){
        console.log(err)
      }
    } 
    
    const editBtn = document.createElement('input');
    editBtn.value = 'Edit';
    editBtn.type = 'button';
    editBtn.style.backgroundColor ='yellow'
    editBtn.onclick = async() => {
      try{
        document.getElementById('name').value = myObj.name;
     document.getElementById('phon').value= myObj.phone;
     document.getElementById('email').value= myObj.email;

      await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`)
  
      ul.removeChild(li);
      }
      catch(err){
        console.log(err)
      }

     
  } 
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
    
} 
