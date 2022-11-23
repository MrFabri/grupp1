const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav-toggle');

mainNavToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

const buttons = document.querySelectorAll("a.button.primary");
buttons.forEach(button => {
    button.addEventListener("click", (ev) => {
        console.log("funkar jag");
        document.location.href = "http://127.0.0.1:5500/challenges.html";
        document.body.onload = displayOnlineRooms();
    })
})


function wellHello() {
    console.log("hej");
    displayAllRooms();
}

const main = document.querySelector("main");
const roomSection = document.createElement("section");
const challengesHtmlList = document.createElement("ul");
challengesHtmlList.style.content = "";
challengesHtmlList.style.columns = 3;
challengesHtmlList.style.listStyle = "none";

//Visar alla items på skärmen.

async function displayAllRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        createChallengeItem(challenge);
    });
    roomSection.appendChild(challengesHtmlList);
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
}

//Visar online rooms
async function displayOnlineRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        if (challenge.type == "online") {
            console.log(challenge.title);
            createChallengeItem(challenge);
        }
    });
    roomSection.appendChild(challengesHtmlList);
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
}

//Visar onsite rooms 
async function displayOnSiteRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        if (challenge.type == "onsite") {
            console.log(challenge.title);
            createChallengeItem(challenge);
        }
    });
    roomSection.appendChild(challengesHtmlList);
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
}

// Skapar och lägger till ett item av datan som hämtas från API:et.

function createChallengeItem(challenge) {
    const challengeItem = document.createElement("li");
    const tempDiv = document.createElement("div");
    const roomImage = document.createElement("img");
    roomImage.src = challenge.image;
    tempDiv.appendChild(roomImage);
    createStars(tempDiv, challenge.rating);
    const roomTitle = document.createElement("h3");
    roomTitle.textContent = challenge.title;
    roomTitle.style.paddingLeft = "1em";
    roomTitle.style.margin = 0;
    tempDiv.appendChild(roomTitle);
    const participants = document.createElement("small");
    participants.textContent = challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
    participants.style.paddingLeft = "1em";
    participants.classList.add("challenge-meta");
    tempDiv.appendChild(participants);
    const challengeDescription = document.createElement("p");
    challengeDescription.textContent = challenge.description;
    challengeDescription.style.margin = "0.5em 0";
    challengeDescription.classList.toggle("challenge-description");
    challengeDescription.style.paddingLeft = "1em";
    tempDiv.appendChild(challengeDescription);
    createButton(tempDiv, challenge.type);
    styleCards(tempDiv);
    challengeItem.appendChild(tempDiv);
    challengesHtmlList.appendChild(challengeItem);
}

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
    stars.style.position = "relative";
    stars.style.top = "-1.5em";
    stars.style.paddingLeft = "1em";
    challengeItem.appendChild(stars);
}

// skapar knappen i utmanningen , så att man kan boka den.

function createButton(challengeItem, challengeType) {
    const button = document.createElement("button");
    button.className = "button primary";
    button.style.display = "block";
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
    challengeItem.style.minWidth = "260px";
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