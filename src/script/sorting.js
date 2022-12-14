export function sort(challenges, sortType) {
    switch (sortType) {
        case "lowest":
            challenges.sort((a, b) => a.rating - b.rating);
            break;
        case "highest":
            challenges.sort((a, b) => b.rating - a.rating);
            break;
        case "name":
            challenges.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    return challenges;
}   