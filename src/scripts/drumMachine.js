import * as Tone from 'tone'; 

document.addEventListener('DOMContentLoaded', function () {
    console.clear();

    let drums = [
        new Tone.Player({ url: "src/samples/hh1.wav" }),
        new Tone.Player({ url: "src/samples/snare1.wav" }),
        new Tone.Player({ url: "src/samples/kick1.wav" })
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
        drums = [
            new Tone.Player({ url: "src/samples/hh1.wav" }),
            new Tone.Player({ url: "src/samples/snare1.wav" }),
            new Tone.Player({ url: "src/samples/kick1.wav" })
        ]
        drums.forEach(drum => drum.toDestination());
    })

    document.getElementById("kit-2-btn").addEventListener('mousedown', () => {
        drums = [
            new Tone.Player({ url: "src/samples/hh2.wav" }),
            new Tone.Player({ url: "src/samples/snare2.wav" }),
            new Tone.Player({ url: "src/samples/kick2.wav" })
        ]
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