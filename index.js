import { MyAPI } from './src/script/myApi.js';
import { displayAllRooms } from './src/script/createChallenge.js';
import { threeHighestRanked } from './src/script/topThree.js';
import { addEventsToLinks } from './src/script/addEventsToLinks.js';
import { closeHamburger } from './src/script/addEventToCloseHamburger.js';

class Init {
    async init () {
        const api = new MyAPI();
        const data = await api.getData();
        
        // Renders hambuger button
        const mainNav = document.querySelector('.main-nav');
        const mainNavToggle = document.querySelector('.main-nav-toggle');

        mainNavToggle.addEventListener('click', () => {
            if (mainNav.classList.toggle('open')) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            };
        });
        
        closeHamburger();
        addEventsToLinks();
        
        displayAllRooms(threeHighestRanked(data), "i");
    };
}


const start = new Init();
start.init();