

// async function searchBtnHandler(event){
//     event.preventDefault();
  
//     const searchName = document.querySelector('input[name="card-name"]').value;
  
//     console.log('search button clicked');
//     console.log(searchName);

//     const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchName}`);
  
//     if(response.ok){
//         response.json().then(searchData => {
//           if(searchData.data.length === 1){
//             addCardToInv(searchData);
//           }
//           else if (searchData.data.length > 1){
//             console.log(searchData.data.length);
//             // console.log(searchData);
//             displaySearchResults(searchData, searchName);
//           }
//           else{
//             alert('No cards with that name found');
//           }
//         });
//     }
//     else{
//       console.log('response not ok');
//       // alert(response.statusText);
//       alert(`No cards found for "${searchName}"`)
//     }
//   }
  
// async function addCardBtnHandler(event){
//   event.preventDefault();

//   console.log(event.target);

//   // let searchName = document.querySelector('input[name="card-name"]').value;
//   let searchName = event.target.getAttribute('data-name');
//   console.log(searchName)

//   const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchName}`);

//   if(response.ok){
//     response.json().then(searchData => {
//       // console.log(searchData);
//       addCardToInv(searchData);
//     })
//   }
//   else{
//     alert(response.statusText);
//   }
  
// }
  


// function addCardToInv(searchData){

//   // console.log(searchData);

//   let card_name = searchData.data[0].name;
//   let scryfall_id = searchData.data[0].id;
//   //img data need to check if the card is double-faced before adding
//   let img_uri;
//   if(searchData.data[0].card_faces){
//     img_uri = searchData.data[0].card_faces[0].image_uris.normal;
//   }
//   else{
//     img_uri = searchData.data[0].image_uris.normal;
//   }
  
//   const addCard = fetch('/api/inventory', {
//     method: 'POST',
//     body: JSON.stringify({
//       card_name,
//       img_uri,
//       scryfall_id
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then( cardInfo => {
//     console.log(cardInfo);
//     if (cardInfo.ok) {
//       // console.log('cardInfo ok');
//       // document.location.replace('/collection');
//       document.location.reload();
//     } 
//     else {
//       // console.log('cardInfo not ok');
//       alert(cardInfo.statusText);
//     }   
//   })
// }


// function displaySearchResults(searchData){
//   //needs to display the array of results with separate html elements for each object in the array
//   //should add an event listener to the main container for the search results
//   //event listener should call another function to pick of the data elements and pass them to the addCardToInv() function
//   console.log(searchData);

//   const cardSearchContainerEl = document.getElementById('card-search-container');

//   // //clear current search container
//   // if (cardSearchContainerEl.hasChildNodes()){
//   //   while(cardSearchContainerEl.hasChildNodes){
//   //     let searchChildEl = cardSearchContainerEl.firstChild;
//   //     cardSearchContainerEl.removeChild(searchChildEl);
//   //   }
//   // }

//   let searchTitleEl = document.createElement('h2');
//   searchTitleEl.textContent = `Search Results`;
//   cardSearchContainerEl.appendChild(searchTitleEl);


//   let cardWrapperEl = document.createElement('div');
//   cardWrapperEl.setAttribute("class", "card-wrapper");
//   cardSearchContainerEl.appendChild(cardWrapperEl);


//   for(let i = 0; i < searchData.data.length; i++){
//     //<div class="card-container">
//     let singleCardContainerEl = document.createElement('div');
//     singleCardContainerEl.setAttribute("class", "card-container");
//     cardWrapperEl.appendChild(singleCardContainerEl);

//     //check for double face card
//     let img_uri;
//    if(searchData.data[i].card_faces){
//       img_uri = searchData.data[i].card_faces[0].image_uris.normal;
//     }
//     else{
//       img_uri = searchData.data[i].image_uris.normal;
//   }
//     //<img src="{{img_uri}}" alt="image of {{card_name}}">
//     let cardImg = document.createElement('img');
//     cardImg.setAttribute("src", img_uri);
//     cardImg.setAttribute("alt", `image of ${searchData.data[i].name}`);
//     cardImg.setAttribute("data-name", searchData.data[i].name);
//     singleCardContainerEl.appendChild(cardImg);

//     //<p>{{card_name}}</p>
//     let cardNameEl = document.createElement('p');
//     cardNameEl.textContent = searchData.data[i].name;
//     cardNameEl.setAttribute("data-name", searchData.data[i].name);
//     singleCardContainerEl.appendChild(cardNameEl);

//     //<button type="button" class="add-card-btn" data-name="{{card_name}}">Remove card</button>
//     let addCardBtn = document.createElement('button');
//     addCardBtn.setAttribute("type", "button");
//     addCardBtn.setAttribute("class", "add-card-btn");
//     addCardBtn.setAttribute("data-name", searchData.data[i].name);
//     addCardBtn.textContent = 'Add Card';
//     singleCardContainerEl.appendChild(addCardBtn);

//   }


//   document.querySelector('.card-search-container').addEventListener('click', addCardBtnHandler);

// }


// document.querySelector('.card-search-form').addEventListener('submit', searchBtnHandler);