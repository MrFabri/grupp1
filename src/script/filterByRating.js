export class FilterByRating {

    filter (challenge) {
        const minRating = document.querySelectorAll(".rating.min-rating>.rating-star.active").length;
        const maxRating = document.querySelectorAll(".rating.max-rating>.rating-star.active").length;

        if (challenge.rating >= minRating && challenge.rating <= maxRating){
            
            return true;
        
        } else {
        
            return false;
        }
    }

    checkDOM () {
        return true;
    }
}