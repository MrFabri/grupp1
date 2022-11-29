
//sl == searchLength lsl == lastSearchLengh
var sl = 0;
var lsl = 0;
const maxLine = 78;
const searchInput = document.querySelector('.input-search-keyword'); 
const out = document.getElementById('h1');


/*
data.challenges.forEach(challenge => {
  console.log(challenge.title)
})



*/
class challengeList{
    async render(){
    const api = new APIAdapter();
    const challenges = await api.loadChallenges();

    /*
    data.challenges.forEach(challenge => {
        const roomsUl = document.querySelector(".rooms");
        const item = document.createElement("li");
        const content = document.createElement("p");

        content.innerText = "\nTitle: " + challenge.title + "\nDescription: " + challenge.description;

        item.appendChild(content);
        roomsUl.appendChild(item);
    });
    */
    }    
}

class APIAdapter{
    async loadChallenges () {
       
        const challenges  = [];
        for (let i=0 ; i<data.challenges.lenght; i++){

        }
    }
}



searchInput.addEventListener("keyup", function(){
    
    sl = searchInput.innerHTML.length;
    if(sl < maxLine){
        const searchInput = document.querySelector('.input-search-keyword');
        var searchString = searchInput.value;
        //out.innerHTML = searchString;
        //displayRooms();
        
        //str.search(searchString);
        
    }
    
    
        
})

class stringFilter{
constructor(list){
    this.list = list;
    this.textFilter = "";
}
inputMatch(challenge){
    if(challenge.data.title.includes(this.textFilter)) {
        return true;
    }
    else{
        return false;
    }
}
async render(){
    async
        data.challenges.forEach(challenge => {
            console.log(challenge.title)
        });
        }

}



