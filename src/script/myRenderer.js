import { Filter } from "./filter.js";

<<<<<<< HEAD
export class Renderer {
    
    constructor (data) {
        this.data = data;

/*         console.log(data + "render construcit");
        const filter = new Filter(data); */
    }

    renderRooms(data) {
        const bajs = new Filter(data);
        const searchInput = document.querySelector('.input-search-keyword');
        searchInput.addEventListener("keyup", bajs.filter);

            document.querySelector(".rooms").innerHTML = "";

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
        console.log(data + "renderTags");
        const bajs = new Filter(data);
        
        const tags = [];
        // fix lates

=======
export function myRenderer (data) {
    // Renders tag buttons
    const filterer = new Filter(data);
    const tags = [];
>>>>>>> b97db8a5512c86abd2f61b1cacf4be0fbe9ab164

    const filterBtn = document.querySelector(".filter-btn");
    const filterBox = document.querySelector(".filter");
    const filterCloseBtn = document.querySelector(".close-filter");

    filterBtn.addEventListener("click", () => {
        filterBtn.style.display = "none";
        filterBox.style.display = "block";
    });

    filterCloseBtn.addEventListener("click", () => {
        filterBox.style.display = "none";
        filterBtn.style.display = "block";
    })

    const searchInput = document.querySelector('.input-search-keyword');
    searchInput.addEventListener("keyup", () => {
        filterer.filter();
    });

    data.challenges.forEach(challenge => {

        challenge.labels.forEach(label => tags.push(label))
    });

    // Creates an array with all tags from challenges
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

    // Sorts list by name
    tagsBtn.sort();
    
    // Renderds tags, adds eventlistner (that runs filter functoin when pressed)
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
                
<<<<<<< HEAD
                bajs.filter();
            });

            tagsDiv.appendChild(item);
            
=======
            filterer.filter();
>>>>>>> b97db8a5512c86abd2f61b1cacf4be0fbe9ab164
        });

        tagsDiv.appendChild(item);
            
    });

    // adds eventlistener to ByType checkboxes
    const online = document.querySelector("#online");
    const onSite = document.querySelector("#onsite");

<<<<<<< HEAD
                filterer.filter();
            });
=======
    online.addEventListener("click", () => {
        
        if (onSite.checked) {
>>>>>>> b97db8a5512c86abd2f61b1cacf4be0fbe9ab164

            onSite.checked = false;
        }

        filterer.filter()
    });

    onSite.addEventListener("click", () => {

        if (online.checked) {

            online.checked = false;
        }

        filterer.filter();
    });

}