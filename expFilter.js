// selects the elements in DOM
const searchInput = document.querySelector('.input-search-keyword');
const roomsUl = document.querySelector('.rooms');

function search(){
    const preSearchString = searchInput.value;
    //if string empty display all rooms
    if(preSearchString.lenght <= 0){
        renderAll;
    }
    //if string is not empty render rooms matching the string
    else{
        filter(preSearchString);
    }
}

// renders all rooms if the input (searchString) is empty
async function renderAll(){
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

// fetches the data from the api 
async function getChallenges(){
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    return data;
}
renderAll();
searchInput.addEventListener("keyup", search);


/*
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
searchInput.addEventListener("keyup", startOfSearch);





*/
//____________________________________________________

/*
my early code that is caseSensitive in the filter

const searchInput = document.querySelector('.input-search-keyword');
const roomsUl = document.querySelector('.rooms');





    function search(){
       

        const searchString = searchInput.value;
       
        //if string empty display all rooms
        if(searchString == ''){
            renderAll();
        
        }
        //if string is not empty render rooms matching the string
        else{
            render(searchInput.value);
        
        }
        

    }   
    async function renderAll(){
        const data = await APIGet();
        roomsUl.innerHTML = '';
        data.challenges.forEach(challenge => {
            const roomsUl = document.querySelector(".rooms");
            const item = document.createElement("li");
            const content = document.createElement("p");

            content.innerText = "\nTitle: " + challenge.title + "\nDescription: " + challenge.description;

            item.appendChild(content);
            roomsUl.appendChild(item);

        });
    
        
    }   

    function caseSensitive(){
        
    }


    // if no match show alert

    async function render(searchString){
        const data = await APIGet();
        roomsUl.innerHTML = '';
        data.challenges.forEach(challenge => {

            if(challenge.description.includes(searchString) || challenge.title.includes(searchString)){
                
                const roomsUl = document.querySelector(".rooms");
                const item = document.createElement("li");
                const content = document.createElement("p");
                content.innerText = "\nTitle: " + challenge.title + "\nDescription: " + challenge.description;
                item.appendChild(content);
                roomsUl.appendChild(item);
                
            }        
        });
    
        if(roomsUl.innerHTML == ''){
            
            roomsUl.innerHTML = 'no matching rooms';
        }
  
    }

    async function APIGet(){
        
        const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
        const data = await res.json();
        return data;
        
    }

searchInput.addEventListener("keyup", search);

//searchInput.addEventListener('keyup', APIGet());






/* ---Arash kod---


const myRenderer = new Renderer();
    myRenderer.renderRooms(myData);

    class MyAPI {

        async getData () {
            const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
            const data = await res.json();
    
            return data;
        }
    }
    
    // An Rendering class to render objects for testing filter
    class Renderer {
    
        renderRooms(data) {
            data.challenges.forEach(challenge => {
                const roomsUl = document.querySelector(".rooms");
                const item = document.createElement("li");
                const content = document.createElement("p");
                
                content.innerText = "ID: " + challenge.id + "\nTitle: " + challenge.title + "\nType: " + challenge.type + "\nDescription: " + challenge.description + "\nMin Participants: " + challenge.minParticipants + "\nMax Participants: " + challenge.maxParticipants + "\nRating: " + challenge.rating + "\nLabels: " + challenge.labels;
                
                item.appendChild(content);
                item.classList.add("challenge-item");
                roomsUl.appendChild(item);
            });
        }
    
        // Renders tag buttons
        renderTags(data) {
            //const filterer = new Filterer(data);
            const tags = [];
    
            data.challenges.forEach(challenge => {
                challenge.labels.forEach(label => tags.push(label))
            });
    
            // Removes duplicate tags
            const tagsBtn = [];
            for (let i = 0; i < tags.length; i++) {
    
                if (tagsBtn.indexOf(tags[i]) === -1) {
                    tagsBtn.push(tags[i]);
                };
    
            };
        
            // Renderds tags, adds eventlistner (that runs filterer.filterByTag() when pressed)
            tagsBtn.forEach(tag => {
                const tagsDiv = document.querySelector(".by-tag-buttons");
                const item = document.createElement("button");
        
                item.classList.add("tag-button");
                item.innerText = tag;
                item.addEventListener('click', () => {
    
                    if (item.getAttribute("class") === "tag-button selected") {
                        item.classList.remove("selected");
                    } else {
                        item.classList.add("selected");
                    };
                    
                    filterer.renderAllFilters();
                });
    
                tagsDiv.appendChild(item);
                
            });
        } 
    }
    


    class Init {
        async init () {
            const api = new MyAPI();
            const data = await api.getData();
            const renderer = new Renderer();
    
            renderer.renderRooms(data);
            renderer.renderTags(data);
        
        };
    }
    
    const start = new Init();
    start.init();

*/