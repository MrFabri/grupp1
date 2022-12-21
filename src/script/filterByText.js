export class FilterByText {
// selects the elements in DOM
    
    //roomsUl = document.querySelector('.rooms');
    

    filter(challenge) {
                
        //if string is not empty render rooms matching the string
        const searchInput = document.querySelector('.input-search-keyword');
        const preSearchString = searchInput.value;
        const searchString = searchInput.value.toLowerCase();

        const LCTitle = challenge.title.toLowerCase();
        const LCDescription = challenge.description.toLowerCase();

        if ((preSearchString != "") && (LCTitle.includes(searchString) || LCDescription.includes(searchString))){
            
            return true;
        
        } else {

            return false;
        }
        
    }

    checkDOM(){
        const searchInput = document.querySelector('.input-search-keyword');
        const preSearchString = searchInput.value;

        // if inout is empty return false
        if(preSearchString == ""){

            return false;
        }
        else {

            return true;
        }
    }

}
/* // renders all rooms if the input (searchString) is empty
async function toRenderAll(){
    const data = await getChallenges();
    roomsUl.innerText = '';

    data.challenges.forEach(challenge => {
        render(challenge.id, challenge.title, challenge.description);
    });
}

// renders all the rooms that matches their title and or description with searchString.
function render(id, title, description){
    const item = document.createElement("li");
    const content = document.createElement("p");
    content.innerText = id + "\nTitle: " + title + "\nDescription: " + description;
    item.appendChild(content);
    roomsUl.appendChild(item);
}
async function filter(preSearchString){
    const data = await getChallenges();
    // makes the preSearchString to lowercase so the search ignores if you use upper or lower case
    const searchString = preSearchString.toLowerCase();
    roomsUl.innerText = ''; 
    data.challenges.forEach(challenge => {
        // makes the title and description to lowercase to make the search not caseSensitive LCTitle/LCDescription == LowerCaseTitle/Description 
        const LCTitle = challenge.title.toLowerCase();
        const LCDescription = challenge.description.toLowerCase();
        
        if(LCTitle.includes(searchString) || LCDescription.includes(searchString)){
            render(challenge.id, challenge.title, challenge.description);
        }        
    });
     // if no room match show a message that no rooms match the search
    if(roomsUl.innerHTML == ''){
        roomsUl.innerHTML = 'no matching rooms';
    }
}
/*
// fetches the data from the api 
async function getChallenges(){
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    return data;
}
toRenderAll();
 */