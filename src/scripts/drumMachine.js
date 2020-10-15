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
     
    let buffer1 = new Tone.Buffer("src/samples/hh1.wav");
    let buffer2 = new Tone.Buffer("src/samples/snare1.wav"); 
    let buffer3 = new Tone.Buffer("src/samples/kick1.wav");
    let hh1 = new Tone.Player(buffer1); 
    hh1.volume.value = -20;
    let drums = [    
        hh1,
        new Tone.Player(buffer2),
        new Tone.Player(buffer3)
    ]



    drums.forEach(drum => drum.toDestination());
    const $rows = document.querySelectorAll(".row");
    let index = 0;

    Tone.Transport.bpm.value = bpmSetter();
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();

    document.getElementById("drums-clear-button").addEventListener('mousedown', () => {
        clearDrums();
    });

    document.getElementById("sample-8th-btn").addEventListener('mousedown', () => {
        clearDrums(); 
        eighthBeat();
    });

    document.getElementById("sample-16th-btn").addEventListener('mousedown', () => {
        clearDrums()
        sixteenthBeat();
    }); 

    document.getElementById("kit-1-btn").addEventListener('mousedown', () => {
        buffer1 = new Tone.Buffer("src/samples/hh1.wav");
        buffer2 = new Tone.Buffer("src/samples/snare1.wav"); 
        buffer3 = new Tone.Buffer("src/samples/kick1.wav");
        let hh1 = new Tone.Player(buffer1)
        hh1.volume.value = -20; 
        drums = [
        hh1,
        new Tone.Player(buffer2),
        new Tone.Player(buffer3)
        ]
        drums.forEach(drum => drum.toDestination());
    })

    document.getElementById("kit-2-btn").addEventListener('mousedown', () => {
        const buffer4 = new Tone.Buffer("src/samples/hh2.wav");
        const buffer5 = new Tone.Buffer("src/samples/snare2.wav");
        const buffer6 = new Tone.Buffer("src/samples/kick2.wav");

        let hh2 = new Tone.Player(buffer4); 
        hh2.volume.value = -20; 
        let snare2 = new Tone.Player(buffer5)
        let kick2 = new Tone.Player(buffer6)
        kick2.volume.value = -3;
        drums = [hh2, snare2, kick2]
        drums.forEach(drum => drum.toDestination());
   
    })

    

    function repeat(time) {
        let step = index % 32;

        for (let i = 0; i < $rows.length; i++) {
            
            Tone.Transport.swing = swingSetter();
            Tone.Transport.swingSubdivision = "16n"
            Tone.Transport.bpm.value = bpmSetter();
            

            let drum = drums[i];

            let $row = $rows[i];

            let $label = $row.querySelector(`label:nth-child(${step + 1})`); 
            let $input = $label.querySelector(`.drum-input-key`);
            let $key = $label.querySelector(`.drum-key`); 
            
            $key.style.border = "2px solid red"

            if ($input.checked) {
                // drum.triggerAttackRelease(drum, '16n', time);
                drum.start(time);
            }
        }

        setTimeout(function() {
            for (let i = 0; i < $rows.length; i++) {
                let $label = $rows[i].querySelector(`label:nth-child(${step + 1})`);
                let $key = $label.querySelector('.drum-key');
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
        return swingLevel
    }

    function clearDrums() {
        let $inputs = document.querySelectorAll('.drum-key-wrap')
        $inputs.forEach($input => {
            let $checkbox = $input.querySelector('input');
            $checkbox.checked = "";

        })
    }

    function eighthBeat() {
        let $allDrums = document.querySelectorAll('.drum-key-wrap');
        let allDrums = Array.from($allDrums);
        let $hhs = allDrums.slice(0, 32);
        let $sns = allDrums.slice(32, 64);
        let $ks = allDrums.slice(64, 96);

        for (let i = 0; i < $hhs.length; i += 2) {
            $hhs[i].querySelector('input').checked = true;
        }

        for (let i = 4; i < $sns.length; i += 8) {
            $sns[i].querySelector('input').checked = true;
        }

        for (let i = 0; i < $ks.length; i += 8) {
            $ks[i].querySelector('input').checked = true;
            $ks[i + 3].querySelector('input').checked = true;
        }
    }

    function sixteenthBeat() {
        let $allDrums = document.querySelectorAll('.drum-key-wrap');
        let allDrums = Array.from($allDrums);
        let $hhs = allDrums.slice(0, 32);
        let $sns = allDrums.slice(32, 64);
        let $ks = allDrums.slice(64, 96);

        $hhs.forEach($hh => {
            let $checkbox = $hh.querySelector('input');
            $checkbox.checked = true;
        })

        for (let i = 4; i < $sns.length; i += 8) {
            $sns[i].querySelector('input').checked = true;
        }

        for (let i = 0; i < $ks.length; i += 8) {
            $ks[i].querySelector('input').checked = true;
            $ks[i + 3].querySelector('input').checked = true;
        }
    }


});