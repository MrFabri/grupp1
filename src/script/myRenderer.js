import { Filter } from "./filter.js";

export class Renderer {

    renderRooms(data) {
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
        const filterer = new Filter(data);
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
                
                filterer.filter();
            });

            tagsDiv.appendChild(item);
            
        });
    } 

        /* renderByTag () {
            // adds eventlistener to ByType checkboxes
            const online = document.querySelector("#online");
            const onsite = document.querySelector("#onsite");
    
            online.addEventListener("click", this.filterer.filterByType);
            onsite.addEventListener("click", this.filterer.filterByType);
            online.addEventListener("click", filterer.renderAllFilters());
            onsite.addEventListener("click", filterer.renderAllFilters()); 
        } */
}
