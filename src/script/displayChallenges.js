const topThreeInIndex = document.querySelectorAll("section.challenges > ul > li");

async function threeHighestRanked() {
    let topThreeByRating = [];
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
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


function changeCardContent(cardToBeChanged, theNewCard) {
    cardToBeChanged.querySelector("img").src = theNewCard.image;
    cardToBeChanged.querySelector("h3").innerHTML = theNewCard.title;
    const stars = cardToBeChanged.querySelectorAll("ul > li");
    for (let i = 0; i < stars.length; i++) {
        if (i < theNewCard.rating) {
            stars[i].className = "rating-star active";
        } else {
            stars[i].className = "rating-star";
        }
    }
    const participants = cardToBeChanged.querySelector("small");
    participants.innerHTML = theNewCard.minParticipants + "-" + theNewCard.maxParticipants + " participants";
    participants.dataset.minParticipants = theNewCard.minParticipants;
    participants.dataset.maxParticipants = theNewCard.maxParticipants;
    cardToBeChanged.querySelector("p").innerHTML = theNewCard.description;
    const button = cardToBeChanged.querySelector("button");
    if (theNewCard.type == "online") {
        button.innerHTML = "Take challenge online";
    } else {
        button.innerHTML = "Book this room";
        button.className = "button secondary";
    }
    button.addEventListener("click", function () {
        book(theNewCard.title, theNewCard.id);
    });
}

//makes the screen change upon resizing.
window.onresize = doIt;

// This function resizes the screen

function doIt() {
    if (document.location == "https://mrfabri.github.io/esc-grupp1/challenges.html") {
        const listElements = document.querySelectorAll("section > ul > li");
        if (window.innerWidth < 1000) {
            for (const element of listElements) {
                element.style.width = "auto";
                element.style.margin = "auto";
                element.style.alignContent = "center";
            }
        } else {
            for (const element of listElements) {
                element.style.width = "calc(95%/3)";
                element.style.maxWidth = "400px";
                element.style.margin = "0";
                element.style.marginBottom = "2em";
                challengesHtmlList.style.justifyContent = "space-between";
                //  challengesHtmlList.lastChild.style.marginRight = "auto";
                if (listElements.length > 3 && listElements[listElements.length - 1] === element) {
                    listElements[listElements.length - 2].style.marginLeft = "0";
                    listElements[listElements.length - 2].style.marginRight = "0";
                    listElements[listElements.length - 1].style.marginRight = "auto";
                    if (!listElements.length % 2 == 0) {
                        listElements[listElements.length - 1].style.marginLeft = "2.5%";
                    } else {
                        listElements[listElements.length - 1].style.marginLeft = "0%";
                    }
                }
                //   challengesHtmlList.lastChild.style.paddingLeft = "2.5%";
            }
        }
    }
}


// Buttons for online challenges

const onlineButtons = document.querySelectorAll("a.button.primary");
onlineButtons.forEach(button => {
    button.addEventListener("click", (ev) => {
        document.cookie = "online";
        document.location.href = "https://mrfabri.github.io/esc-grupp1/challenges.html";
    })
})


// Buttons for on-site challenges

const onSiteButtons = document.querySelectorAll("a.button.secondary");
onSiteButtons.forEach(button => {
    button.addEventListener("click", (ev) => {
        document.cookie = "offline";
        document.location.href = "https://mrfabri.github.io/esc-grupp1/challenges.html";
    })
})

// THE function that interwines everything

function wellHello() {
    if (document.cookie == "online") {
        console.log("jag visar online");
        displayOnlineRooms();
        document.querySelector("input#online").checked = true;
    } else if (document.cookie == "offline") {
        console.log("jag visar offline");
        displayOnSiteRooms();
        document.querySelector("input#onsite").checked = true;
    } else {
        console.log("jag visar alla");
        displayAllRooms();
        document.querySelector("input#online").checked = true;
        document.querySelector("input#onsite").checked = true;
    }
    document.cookie = "";
}


// Creates a section that is containing a list that WILL display the challenges (depending on what challenges). 

const main = document.querySelector("main");
const roomSection = document.createElement("section");
roomSection.classList.add("challenges");
const challengesHtmlList = document.createElement("ul");
challengesHtmlList.classList.add("challenge-list");
challengesHtmlList.style.display = "flex";
challengesHtmlList.style.flexWrap = "wrap";
challengesHtmlList.style.alignContent = "center";
challengesHtmlList.style.listStyle = "none";


// Shows all the challenge rooms (both online/onsite) 

async function displayAllRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        challengesHtmlList.appendChild(createChallenge(challenge));
    });
    roomSection.appendChild(challengesHtmlList);
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
    doIt();
}


