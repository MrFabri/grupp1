import { MyAPI } from './myApi.js';
import { Renderer } from './myRenderer.js';
import { FilterByTag } from './filterByTag.js';
import { FilterByType } from './filterByType.js';

export class Filter {

    constructor (data) {
        this.data = data;
    }

    /* 
        A filter method that goes through all challenges
        for each challenge it checkes all the filters
            if that challenge passes all the filters it adds it to a new array of challenges

        Checks to see if the new array is empty, meaning that no challenge matches all the filters
            prints out an alert (to be changes for a correct displaying error message) is it is empty
            otherwise it send the list of all challenges that passed to be renderd
    
    */

    filter () {
        const renderer = new Renderer();
        const filterByTag = new FilterByTag();
        const filterByType = new FilterByType();
        const filteredList = { challenges: [],};

        if ( 
            filterByTag.checkDOM() ||
            filterByType.checkDOM()
            ){
            


            this.data.challenges.forEach(challenge => {
                // Checks for each filter if the challenge matches the filter or if all the DOM elements for that filter is empty
                if (
                    (filterByTag.filter(challenge) || !filterByTag.checkDOM()) &&
                    (filterByType.filter(challenge) || !filterByType.checkDOM())
                    ) {

                    filteredList.challenges.push(challenge);    
                }
            })


            if (filteredList.challenges.length > 0 ){

                renderer.renderRooms(filteredList);

            } else {
                document.querySelector(".rooms").innerHTML = "";
                alert("No challenges matches your filter");
            }
        
        } else {
            this.data.challenges.forEach(challenge => {
                filteredList.challenges.push(challenge);
                renderer.renderRooms(filteredList);
            });
        }

    }

}

class Init {
    async init () {
        const api = new MyAPI();
        const data = await api.getData();
        const renderer = new Renderer();

        renderer.renderRooms(data);
        renderer.renderTags(data);    
        renderer.renderByTag(data);
    };
}

const start = new Init();
start.init();