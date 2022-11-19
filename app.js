const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav-toggle');

mainNavToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});


const main = document.querySelector("main");
const roomSection = document.createElement("section");
const challengesList = document.createElement("ul");
challengesList.style.columns = 3;
challengesList.style.listStyle = "none";


//Visar alla items på skärmen.

async function displayRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        createChallengeItem(challenge.image, challenge.title, challenge.rating, challenge.minParticipants, challenge.maxParticipants, challenge.description, challenge.type);
    });
    roomSection.appendChild(challengesList);
    challengesList.className = "challenge-list";
    roomSection.className = "challenges";
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
}

// Skapar och lägger till ett item av datan som hämtas från API:et.

function createChallengeItem(challengeImg, title, rating, minParticipants, maxParticipants, description, type) {
    const challengeItem = document.createElement("li");
    const roomImage = document.createElement("img");
    roomImage.src = challengeImg;
    challengeItem.appendChild(roomImage);
    const roomTitle = document.createElement("h3");
    roomTitle.textContent = title;
    roomTitle.classList.add("challenge-title");
    challengeItem.appendChild(roomTitle);
    createStars(challengeItem, rating);
    const participants = document.createElement("small");
    participants.textContent = minParticipants + "-" + maxParticipants + " participants";
    participants.classList.add("challenge-meta");
    challengeItem.appendChild(participants);
    const challengeDescription = document.createElement("p");
    challengeDescription.textContent = description;
    challengeDescription.style.margin = "0.5em 0";
    challengeDescription.classList.toggle("challenge-description");
    challengeItem.appendChild(challengeDescription);
    createButton(challengeItem, type);
    styleCards(challengeItem);
    challengesList.appendChild(challengeItem);
}
//funkar detdsadsad
// skapar antalet stjärnor

function createStars(challengeItem, rating) {
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
    challengeItem.appendChild(stars);
}

// skapar knappen i utmanningen , så att man kan boka den.

function createButton(challengeItem, challengeType) {
    const button = document.createElement("button");
    button.className = "button primary";
    button.style.margin = "0px 0.7em 0px auto";
    button.style.fontSize = " 0.7em";
    if (challengeType == "onsite") {
        button.textContent = "Book this room";
    } else {
        button.textContent = "Take challenge online";
    }
    challengeItem.appendChild(button);
}


// stylar korten.

function styleCards(challengeItem) {
    challengeItem.style.minWidth = "360px";
    challengeItem.style.maxWidth = "400px";
    challengeItem.style.borderRadius = "4px";
    challengeItem.style.marginBottom = "1em";
    challengeItem.style.paddingBottom = "0.5em";
    challengeItem.style.boxShadow = "0 0 1em rgb(0 0 0 / 20%)";
}

// const modal = document.querySelector('.modal');
// modal.innerHTML =
// `

// `;

// function book(room, ) {

// }