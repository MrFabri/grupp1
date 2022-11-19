const api = 'https://lernia-sjj-assignments.vercel.app/api';
const body = document.body;

let challengeTitle;
let challengeNumber;
let times;
let date;
let finalRes;

// Book a room (First Step)
function book(title, challenge) {
  challengeTitle = title;
  challengeNumber = challenge;

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
  body.style.position = "fixed";

  // Submit
  const submitBtn = document.querySelector("#submitBtnOne");
  submitBtn.addEventListener('click', () => {
    submitStepOne(challenge);
  });
}

// Submit Step 1
async function submitStepOne(challenge) {
  date = document.querySelector("#bookingDate").value;

  if (!date) {
    alert('Please fill the date field!');
    return;
  } else {
    const res = await fetch(`${api}/booking/available-times?date=${date}&challenge=${challenge}`);
    times = await res.json();
    times = times.slots;
    bookStepTwo();
  }
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
        <select name="participants" id="participants">
            <option value="2">2 participants</option>
            <option value="3">3 participants</option>
            <option value="4">4 participants</option>
            <option value="5">5 participants</option>
            <option value="6">6 participants</option>
        </select>

        <div class="btn-parent">
        <button id="submitBtnTwo" class="button primary">Submit booking</button>
    </div>
    </div>
  </div>
  `;
 
  body.insertAdjacentHTML("afterbegin", secondTemplate);

  let dateTemplate;
  times.forEach((time)=> {
    dateTemplate += `<option value="${time}">${time}</option>`
  });

  const time = document.querySelector("#time");
  time.insertAdjacentHTML("afterbegin", dateTemplate);

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

    submitStepTwo(challengeNumber, name,  email, date, timeSelected, participantSelected);
  });
}

// Submit Step 2
async function submitStepTwo(challenge, name, email, date, time, participants) {
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
}

// Starts the whole booking modal
// book("ESC", 2);