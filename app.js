const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav-toggle');

mainNavToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

//makes the screen change upon resizing.
window.onresize = doIt;

// This function resizes the screen

function doIt() {
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
        }
    }
}


// Buttons for online challenges

const onlineButtons = document.querySelectorAll("a.button.primary");
onlineButtons.forEach(button => {
    button.addEventListener("click", (ev) => {
        document.cookie = "online";
        document.location.href = "http://127.0.0.1:5500/challenges.html";
    })
})


// Buttons for on-site challenges

const onSiteButtons = document.querySelectorAll("a.button.secondary");
onSiteButtons.forEach(button => {
    button.addEventListener("click", (ev) => {
        document.cookie = "offline";
        document.location.href = "http://127.0.0.1:5500/challenges.html";
    })
})

//Checkbox for online challenges and listener
/**onlineCheckBox.addEventListener("click", (ev) => {
    if (onlineCheckBox.checked == true) {
        displayOnlineRooms();
    } else {
        displayOnSiteRooms();
    }
})

//Checkbox for On-Site challenges and listener
const onSiteCheckBox = document.querySelector("input#onsite");
*/

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

    const onlineCheckBox = document.querySelector("input#online");
    onlineCheckBox.addEventListener("click", (ev) => {
        if (onlineCheckBox.checked == true) {
            displayOnlineRooms();
        } else {
            displayOnSiteRooms();
        }
    })

}


// Creates a section that is containing a list that WILL display the challenges (depending on what challenges). 

const main = document.querySelector("main");
const roomSection = document.createElement("section");
const challengesHtmlList = document.createElement("ul");
challengesHtmlList.style.display = "flex";
challengesHtmlList.style.flexWrap = "wrap";
challengesHtmlList.style.justifyContent = "space-between";
challengesHtmlList.style.alignContent = "center";
challengesHtmlList.style.listStyle = "none";


// Shows all the challenge rooms (both online/onsite) 

async function displayAllRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        challengesHtmlList.appendChild(createChallengeItem(challenge));
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
            challengesHtmlList.appendChild(createChallengeItem(challenge));
        }
    });
    roomSection.appendChild(challengesHtmlList);
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
    doIt();
}


// Displays on-site rooms

async function displayOnSiteRooms() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        if (challenge.type == "onsite") {
            challengesHtmlList.appendChild(createChallengeItem(challenge));
        }
    });
    roomSection.appendChild(challengesHtmlList);
    challengesHtmlList.lastChild.style.marginRight = "auto";
    challengesHtmlList.lastChild.style.paddingLeft = "2.5%";
    roomSection.style.marginTop = "2em";
    main.appendChild(roomSection);
    doIt();
}


// Creates, styles and adds a challenge to a <li> element. Returns the <li> item.

function createChallengeItem(challenge) {
    const challengeItem = document.createElement("li");
    const roomImage = document.createElement("img");
    roomImage.src = challenge.image;
    challengeItem.appendChild(roomImage);
    const tempDiv = document.createElement("div");
    createStars(tempDiv, challenge.rating);
    const roomTitle = document.createElement("h3");
    roomTitle.textContent = challenge.title;
    //roomTitle.style.paddingLeft = "1em";
    //roomTitle.style.margin = 0;
    tempDiv.appendChild(roomTitle);
    const participants = document.createElement("small");
    participants.textContent = challenge.minParticipants + "-" + challenge.maxParticipants + " participants";
    // participants.style.paddingLeft = "1em";
    //participants.classList.add("challenge-meta");
    tempDiv.appendChild(participants);
    const challengeDescription = document.createElement("p");
    challengeDescription.textContent = challenge.description;
    // challengeDescription.style.margin = "0.5em 0";
    // challengeDescription.classList.toggle("challenge-description");
    //  challengeDescription.style.paddingLeft = "1em";
    tempDiv.appendChild(challengeDescription);
    createButton(tempDiv, challenge.type);
    styleCards(tempDiv);
    //   challengeItem.style.width = "calc(95% / 3)";
    //challengeItem.style.width = "calc(95%/3)";
    //challengeItem.style.width = "100%"
    // challengeItem.style.margin = "auto";
    tempDiv.style.position = "relative";
    tempDiv.style.top = "-2.5em";
    tempDiv.style.padding = "0.5em 0.5em";
    tempDiv.style.maxWidth = "400px";
    challengeItem.appendChild(tempDiv);
    return challengeItem;
}


// Creates the stars on the challenge and positiones them.

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


// Makes the booking button for the displayed challenges.

function createButton(challengeItem, challengeType) {
    const button = document.createElement("button");
    button.className = "button primary";
    button.style.display = "block";
    button.style.margin = "0 0 0 auto";
    button.style.fontSize = " 0.7em";
    if (challengeType == "onsite") {
        button.textContent = "Book this room";
    } else {
        button.textContent = "Take challenge online";
    }
    challengeItem.appendChild(button);
}


// Styles the displayed challenges.

function styleCards(challengeItem) {
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