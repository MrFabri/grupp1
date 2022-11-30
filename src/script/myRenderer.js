import { Filter } from "./filter.js";

export function myRenderer (data) {
    // Renders tag buttons
    const filterer = new Filter(data);
    const tags = [];

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
                
            filterer.filter();
        });

        tagsDiv.appendChild(item);
            
    });

    // adds eventlistener to ByType checkboxes
    const online = document.querySelector("#online");
    const onSite = document.querySelector("#onsite");

    online.addEventListener("click", () => {
        
        if (onSite.checked) {

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