async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="group-name"]').value;
    const code = document.querySelector('input[name="group-code"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        // name,
        // code
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
  
  document.querySelector('.new-group-form').addEventListener('submit', newFormHandler);