// Displays the online challenges

async function displayOnlineRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        if (challenge.type == "online") {
            displayThisChallenge(createChallenge(challenge));
        }
    });
    //  roomSection.appendChild(challengesHtmlList);
    // roomSection.style.marginTop = "2em";
    //  main.appendChild(roomSection);
    //  doIt();
}


// Displays on-site rooms

async function displayOnSiteRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        if (challenge.type == "onsite") {
            displayThisChallenge(createChallenge(challenge));
        }
    });
    // roomSection.appendChild(challengesHtmlList);
    // roomSection.style.marginTop = "2em";
    // main.appendChild(roomSection);
    // doIt();
}


// Creates, styles and adds a challenge card to a <li> element. Returns the <li> element.

function createChallenge(challenge) {
    const challengeItem = document.createElement("li");
    const roomImage = document.createElement("img");
    roomImage.src = challenge.image;
    challengeItem.appendChild(roomImage);
    const roomTitle = document.createElement("h3");
    roomTitle.textContent = challenge.title;
    roomTitle.classList.add("challenge-title");
    //roomTitle.style.paddingLeft = "1em";
    //roomTitle.style.margin = 0;
    challengeItem.appendChild(roomTitle);
    createStars(challengeItem, challenge.rating);
    const participants = document.createElement("small");
    participants.textContent = challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
    // participants.style.paddingLeft = "1em";
    //participants.classList.add("challenge-meta");
    participants.dataset.minParticipants = challenge.minParticipants;
    participants.dataset.maxParticipants = challenge.maxParticipants;
    challengeItem.appendChild(participants);
    const challengeDescription = document.createElement("p");
    challengeDescription.textContent = challenge.description;
    // challengeDescription.style.margin = "0.5em 0";
    // challengeDescription.classList.toggle("challenge-description");
    //  challengeDescription.style.paddingLeft = "1em";
    challengeItem.appendChild(challengeDescription);
    createButton(challengeItem, challenge.type, challenge.title, challenge.id);
    styleCard(challengeItem);
    //   challengeItem.style.width = "calc(95% / 3)";
    //challengeItem.style.width = "calc(95%/3)";
    //challengeItem.style.width = "100%"
    // challengeItem.style.margin = "auto";
    //tempDiv.style.position = "relative";
    // tempDiv.style.top = "-2.5em";
    //tempDiv.style.padding = "0.5em 0.5em";
    //tempDiv.style.maxWidth = "400px";
    //   challengeItem.appendChild(tempDiv);
    if (window.innerWidth < 1000) {
        challengeItem.style.maxWidth = "400px";
    }
    return challengeItem;
}

function displayThisChallenge(challenge) {
    challengesHtmlList.appendChild(challenge);
    roomSection.appendChild(challengesHtmlList);
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
    doIt();
}


// Creates the stars on the challenge card and positiones them.

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


// Makes the booking button for the displayed challenges.

function createButton(challengeCard, challengeType, challangeTitle, challengeId) {
    const button = document.createElement("button");
    button.style.display = "block";
    button.style.margin = "0 0.5em 0 auto";
    button.style.fontSize = " 0.7em";
    if (challengeType == "onsite") {
        button.textContent = "Book this room";
        button.className = "button secondary";
    } else {
        button.textContent = "Take challenge online";
        button.className = "button primary";
    }
    button.addEventListener("click", function () {
        book(challangeTitle, challengeId);
    });
    challengeCard.appendChild(button);
}


// Styles the displayed challenges.

function styleCard(challengeCard) {
    challengeCard.style.maxWidth = "400px";
    challengeCard.style.borderRadius = "4px";
    challengeCard.style.paddingBottom = "0.5em";
    challengeCard.style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
}
