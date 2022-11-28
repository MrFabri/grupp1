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