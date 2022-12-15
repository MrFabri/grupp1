export function threeHighestRanked(data) {
    sort(data.challenges);
    const topThree = { challenges: [],}

    for (let i = 0; i < 3; i++) {
        topThree.challenges.push(data.challenges[i]);        
    }

    return topThree;
}

function sort(challenges) {
    let length = challenges.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            if (challenges[j].rating < challenges[j + 1].rating) {
                swap(challenges, j, j + 1);
            }
        }
    }
    return challenges;
}

function swap(array, firstIndex, secondIndex) {
    let temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
} 
