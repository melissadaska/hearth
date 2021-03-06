async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="join-group-name"]').value;
    const uuid = document.querySelector('input[name="join-group-uuid"]').value;
  console.log('hit join group')
    const response = await fetch(`/api/groups/validate`, {
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
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.join-group-form').addEventListener('submit', newFormHandler);
