import { MyAPI } from './src/script/myApi.js';
import { myRenderer } from './src/script/myRenderer.js';
import { RenderRating } from './src/script/renderByRating.js';
import { displayAllRooms } from './src/script/createChallenge.js';

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
        

        const rating = new RenderRating();

        rating.render(data);
        myRenderer(data);

        displayAllRooms(data);
    };
}

const start = new Init();
start.init();