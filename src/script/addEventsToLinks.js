export function addEventsToLinks () {

    document.querySelectorAll(".online").forEach(btn => {
        btn.addEventListener("click", () =>  {
            localStorage.filter = "online";
            location.href = './challenges.html';
        })
    });

    document.querySelectorAll(".onsite").forEach(btn => {
        btn.addEventListener("click", () =>  {
            localStorage.filter = "onsite";
            location.href = './challenges.html';
        })
    });

}
