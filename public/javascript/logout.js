// Create function to logout
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
    // check response status
    if (response.ok) {
      console.log('logged out');
      document.location.redirect('/login');
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);
