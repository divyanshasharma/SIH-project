console.log('Registering Started')

const regForm=document.querySelector('#register')
const loginForm=document.querySelector('#login')


regForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const data={
        name:document.querySelector('#register #uid').value,
        email:document.querySelector('#register #eid').value,
        password:document.querySelector('#register #pswd').value
    }
    const dataJSON=JSON.stringify(data)
    const myURL="https://ancient-ocean-36358.herokuapp.com/users/register"
    console.log(dataJSON)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: dataJSON,
      redirect: 'follow'
    };
    
    fetch(myURL, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
})





loginForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const data={
        email:document.querySelector('#login #uidL').value,
        password:document.querySelector('#login #pswdL').value
    }
    const dataJSON=JSON.stringify(data)
    const myURL="https://alumniiwebsite.herokuapp.com/users/login"
    console.log(dataJSON)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: dataJSON,
      redirect: 'follow'
    };
    
    fetch(myURL, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
})