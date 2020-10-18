import * as Tone from 'tone';

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

   let sampler = new Tone.Sampler({
       "C3" : "src/samples/cmaj7.mp3",
       "A4" : "src/samples/fmaj7.mp3",
       "B4" : "src/samples/am7.mp3",
       "C4" : "src/samples/g7.mp3", 
       "D4" : "src/samples/bdmin.mp3",
       "E4" : "src/samples/bbmaj7.mp3", 
       "F4" : "src/samples/em7.mp3",
       "G4" : "src/samples/dm7.mp3"
   })

    document.getElementById("chords-clear-button").addEventListener('mousedown', () => {
        clearChords();
    });

    document.getElementById("chords-example-one").addEventListener('mousedown', () => {
        clearChords();
        exampleOne();
    });

    document.getElementById("chords-example-two").addEventListener('mousedown', () => {
        clearChords(); 
        exampleTwo(); 
    })

    document.getElementById("chords-rev-slider").addEventListener("change" , () => {
        // debugger
        sampler.disconnect(rev).toDestination();
        let level = parseFloat(document.getElementById("chords-rev-slider").value, 10); 
        console.log(level); 
        rev = new Tone.Reverb(level).toDestination();
        sampler.connect(rev).toDestination(); 
    })

    // connect the player to the filter, disto rtion and then to the master output
 
    // synths[0].oscillator.type = 'triangle'; 
    // synths[1].oscillator.type = 'sine';
    // synths[2].oscillator.type = 'sawtooth';


    // let revLev = parseFloat(document.getElementById('chords-rev-slider').value, 10);
    // console.log(revLev);
    let rev = new Tone.Reverb(0.1).toDestination();  
    sampler.connect(rev).toDestination(); 


    const $rows = document.querySelectorAll(".chordal-row");
    let index = 0;

    Tone.Transport.bpm.value = bpmSetter();
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();

    function repeat(time) {
        let step = index % 32;

        for (let i = 0; i < $rows.length; i++) { 

            Tone.Transport.swing = swingSetter();
            Tone.Transport.swingSubdivision = "16n"
            Tone.Transport.bpm.value = bpmSetter();

            let $row = $rows[i];

            let $label = $row.querySelector(`label:nth-child(${step + 1})`);
            let $input = $label.querySelector(`.chords-input-key`);
            let $key = $label.querySelector(`.chords-key`);

           
                $key.style.border = "2px solid red"
          
            let noteLength = noteLengthSetter(); 
            
            if ($input.checked && i === 0) {
                // drum.triggerAttackRelease(drum, '16n', time);
                sampler.triggerAttackRelease("C3",noteLength, time);
                // chordNotes[i].start(time);
            } else if ($input.checked && i === 1) { 
                sampler.volume.value = -2
                sampler.triggerAttackRelease("A4", noteLength, time);
            } else if ($input.checked && i === 2) { 
                sampler.volume.value = -2
                sampler.triggerAttackRelease("B4", noteLength, time);
            } else if ($input.checked && i === 3) {
                sampler.volume.value = -2
                sampler.triggerAttackRelease("C4", noteLength, time);
            } else if ($input.checked && i === 4) {
                sampler.volume.value = -2
                sampler.triggerAttackRelease("D4", noteLength, time);
            } else if ($input.checked && i === 5) {
                sampler.volume.value = -2
                sampler.triggerAttackRelease("E4", noteLength, time);
            } else if ($input.checked && i === 6) {
                sampler.volume.value = -2
                sampler.triggerAttackRelease("F4", noteLength, time);
            } else if ($input.checked && i === 7) {
                sampler.triggerAttackRelease("G4", noteLength, time);
            }
        }
        setTimeout(function () {
            for (let i = 0; i < $rows.length; i++) {
                let $label = $rows[i].querySelector(`label:nth-child(${step + 1})`);
                let $key = $label.querySelector('.chords-key');
                $key.style.border = "2px solid black"
            }
        }, 100)

        index++;
    }


    function bpmSetter() {
        let bpm = parseInt(document.getElementById('bpm-slider').value, 10);

        return bpm
    }

    function swingSetter() {
        let swingLevel = parseFloat(document.getElementById('swing-slider').value, 10);
        return swingLevel;
    }

    function getRev() {
        let level = parseFloat(document.getElementById("chords-rev-slider").value, 10);
        return level; 
    }

  

    function noteLengthSetter() {
        let length = parseInt(document.getElementById('note-length-slider').value, 10);
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

    function clearChords() {
        let $inputs = document.querySelectorAll('.chords-key-wrap')
        $inputs.forEach($input => {
            let $checkbox = $input.querySelector('input');
            $checkbox.checked = "";

        });
    }

    function exampleOne() {
        let $allChords = document.querySelectorAll('.chords-key-wrap');
        let allChords = Array.from($allChords);
        let $first = allChords.slice(0, 32);
        let $second = allChords.slice(32, 64);
        let $third = allChords.slice(64, 96);
        let $sixth = allChords.slice(160, 192);
        let $seventh = allChords.slice(192, 224); 
        let $eigth = allChords.slice(224, 256); 
        
        $first[0].querySelector('input').checked = true; 
        $first[12].querySelector('input').checked = true; 
        $second[28].querySelector('input').checked = true; 
        $third[8].querySelector('input').checked = true; 
        $sixth[16].querySelector('input').checked = true; 
        $seventh[12].querySelector('input').checked = true; 
        $eigth[4].querySelector('input').checked = true; 
        $eigth[6].querySelector('input').checked = true; 
        $eigth[20].querySelector('input').checked = true; 
        $eigth[22].querySelector('input').checked = true; 
        $eigth[29].querySelector('input').checked = true; 

    }

    function exampleTwo() {
        let $allChords = document.querySelectorAll('.chords-key-wrap');
        let allChords = Array.from($allChords);
        let $first = allChords.slice(0, 32);
        let $second = allChords.slice(32, 64);
        let $third = allChords.slice(64, 96);
        let $fourth = allChords.slice(96, 128); 

        $first[12].querySelector('  input').checked = true; 
        $second[8].querySelector('input').checked = true; 
        $third[0].querySelector('input').checked = true; 
        $fourth[28].querySelector('input').checked = true; 
    }
});