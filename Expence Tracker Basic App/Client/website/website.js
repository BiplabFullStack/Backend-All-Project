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
            const postdata = await axios.post("http://localhost:3000/postwebdata", myObj, { headers: { "Authorization": token } })

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
    delBtn.style.color = 'white'
    delBtn.style.borderRadius = '5px'

    //when Mouse over the Delete Button
    delBtn.addEventListener('mouseover', (e) => {
        delBtn.style.backgroundColor = 'green';
    })

    //when Mouse remove from Delete Button
    delBtn.addEventListener('mouseout', (e) => {
        delBtn.style.backgroundColor = 'red';
    })

    delBtn.onclick = async () => {
        if (confirm("Are you sure, want to cancel this expence ?")) {
            const token = localStorage.getItem('token')
            const deletedItem = await axios.delete(`http://localhost:3000/deletedata/${myObj.id}`, { headers: { "Authorization": token } })
            ul.removeChild(li);

        }
        else {
            console.log("Nothing");
        }
    }


    li.appendChild(delBtn);
    li.style.color = 'Maroon'
    ul.appendChild(li);

}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:3000/premiumuser", { headers: { "Authorization": token } })
        .then((result) => {
            if (result.data.ispremium == true) {
                const form = document.getElementById("rzp-button1")
                form.style.display = 'none'
                document.getElementById('ispremium').innerHTML = `${result.data.name} ~ You are a premium member    `
                premiumfeature(result)
            }
        })
        .catch((err) => {
            console.log(err.meessage);
        })
})

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token')

    axios.get("http://localhost:3000/getdata", { headers: { "Authorization": token } })
        .then((response) => {
            response.data.forEach((element) => {
                onScreenFunction(element)
            })
        })
        .catch((err) => {
            console.log(err.message)
        })


})




document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token');
    console.log(token)
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { 'Authorization': token } })
    console.log(response);
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            const result = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { 'Authorization': token } })

            alert('you are now a premium user')
            const form = document.getElementById("rzp-button1")
            form.style.display = 'none'
            document.getElementById('ispremium').innerHTML = `<h5>You are a premium user</h5>  `
            localStorage.setItem('token', result.data.token)
            //premiumfeature (result)

        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', function (response) {
        console.log(response);
        alert('something wrong')
    });
};

async function premiumfeature(result) {
    const ispremium = document.getElementById('ispremium')
    const leaderboardbutton = document.createElement('input')
    leaderboardbutton.type = 'button'
    leaderboardbutton.value = 'leaderboard'

    leaderboardbutton.style.backgroundColor = 'red'
    leaderboardbutton.style.color = 'white'
    leaderboardbutton.style.borderRadius = '5px'

    //when Mouse over the Delete Button
    leaderboardbutton.addEventListener('mouseover', (e) => {
        leaderboardbutton.style.backgroundColor = 'cyan';
        leaderboardbutton.style.color = 'red'
    })

    //when Mouse remove from Delete Button
    leaderboardbutton.addEventListener('mouseout', (e) => {
        leaderboardbutton.style.backgroundColor = 'red';
        leaderboardbutton.style.color = 'white'
    })



    leaderboardbutton.onclick = async () => {
        const token = localStorage.getItem('token');
        const userleaderboardArray = await axios.get('http://localhost:3000/premium/leaderboard', { headers: { 'Authorization': token } })

        const leaderboardElement = document.getElementById('leaderboard')
        leaderboardElement.innerHTML = '<h2 style="color:red">Leader Board</h2>'
        userleaderboardArray.data.forEach((ele) => {
            leaderboardElement.innerHTML += `<li style="color:yellow">Name : ${ele.name} - TotalExpence : ${ele.totalexpence}</li>`
        })

    }
    // ispremium.appendChild(leaderboardbutton)


    const downloadExpence = document.createElement('input');
    downloadExpence.type = 'button'
    downloadExpence.value = 'Download List'
    downloadExpence.onclick = async () => {
        try {
            const token = localStorage.getItem('token');
            const file = await axios.get('http://localhost:3000/premium/download', { headers: { 'Authorization': token } })
            if (file.status === 200) {
                const a = document.createElement('a');
                a.href = file.data.fileUrl;
                a.download = 'myexpence.csv';
                a.click()
            } else {
                throw new Error(file.data.message)
            }
        }
        catch (err) {
            console.log(err.message);
        }

    }
    ispremium.appendChild(leaderboardbutton)
    ispremium.appendChild(downloadExpence)
}


