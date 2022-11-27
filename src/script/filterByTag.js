/*  
    filter()
    1. Recives a challenge
    2. Creates a list of selected tags from the DOM and puts them in a array "tagList"
    3. Sets result to flase and starts a for loop to go through all items in the "tagList" array
    4. Checks if the item at i is in the labels array in the challenge.
        4b. If it is sets reult to true
        4c. If it is not in there it sets result to false and breaks out of the for loop
    5. returns the result

    checkDOM()
    1. Checkes if any tag button is selected
        1b. if it is returns true
        1c. if no tag button is selected returns false

*/
export class FilterByTag {
//export function filterByTag (challenge) {
    tagSelectedList = document.querySelectorAll(".tag-button.selected");


    filter (challenge) {

        const tagList = [];
        this.tagSelectedList.forEach(node => tagList.push(node.innerHTML));

        let result = false;

        for (let i=0; i < tagList.length; i++) {

            if(challenge.labels.indexOf(tagList[i]) !== -1) {
                result = true;
            } else {
                result = false;
                break;
            }
        }

        return result;
    }

    checkDOM () {
        if(this.tagSelectedList.length > 0) {
            return true;
        } else {
            return false;
        }
    }


}