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

    participants.textContent = challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
    participants.dataset.minParticipants = challenge.minParticipants;
    participants.dataset.maxParticipants = challenge.maxParticipants;
    participants.classList.add("challenge-meta");
    challengeItem.appendChild(participants);

    challengeDescription.textContent = challenge.description;
    challengeDescription.classList.add("challenge-description");
    challengeItem.appendChild(challengeDescription);

    createButton(challengeItem, challenge.type, challenge.title, challenge.id);

    return challengeItem;
}

function createStars(challengeCard, rating) {
    const stars = document.createElement("ul");
    stars.classList.toggle("rating");
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("li");

        if (i < rating) {
            star.className = "rating-star active";
        } else {
            star.classList.toggle("rating-star");
        }
        stars.appendChild(star);
    }
    challengeCard.appendChild(stars);
}

function createButton(challengeCard, challengeType, challangeTitle, challengeId) {
    const button = document.createElement("button");

    if (challengeType == "onsite") {
        button.textContent = "Book this room";
        button.classList.add("button", "secondery");
    } else {
        button.textContent = "Take challenge online";
        button.classList.add("button", "primary");
    }
    button.addEventListener("click", function () {
        book(challangeTitle, challengeId);
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