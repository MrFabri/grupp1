
//sl == searchLength lsl == lastSearchLengh
var sl = 0;
var lsl = 0;
const maxLine = 78;
const searchInput = document.querySelector('.input-search-keyword'); 
const out = document.getElementById('h1');

/*data.challenges.forEach(challenge => {
  console.log(challenge.title)
})
*/

displayRooms();
async function displayRooms() {
    const res = await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges%27");
    const data = await res.json();
    data.challenges.forEach(challenge => {
        console.log(challenge.title)
    });
}

searchInput.addEventListener("input", function(){
    sl = searchInput.innerHTML.length;
    if(sl < maxLine){
        const searchInput = document.querySelector('.input-search-keyword');
        var searchString = searchInput.value;
        out.innerHTML = searchString;
        
    }
})

