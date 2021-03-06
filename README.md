# interactiveImageJS

A Jquery Widget that allows the user to take a filmstrip image and create a looping sequence, as well as adding some interactivity to the image via an action loop.

### Requires
1. jQuery 1.9+
2. jQuery UI 1.8.16+ - To make the widget

### Assets Folder
This folder contains the assets I used to make the deer loop (just not the 3D file). 
1. Swap the source footage (replace footage)
2. Adjust the comp size
3. Adjust the sliders on the first layer to correct the expressions for frame rate, etc.
4. Simply duplicate the layer (CTRL + D) once for each frame
5. Finally produce your final image with a single frame render in the render queue.

### Options
* filmStripClass: '' - string: name of the class to use for the widget if not the main element
* controlAttr: 'background-position' - string: attribute to adjust 
* filmDir: 0 - 0 number: for horizontal, 1 for vertical
* frameSize: 50 - number: width or height of the filmstrip frame given the direction of motion
* filmUnits: 'px' - string: units to slide frame
* frameRate: 30 - number: rate of play in frames per second
* loopFrameArr: [ 0, 100 ] - array: numbers for the begining and ending frames of the base loop 
* actionFramesArr: [ 101, 200 ] - array: numbers for the begining and ending frames of the action loop 
* interactive: true - boolean: whether or not the image has an action loop
* automate: true - boolean: whether to automatically trigger the loop on load
* actionFlag: false - boolean: flag used to trigger an 'action loop' at the loop interchange

### Public Methods
* advFrame ( Number ) - Number: Number of frames to advance defaults to 1 if undefined
* stopPlay () - stops the interactive image timer
* startPlay () - starts the interactive image timer
* triggerAction () - sets the action flag to trigger the action loop
* clearActionFlag () - clears the action flag (which triggers the action loop)

### Example Use
$( '#myID' ).intImage();

### License
The MIT License (MIT)