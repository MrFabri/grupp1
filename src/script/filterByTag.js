/*
    1. Recives a challenge
    2. Creates a list of selected tags from the DOM and puts them in a array "tagList"
    3. Sets result to flase and starts a for loop to go through all items in the "tagList" array
    4. Checks if the item at i is in the labels array in the challenge.
        4b. If it is sets reult to true
        4c. If it is not in there it sets result to false and breaks out of the for loop
    5. returns the result

*/

export function filterByTag (challenge) {

    const tagSelectedList = document.querySelectorAll(".tag-button.selected");

    const tagList = [];
    tagSelectedList.forEach(node => tagList.push(node.innerHTML));

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