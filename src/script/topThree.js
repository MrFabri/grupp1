

export function threeHighestRanked(data) {
    const topThreeInIndex = document.querySelectorAll("section.challenges > ul > li");
    let topThreeByRating = [];
    
    
    data.challenges.forEach(challenge => {
        if (challenge.rating > 4 && topThreeByRating.length < 3) {
            topThreeByRating.push(challenge);
        }
    })
    if (topThreeByRating.length < 3) {
        data.challenges.forEach(challenge => {
            if (challenge.rating > 3 && challenge.rating <= 4) {
                topThreeByRating.push(challenge);
            }
        })
    }
    for (let i = 0; i < topThreeByRating.length; i++) {
        changeCardContent(topThreeInIndex[i], topThreeByRating[i]);
    }
}

export function sortTopThree (data) {
    data.challenges.sort(function(a, b){return a-b});
    console.log(data);
}