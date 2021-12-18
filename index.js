
/*
fetch('https://scontent-lga3-2.cdninstagram.com/v/t51.2885-15/e35/82195525_578658932986048_9044155023198189460_n.jpg?_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=104&_nc_ohc=PSNY53W7Bg0AX_Dk0Jl&tp=18&oh=3cc1a064aaa98f8ba97e332a32df4d23&oe=5FCD60F0&ig_cache_key=MjIzNDUzNDI4NjUwNTQ0ODg2Ng%3D%3D.2').then(response => {
    console.log(response);
    return response.blob();
}).then(blob =>{
    console.log(blob);
    document.querySelector('#myImage').src = URL.createObjectURL(blob);
}).catch(error =>{
    console.log(error);
})

*/

const content = document.querySelector('#content');
const submit = document.querySelector('#submit')
const update = document.querySelector('#updateBtn');
window.addEventListener('load', () => {

getUsers();

});

    submit.addEventListener('click', ()=> {
        //callback
        let fname = document.querySelector('#fname').value;
        let lname = document.querySelector('#lname').value;
        let email = document.querySelector('#email').value;
        let gender = document.querySelector('#gender').value;
        let formData = {fname, lname, email, gender};

        fetch('http://localhost:5000/api/members', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers:{
                    'Content-Type' : 'application/json'
            }
        });
    })

function getUsers(){
    let html ="";
    fetch('http://localhost:5000/api/members')
    .then(response => {
        console.log(response);

        return response.json();
    }).then(data => {
        console.log(data);
        //array na may object
        data.forEach(element => {
 //console.log(element); 
 //console.log(element.first_name); 
            html +=`<li>${element.first_name} ${element.last_name} <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a> <a href="javascript:void(0)" onClick="editMember(${element.id})">Edit</a></li>`;

        });

        content.innerHTML = html;


    }).catch(error =>{
        console.log(console.error);
    });
}


function deleteMember(id){
    // alert(id);
    let formData = {id};
    fetch('http://localhost:5000/api/members/', {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(response =>response.text())
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }


function editMember(id){
    fetch(`http://localhost:5000/api/members/${id}`)
    .then(res => res.json())
    .then( (data)=>{


        document.querySelector('#fname').value = data[0].first_name,
        document.querySelector('#lname').value = data[0].last_name,
        document.querySelector('#email').value = data[0].email,
       document.querySelector('#gender').value = data[0].gender,
       document.querySelector('#ID').value = data[0].id


    });

}



update.addEventListener('click', ()=> {

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;
    let id = document.querySelector('#ID').value;

    let formData = { fname, lname, email, gender, id };

    fetch('http://localhost:5000/api/members', {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

});

