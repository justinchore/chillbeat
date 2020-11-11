import "./styles/index.scss";
import "./styles/drummachine.scss";
import "./scripts/drumMachine.js";
import "./scripts/chordalSequencer.js";
import "./scripts/bassSynth.js";
import "./styles/bassSynth.scss";
import "./scripts/modal.js"; 
import "./styles/mainControls.scss"; 
import "./styles/chordalSequencer.scss";
import * as Tone from "tone";

// document.addEventListener('DOMContentLoaded', function () {
//     let modal = document.getElementById("about"); 
//     let openAbout = document.getElementById("about-link"); 
//     let closeModal = document.getElementsByClassName("close")[0]; 

//     openAbout.onClick = function() {
//         modal.style.display = "block"; 
//     }

//     closeModal.onClick = function() {
//         modal.style.display = "none"; 
//     }

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none"; 
//         }
//     }
// });