import { MyAPI } from './src/script/myApi.js';
import { myRenderer } from './src/script/myRenderer.js';
import { RenderRating } from './src/script/renderByRating.js';
import { Filter } from './src/script/filter.js';

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
        
        const filterer = new Filter(data);
        const rating = new RenderRating();
        rating.render(data);
        myRenderer(data);

        //addEventsToLinks();
        document.querySelectorAll(".online-link").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelector("#online").checked = true;
                document.querySelector("#onsite").checked = false;
                filterer.filter();
            });
        })

        document.querySelectorAll(".onsite-link").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelector("#onsite").checked = true;
                document.querySelector("#online").checked = false;
                filterer.filter();
            });
        })

        // Filters based on pressed link/button on index.html
        if (localStorage.getItem("filter") == "online") {

            document.querySelector("#online").checked = true;

        } else if (localStorage.getItem("filter") == "onsite") {

            document.querySelector("#onsite").checked = true;
        }

        filterer.filter();
    };
}

const start = new Init();
start.init();