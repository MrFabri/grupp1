const api = 'https://lernia-sjj-assignments.vercel.app/api';
const body = document.body;

let challengeTitle;
let challengeNumber;
let times;
let date;
let minPart;
let maxPart;
let finalRes;

// Close Function, the booking process stops if you click outside the form
function addCancelOption() {
  const close = document.querySelector(".booking");
  close.addEventListener('click', (e) => {
    if(e.target.className == "booking"){
      challengeTitle = "";
      challengeNumber = "";
      times = "";
      date = "";
      minPart = "";
      maxPart = "";
      body.removeChild(close);
      body.style.overflow = "auto";
      return;
    }
  });
}

// Displays an error
function errorInfo(error) {
  const close = document.querySelector(".booking");
  const template = `<div class="error"><p>${error}</p></div>`;
  close.insertAdjacentHTML("afterbegin", template);
  setTimeout(()=> {
    const errorDiv = document.querySelector(".error");
    if(errorDiv) {
      close.removeChild(errorDiv);
    }
  }, 6000);
}

// Validates the email
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Book a room (First Step)
function book(title, challenge, Min, Max) {
  challengeTitle = title;
  challengeNumber = challenge;
  minPart = Min;
  maxPart = Max;

  const firstTemplate = `
  <div class="booking" id="bookingPartOne"> 
    <div class="first-modal">
      <h2>Book room "${title}" (Step 1)</h2>
      <p>What date would you like to come?</p>
      <label for="date">Date</label>
      <input name="date" type="date" id="bookingDate">
      <div class="btn-parent">
          <button id="submitBtnOne" class="button primary">Search available times</button>
      </div>
    </div>
  </div>
  `;
  
  body.insertAdjacentHTML("afterbegin", firstTemplate);
  body.style.overflow = "hidden";

  // Submit
  const submitBtn = document.querySelector("#submitBtnOne");
  submitBtn.addEventListener('click', () => {
    submitStepOne(challenge);
  });

  addCancelOption();
}

// Submit Step 1
async function submitStepOne(challenge) {
  date = document.querySelector("#bookingDate").value;

  if (!date) {
    errorInfo("Please fill the date field!")
    return;
  }

  const res = await fetch(`${api}/booking/available-times?date=${date}&challenge=${challenge}`);
  times = await res.json();
  times = times.slots;

  if(!times) {
    errorInfo('That date is not available, try another one!');
    return;
  }

  bookStepTwo();
}

// Book a room (Second Step)
function bookStepTwo() {
  const bookingPartOneDiv = document.querySelector('#bookingPartOne');
  body.removeChild(bookingPartOneDiv);

  const secondTemplate = `
  <div class="booking" id="bookingPartTwo">
    <div class="second-modal">
        <h2>Book room "${challengeTitle}" (Step 2)</h2>

        <label for="name">Name</label>
        <input type="text" name="name" id="name">

        <label for="email">E-mail</label>
        <input type="email" name="email" id="email">

        <label for="time">What time?</label>
        <select name="time" id="time"></select>

        <label for="participants">How many participants?</label>
        <select name="participants" id="participants"></select>

        <div class="btn-parent">
        <button id="submitBtnTwo" class="button primary">Submit booking</button>
    </div>
    </div>
  </div>
  `;
 
  body.insertAdjacentHTML("afterbegin", secondTemplate);

  // Adds the time availables
  let dateTemplate;

  times.forEach((time)=> {
    dateTemplate += `<option value="${time}">${time}</option>`
  });
  const time = document.querySelector("#time");
  time.insertAdjacentHTML("afterbegin", dateTemplate);

  // Adds the participants
  let partTemplate;
  
  const partDiv = document.querySelector("#participants");
  for (let i = minPart; i <= maxPart; i++) {
    partTemplate += `<option value="${i}">${i} participants</option>`
  }
  partDiv.insertAdjacentHTML("afterbegin", partTemplate);

  // Submit
  const submitBtnTwo = document.querySelector("#submitBtnTwo");
  submitBtnTwo.addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;

    // Time selected
    const timeDiv = document.querySelector('#time');
    const timeSelected = timeDiv.options[timeDiv.selectedIndex].text;

    // Participants
    let particiDiv = document.querySelector('#participants');
    let participantSelected = particiDiv.options[particiDiv.selectedIndex].value;
    participantSelected = parseInt(participantSelected);

    const val = validateEmail(email);
    if(val === null) {
      errorInfo("Type a valid email adress!");
      return;
    }

    submitStepTwo(challengeNumber, name,  email, date, timeSelected, participantSelected);
  });

  addCancelOption();
}

// Submit Step 2
async function submitStepTwo(challenge, name, email, date, time, participants) {
  if(!name || !email) {
    errorInfo('Fill all the fields before submitting!');
    return;
  }
  const res = await fetch(`${api}/booking/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      challenge,
      name,
      email,
      date,
      time,
      participants,
    }),
  });

  const data = await res.json();
  finalRes = data;
  bookStepThree();
}

// Book a room (Third Step)
function bookStepThree() {
  const bookingPartTwoDiv = document.querySelector('#bookingPartTwo');
  body.removeChild(bookingPartTwoDiv);

  const thirdTemplate = `
  <div class="booking" id="bookingPartThree">
    <div class="third-modal">
      <h1>Thank you</h1>
      <a href="challenges.html">Back to challenges</a>
    </div>
    </div>
  </div>
  `;

  console.log(finalRes);
  body.insertAdjacentHTML("afterbegin", thirdTemplate);
  addCancelOption();
}

// Starts the whole booking modal
// Title, Challenge ID, Min Participants, Max Participants
// book("ESC", 2, 1, 5);