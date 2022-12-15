export class FilterByRating {

    minRating = document.querySelectorAll(".rating.min-rating>.rating-star.active").length;
    maxRating = document.querySelectorAll(".rating.max-rating>.rating-star.active").length;

    filter (challenge) {
        

        if ((challenge.rating >= this.minRating) && (challenge.rating <= this.maxRating)){
            
            return true;
        
        } else {
        
            return false;
        }
    }

    checkDOM () {
        
        if (this.minRating == 0 && this.maxRating == 5) {

            return false;

        } else {

            return true;

        }

    }
}