
const url = '/api/pictures/upload';
//const url = 'https://infinite-ocean-27765.herokuapp.com/api/pictures/upload';
async function fileFormHandler(event) {
    console.log('button clicked, eventhandler launched');
   
    event.preventDefault();
    
    let fd =new FormData();
    fd.append('post_id', document.querySelector('input[name="post_id"]').value);
    fd.append('user_id', document.querySelector('input[name="user_id"]').value);
    fd.append('annotation', document.querySelector('input[name="annotation"]').value);
    let myFile = document.querySelector('input[name="upLoadFile"]').files[0];
    fd.append('upLoadFile', myFile);
    console.log(h , fd);
    const response = await fetch(url, {
      method: 'POST',
      body: fd
      
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#uploadBtn').addEventListener('click', fileFormHandler);

