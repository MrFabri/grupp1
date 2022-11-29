import { Filter } from "./filter.js";

export class RenderRating {



    render (data) {
        const filterer = new Filter(data);
        const ratingStar = document.querySelectorAll(".rating-star");

        ratingStar.forEach(node => {
            node.addEventListener("click", () => {
                if(node.parentNode.getAttribute("class") === "rating min-rating") {
                    
                    if(node.getAttribute("class") === "rating-star") {

                        this.minRatingAddStar();
                        filterer.filter();

                    } else if (node.getAttribute("class") === "rating-star active") {

                        this.minRatingRemoveStar();
                        filterer.filter();

                    } else {

                        alert("Error in myRenderer.js, node of min-rating ratingstar class dose not match any criterias!")
                    }



                } else if (node.parentNode.getAttribute("class") === "rating max-rating") {
                    
                    if(node.getAttribute("class") === "rating-star") {

                        this.maxRatingAddStar();
                        filterer.filter();

                    } else if (node.getAttribute("class") === "rating-star active") {

                        this.maxRatingRemoveStar();
                        filterer.filter();

                    } else {
                        
                        alert("Error in myRenderer.js, node of max-rating ratingstar class dose not match any criterias!")
                    }
                    
                } else {
                    alert("Error in myRenderer.js, node.parentNode class dosent match any criterias!");
                }

            })
        })
    }

    countMinRating () {

        return document.querySelectorAll(".rating.min-rating>.rating-star.active").length;
    }

    countMaxRating () {

        return document.querySelectorAll(".rating.max-rating>.rating-star.active").length;
    }

    minRatingAddStar () {
        if (this.countMinRating() >= this.countMaxRating()) {
            
            this.maxRatingAddStar();

        } else if (this.countMinRating() < this.countMaxRating()) {

            let nodeList = document.querySelectorAll(".rating.min-rating>.rating-star");

            for (let i = 0; i < nodeList.length; i++) {
                
                if (nodeList[i].getAttribute("class") === "rating-star") {
                    nodeList[i].classList.toggle("active");
                    break;
                }
            };
            
        } else {

            alert("Error in renderByRating.js in method minRatingAddStar - check countMinRating vs countMaxRating yeilded unexpected result!")
        }

    }   

    minRatingRemoveStar () {

        const nodeList = document.querySelectorAll(".rating.min-rating>.rating-star.active");

        for (let i = (nodeList.length - 1); i >= 0; i--) {
            
            if (nodeList[i].getAttribute("class") === "rating-star active") {
                nodeList[i].classList.toggle("active");
                break;
            }
        }; 

    }

    maxRatingAddStar () {

        let nodeList = document.querySelectorAll(".rating.max-rating>.rating-star");

        for (let i = 0; i < nodeList.length; i++) {
            
            if (nodeList[i].getAttribute("class") === "rating-star") {
                nodeList[i].classList.toggle("active");
                break;
            }
        };
    }

    maxRatingRemoveStar () {

        if (this.countMaxRating() <= this.countMinRating()) {
            
            this.minRatingRemoveStar();

        } else if (this.countMaxRating() > this.countMinRating()) {

            let nodeList = document.querySelectorAll(".rating.max-rating>.rating-star");

            for (let i = (nodeList.length - 1); i >= 0; i--) {
            
                if (nodeList[i].getAttribute("class") === "rating-star active") {
                    nodeList[i].classList.toggle("active");
                    break;
                }
            }; 
            
        } else {

            alert("Error in renderByRating.js in method maxRatingRemoveStar - check countMinRating vs countMaxRating yeilded unexpected result!")
        }
    }
}
