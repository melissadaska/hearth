async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="upLoadFile"]').value;
    const upload = document.querySelector('input[value="Upload!"]').value;
  
    const response = await fetch(`/api/pictures`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        upload
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('uploadForm').addEventListener('submit', newFormHandler);
