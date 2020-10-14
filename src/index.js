import "./styles/index.scss";
import "./styles/drummachine.scss";
import "./scripts/drumMachine.js";
import "./styles/mainControls.scss"; 
import * as Tone from "tone";

document.addEventListener('DOMContentLoaded', function () {
        // document.getElementById("playback-button").addEventListener('mousedown', (e) => {
        //     e.preventDefault();
        //     if (Tone.context.state !== 'running') {
        //         // debugger
        //         Tone.context.resume();
        //         document.getElementById("playback-button").innerHTML = "Playing";
        //     } else if (Tone.Transport.state === "paused") {
        //         Tone.Transport.start();
        //         document.getElementById("playback-button").innerHTML = "Playing";
        //     } else {
        //         Tone.Transport.pause();
        //         document.getElementById("playback-button").innerHTML = "Paused";
        //     }
        // });
        
        
        document.body.onkeydown = (e) => {
            // debugger
            if (e.code === "Space") {
                if (Tone.context.state !== 'running') {
                    // debugger
                    Tone.context.resume();
                    document.getElementById("playback-button").innerHTML = "&#9612&#9612";
                } else if (Tone.Transport.state === "paused") {
                    Tone.Transport.start();
                    document.getElementById("playback-button").innerHTML = "&#9612&#9612";
                } else {
                    Tone.Transport.pause();
                    document.getElementById("playback-button").innerHTML = "&#9654";
                }
            }
        };
});

    // const $playingOrPaused = document.getElementById("playback-button");

    // $playingOrPaused.click(() => {
    //     if ($playingOrPaused.innerHTML === "Play") {
    //         $playingOrPaused.innerHTML = "Stop";
    //     } else {
    //         $playingOrPaused.innerHTML = "Play";
    //     }
    // })
    // const drums = [
    //     new Tone.Player({ url: "src/samples/hh1.wav" }),
    //     new Tone.Player({ url: "src/samples/snare1.wav" }),
    //     new Tone.Player({ url: "src/samples/kick1.wav" })
    // ]

    // // var sampler = new Tone.Sampler({
    // //   "C3": "path/to/C3.mp3",
    // //   "D#3": "path/to/Dsharp3.mp3",
    // //   "F#3": "path/to/Fsharp3.mp3",
    // //   "A3": "path/to/A3.mp3",
    // // }, function () {
    // //   //sampler will repitch the closest sample
    // //   sampler.triggerAttack("D3")
    // // })

    // // synths[0].oscillator.type = 'triangle';
    // // synths[1].oscillator.type = 'sine';
    // // synths[2].oscillator.type = 'sawtooth';


    // drums.forEach(drum => drum.toDestination());
    // const $rows = document.querySelectorAll(".row");
    // let index = 0;

    // Tone.Transport.bpm.value = bpmSetter();
    // Tone.Transport.scheduleRepeat(repeat, '16n');
    // Tone.Transport.start();


    // function repeat(time) {
    //     let step = index % 32;

    //     for (let i = 0; i < $rows.length; i++) {

    //         console.log(step);
    //         Tone.Transport.bpm.value = bpmSetter();
    //         // Tone.Transport.swing = controlSwing();  

    //         let drum = drums[i],

    //             $row = $rows[i];

    //         let $label = $row.querySelector(`label:nth-child(${step + 1})`);

    //         let $input = $label.querySelector(`.input-key`);

    //         if ($input.checked) {
    //             // drum.triggerAttackRelease(drum, '16n', time);
    //             drum.start(time);
    //         }
    //     }
    //     index++;
    // }

    // function bpmSetter() {
    //     let bpm = parseInt(document.getElementById('bpm-slider').value, 10);

    //     return bpm
    // }

    // function sequencePlayback() {
    //     console.log("running");

    //     if ($playingOrPaused.innerHTML === "Play") {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }