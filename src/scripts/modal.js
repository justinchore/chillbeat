document.addEventListener('DOMContentLoaded', function () {
    let modal = document.getElementById("about");
    let openAbout = document.getElementById("about-link");
    let closeModal = document.getElementsByClassName("close")[0];

    openAbout.addEventListener('mousedown', () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener('mousedown', () => {
        modal.style.display = "none";
    }); 

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});