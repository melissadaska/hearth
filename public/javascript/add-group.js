async function newFormHandler(event) {
    event.preventDefault();
    console.log ('add group');
    const name = document.querySelector('input[name="group-name"]').value;
    const uuid = document.querySelector('input[name="group-uuid"]').value;

  
    const response = await fetch(`/api/groups/test2`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        uuid
        //,
        //user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      //When the USER creates a group, THEN they are presented with a form to create a post
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }

  
  
  document.querySelector('.new-group-form').addEventListener('submit', newFormHandler);
