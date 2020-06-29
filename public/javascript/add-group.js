async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="group-name"]').value;
    const uuid = document.querySelector('input[name="group-uuid"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        uuid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      //When the USER creates a group, THEN they are presented with a form to create a post
      document.location.replace('/add-post');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-group-form').addEventListener('submit', newFormHandler);
