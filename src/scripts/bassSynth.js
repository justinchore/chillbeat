import * as Tone from 'tone';
// import { NamedModulesPlugin } from 'webpack';

document.addEventListener('DOMContentLoaded', function () {
    console.clear(); 
    document.body.onkeydown = (e) => {
        // debugger
        if (e.code === "Space") {
            e.preventDefault();
            if (Tone.context.state !== 'running') {
                let buffer1 = new Tone.Buffer("src/samples/hh1.wav");
                let buffer2 = new Tone.Buffer("src/samples/snare1.wav");
                let buffer3 = new Tone.Buffer("src/samples/kick1.wav");
                Tone.context.resume();
                document.getElementById("playback-button").innerHTML = "&#9612&#9612";
            } else if (Tone.Transport.state === "paused") {
                Tone.Transport.stop()
                Tone.Transport.start();
                document.getElementById("playback-button").innerHTML = "&#9612&#9612";
            } else {
                Tone.Transport.pause();
                document.getElementById("playback-button").innerHTML = "&#9654";
            }
        }
    };

    let synth = new Tone.MonoSynth({
        oscillator: {
            type: 'triangle'
        }, 
        envelope: {
        },
        filter : {
            frequency: 900,
            type: "lowpass"
        },
        harmonicity: 1,
        filterEnvelope: {
            attack: 0.1, 
            decay: 0.5, 
            sustain: 0.5, 
            release: 0.5
        }

    });

    document.getElementById("bass-rev-slider").addEventListener("change", () => {
        // debugger
        synth.disconnect(rev).toDestination();
        let level = parseFloat(document.getElementById("bass-rev-slider").value, 10);
        rev = new Tone.Reverb(level).toDestination();
        synth.connect(rev).toDestination();
    })

    document.getElementById("chords-rev-slider").addEventListener("change", () => {
        // debugger
        sampler.disconnect(rev).toDestination();
        let level = parseFloat(document.getElementById("chords-rev-slider").value, 10);
        console.log(level);
        rev = new Tone.Reverb(level).toDestination();
        sampler.connect(rev).toDestination();
    })

    let rev = new Tone.Reverb(0.1).toDestination();
    synth.connect(rev).toDestination(); 

    const $rows = document.querySelectorAll(".bass-row"); 
    console.log($rows); 
    let index = 0; 

    Tone.Transport.bpm.value = bpmSetter();
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();

    function repeat(time) {
        let step = index % 32; 

        for (let i = 0; i < $rows.length; i++ ) {
            Tone.Transport.swing = swingSetter(); 
            Tone.Transport.swingSubdivision = "16n"; 
            Tone.Transport.bpm.value = bpmSetter(); 

            let $row = $rows[i]; 

            let $label = $row.querySelector(`label:nth-child(${step+1})`); 
            let $input = $label.querySelector(".bass-input-key"); 
            let $key = $label.querySelector('.bass-key'); 

            $key.style.border = "2px solid red"

            let volLevel = volumeSetter()
            synth.volume.value = volLevel;

            if ($input.checked && i === 0) {
                // drum.triggerAttackRelease(drum, '16n', time);
                synth.triggerAttackRelease("C2", noteLength, time);
                // chordNotes[i].start(time);
            } else if ($input.checked && i === 1) {
                synth.triggerAttackRelease("F1", noteLength, time);
             
            } else if ($input.checked && i === 2) {
                synth.triggerAttackRelease("A1", noteLength, time);
             
            } else if ($input.checked && i === 3) {
              
                synth.triggerAttackRelease("G1", noteLength, time);
            } else if ($input.checked && i === 4) {
              
                synth.triggerAttackRelease("B1", noteLength, time);
            } else if ($input.checked && i === 5) {
            
                synth.triggerAttackRelease("Bb1", noteLength, time);
            } else if ($input.checked && i === 6) {
        
                synth.triggerAttackRelease("E2", noteLength, time); 
            } else if ($input.checked && i === 7) {
        
                synth.triggerAttackRelease("D2", noteLength, time);
            }
        }
        setTimeout(function () {
            for (let i = 0; i < $rows.length; i++) {
                let $label = $rows[i].querySelector(`label:nth-child(${step + 1})`);
                let $key = $label.querySelector('.bass-key');
                $key.style.border = "2px solid black"
            }
        }, 100)

        index++ 
    }

    function bpmSetter() {
        let bpm = parseInt(document.getElementById('bpm-slider').value, 10);
        return bpm; 
    }

    function swingSetter() {
        let swingLevel = parseFloat(document.getElementById('swing-slider').value, 10);
        return swingLevel;
    }

    function volumeSetter() {
        let vol = parseInt(document.getElementById('bass-volume-slider').value, 10); 
        return vol;
    }

    function noteLengthSetter() {
        let length = parseInt(document.getElementById('bass-length-slider').value, 10);
        if (length === 5) {
            return "1n"
        } else if (length === 4) {
            console.log("2n")
            return "2n"
        } else if (length === 3) {
            console.log("4n")
            return "4n"
        } else if (length === 2) {
            console.log("8n")
            return "8n"
        } else if (length === 1) {
            console.log("16n")
            return "16n"
        }
    }

})