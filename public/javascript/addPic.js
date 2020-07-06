async function retEvent{
    console.log('fired');
    location.reload();
} 






document.querySelector('hiddenFrame').addEventListener('change', retEvent);