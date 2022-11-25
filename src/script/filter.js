import { MyAPI } from './myApi.js';
import { Renderer } from './myRenderer.js';
import { filterByTag } from './filterByTag.js';

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
        const filteredList = { challenges: [],};

        this.data.challenges.forEach(challenge => {

            /* if( filterByTag(challenge) &&
                filterByText(challenge) && 
                filterByType(challenge) && 
                filterByType(challange) )  */
            if (filterByTag(challenge)) {

                filteredList.challenges.push(challenge);    
            }
        })


        if (filteredList.challenges.length > 0 ){

            renderer.renderRooms(filteredList)

        } else {

            alert("No challenges matches your filter")
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
    };
}

const start = new Init();
start.init();