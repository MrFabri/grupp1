import { MyAPI } from './src/script/myApi.js';
import { displayAllRooms } from './src/script/createChallenge.js';
import { threeHighestRanked } from './src/script/topThree.js';

class Init {
    async init () {
        const api = new MyAPI();
        const data = await api.getData();
        
        // Renders hambuger button
        const mainNav = document.querySelector('.main-nav');
        const mainNavToggle = document.querySelector('.main-nav-toggle');

        mainNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        });
        console.log("ping");
        console.log(threeHighestRanked(data));
        displayAllRooms(threeHighestRanked(data), "i");
    };
}


const start = new Init();
start.init();