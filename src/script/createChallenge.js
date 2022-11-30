function createChallenge(challenge) {
    const challengeItem = document.createElement("li");
    const roomImage = document.createElement("img");
    const roomTitle = document.createElement("h3");
    const participants = document.createElement("small");
    const challengeDescription = document.createElement("p");

    challengeItem.classList.add("challenge-item");
    roomImage.classList.add("challenge-image");
    roomImage.src = challenge.image;
    challengeItem.appendChild(roomImage);
    roomTitle.textContent = challenge.title;
    roomTitle.classList.add("challenge-title");
    challengeItem.appendChild(roomTitle);

    createStars(challengeItem, challenge.rating);

    if (challenge.minParticipants == challenge.maxParticipants) {
        participants.textContent = challenge.maxParticipants + " participants";
    } else {
        participants.textContent = challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
    }
    participants.classList.add("challenge-meta");
    challengeItem.appendChild(participants);

    challengeDescription.textContent = challenge.description;
    challengeDescription.classList.add("challenge-description");
    challengeItem.appendChild(challengeDescription);

    createButton(challengeItem, challenge.type, challenge.title, challenge.id, challenge.minParticipants, challenge.maxParticipants);

    return challengeItem;
}

function createStars(challengeCard, rating) {
    const stars = document.createElement("ul");
    stars.classList.toggle("rating");
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("li");
        if (i < rating) {
            if (i == Math.floor(rating)){
                star.classList.add("half-star");
            } else {
                star.classList.add("rating-star", "active");
            }
            //  
        } else {
            star.classList.toggle("rating-star");
        }
        stars.appendChild(star);
    }
    challengeCard.appendChild(stars);
}

function wholeOrNot(number) {
    let result = (n - Math.floor(n)) !== 0;
    if (result)
        return 'Number has a decimal place.';
    else
        return 'It is a whole number.';
}

function createButton(challengeCard, challengeType, challangeTitle, challengeId, min, max) {
    const button = document.createElement("button");

    if (challengeType == "onsite") {
        button.textContent = "Book this room";
        button.classList.add("button", "secondary");
    } else {
        button.textContent = "Take challenge online";
        button.classList.add("button", "primary");
    }
    button.addEventListener("click", function () {
        book(challangeTitle, challengeId, min, max);
    });
    challengeCard.appendChild(button);
}

export function displayAllRooms(data, page) {
    let challengesHtmlList;

    if (page == "i") {
        challengesHtmlList = document.querySelector(".challenge-list");

    } else if (page == "c") {
        challengesHtmlList = document.querySelector(".challenges-list");

    } else {

        alert("Error at displayAllRooms in createChallenge.js. page != c/i!!")
    }

    challengesHtmlList.innerHTML = "";

    data.challenges.forEach(challenge => {
        challengesHtmlList.appendChild(createChallenge(challenge));
    });

}