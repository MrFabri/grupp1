export function addEventsToLinks () {

    document.querySelectorAll(".online-link").forEach(btn => {
        btn.addEventListener("click", () =>  {
            localStorage.filter = "online";
            location.href = './challenges.html';
        })
    });

    document.querySelectorAll(".onsite-link").forEach(btn => {
        btn.addEventListener("click", () =>  {
            localStorage.filter = "onsite";
            location.href = './challenges.html';
        })
    });

}
