# Chillbeat
 
## Architecture and Technologies 
Chillbeat was built using: 
 - Javascript
 - CSS/HTML 
 - Tone.js 

## Background and Overview  
Chillbeat is a browser beat maker designed to make music composing intuitive and simple. 
[Live Site](https://justinchore.github.io/chillbeat/)

![alt text](https://github.com/justinchore/chillbeat/blob/master/src/images/chillbeat_pic.png "chillbeat picture")

## Sequencers 
Chillbeat has three instrument sequencers for users to interact with. Each sequencer houses 8 beats, each divided into 4 sub-beats. Each sequencer uses an instrument from the Tone.js library. Each "beat" is iterated through, allowing users to place a sound into different locations. All three sequencers share the same Transport (master output), allowing for pause/play functionality and other global changes to the music. Buttons for effects, volume, and examples are in each of the sequencers, changing the particular sequencer's sound in the master output. 

## Master Output 
All three sequencers feed into the OUTPUT/MAIN module, which controls the play/pause, tempo, and swing controls. 
 - Play/Pause: The button can be controlled in two ways - by spacebar and click. 
 - Tempo: This slider is linked to the output of every sequencer, changing the speed of the iteration through each sequence. 
 - Swing: This slider is linked to a numeric value of the space between each note. Increasing the slider value places more space between each note,  creating a "swung" feeling in the music. 
