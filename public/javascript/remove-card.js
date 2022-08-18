
async function removeCardBtnHandler(event){
    event.preventDefault();
  
    // console.log(event.target);
    const targetCard = event.target;
    // console.log(targetCard.getAttribute('data-id'));
    const targetCardID =targetCard.getAttribute('data-id');
  
    // console.log('remove card button clicked');
    console.log(targetCardID);

    const response = await fetch(`/api/inventory/${targetCardID}`, {
        method: 'DELETE'
      });

    if (response.ok) {
    document.location.reload();
    } else {
    alert(response.statusText);
    }
}



document.querySelector('.user-collection').addEventListener('click', removeCardBtnHandler);