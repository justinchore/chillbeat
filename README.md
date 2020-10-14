# chillbeat
 
## MVP 
Users will be able to: 
  - Pick from preloaded samples for snare, kick and hi hat
  - Use a slider for tempo adjustments
  - Place a sample on a musical "grid" or "sequence" 
  - Start, pause, or restart the playback 
  - Be more detailed about the placement of each sample -> each grid cell with have an inner grid 
  - Have access to different chord sequencer in the scale of their choosing -> 2 keys -> have access to simple effects (detune, reverb, distortion)
  - Have access to a simple bass synth sequencer with notes in the scale -> 2 keys (Bonus) 
  - Have access to a a melody synth with notes in the scale -> have access to simple effects (detune, distortion, reverb) 

## Technologies, Libraries, APIs 
The project will be implemented with the folowing technologies: 
  - Javascript/p5 for sequencer logic and buttons, also sliders for bpm 
  - Tone.js for effects and instrument making (chord sequencer, bass synth and melody synth) 
  - Canvas/CSS for visuals 

## Wireframes 
The app will be a single screen with various sequencers. A space bar will toggle start for all sequencers and have a cursor to visually represent the playback's position in the the grid. The right side of the drum sequencer there will be a bpm adjuster as well as buttons for different samples (3) for each part of the drums. There will be a button to clear every "cell" in the sequencer as well. Users can click an occupied cell and use directional keys to further adjust the note in 2 increments (earlier or later). A modal will be incorporated explaining the app and its functionalities. 

## Backend 
The backend will house the different samples being used for the drum sequencer. 

## Implementation Timeline 

### Day 1: 
  - Setup session to work with Tone.js and p5. 
  - Create a sequencer for the drums, and figure out having inner "grids" inside of a cell 
  - Create a bpm slider 
  - Incorporate the samples and switching from sample to sample 
  - Create buttons for each sample 
  - Style the sequencer and buttons (simple) 
  
### Day 2: 
  - Research Tone.js functionality to create a chordal sequencer and know how to use effects 
  - Implement sequencer logic from drums sequencer but instead of samples, have the sequencer generate sounds from inside the application. (no need for inner grid)
  - Create effects buttons to change the output sounds of the chords

### Day 3: 
   - Test all functionality
   - Style both sequencer and buttons in a more detailed way 
   - Work on the header containing the about model and my information 
