async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const description = document.getElementById("post-description").value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(JSON.stringify(response));

    if (response.ok) {
      //When the USER creates a post, THEN they are presented with a form to add pictures and descriptions
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }

  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
