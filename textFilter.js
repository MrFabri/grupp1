// selects the elements in dom as variables
const searchInput = document.querySelector('.input-search-keyword');
const roomsUl = document.querySelector('.rooms');
// Decides if the input is empty or not
function startOfSearch(){
    const preSearchString = searchInput.value;
    // if preSearchString/input is empty display all rooms
    if(preSearchString == ''){
        renderAll;
    }
    //if string is not empty render rooms matching the string
    else{
        renderWFilter(preSearchString);
    }
}
// renders all rooms if the input (searchString) is empty
async function renderAll(){
    const data = await APIGet();
    roomsUl.innerText = '';
    data.challenges.forEach(challenge => {
        const roomsUl = document.querySelector(".rooms");
        const item = document.createElement("li");
        const content = document.createElement("p");

        content.innerText = "\nTitle: " + challenge.title + "\nDescription: " + challenge.description;
        
        item.appendChild(content);
        roomsUl.appendChild(item);
    });
}
// renders all the rooms that matches their title and or description with searchString.
async function renderWFilter(preSearchString){
    const data = await APIGet();
    roomsUl.innerText = ''; 
    // makes the searchstring to lowercase to make the search not caseSensitive
    const searchString = preSearchString.toLowerCase();

    data.challenges.forEach(challenge => {
        /* 
        makes the title and description to lowercase to make the search not caseSensitive
        without the actual title and description changing
        LC == LowerCase
        */
        const LCTitle = challenge.title.toLowerCase();
        const LCDescription = challenge.description.toLowerCase();
        
        if(LCTitle.includes(searchString) || LCDescription.includes(searchString)){
            const roomsUl = document.querySelector(".rooms");
            const item = document.createElement("li");
            const content = document.createElement("p");
            content.innerText = "\nTitle: " + challenge.title + "\nDescription: " + challenge.description;
            item.appendChild(content);
            roomsUl.appendChild(item);
        }        
    });
    // if no room match show a message that no rooms match the search
    if(roomsUl.innerHTML == ''){
        roomsUl.innerHTML = 'no matching rooms';
    }
}
// fetches the data from the api 
async function APIGet(){
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    return data;
}
// render all rooms when the page is loaded 
renderAll();
searchInput.addEventListener("keyup", startOfSearch);