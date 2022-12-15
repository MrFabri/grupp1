export function closeHamburger () {
    document.querySelectorAll(".main-menu>li").forEach(li => {
        li.addEventListener("click", () => {
            if (document.querySelector(".main-nav.open")) {
                document.querySelector('.main-nav').classList.toggle('open');
                document.body.style.overflow = "auto";
            }
        })
    })

}