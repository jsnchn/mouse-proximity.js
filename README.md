# mouse-proximity.js
Track the distance between the mouse cursor and multiple elements

### install
bower:
```
bower install mouse-proximity
```
npm:
```
npm install mouse-proximity
```
distribution file: dist/js/mouse-proximity.min.js

### Use with vanilla js
```javascript
//initialize options here
var mprox = new mouseProximity(document.getElementsByClassName('demo'), {
    clear: true,
    origin: 'center',
    showAttribute: false,
    cb: //callback can be set here too
});

//callback
var doSomething = function(el,distance){
    //do something with the element (el)
    //dow something with the distance (distance)
}

//run the proximity tracker
mprox.run(doSomething);

//stop the proximity tracker
mprox.stop();
```

### Use with jQuery
```javascript
//initialize options here
$('.demo').mouseProximity({
    clear: true,
    origin: 'center',
    showAttribute: false,
    cb: //callback can be set here too
});

//callback
var doSomething = function(el,distance){
    //do something with the element (el)
    //dow something with the distance (distance)
}

//run the proximity tracker
$('.demo').data('mouseProximity').run(doSomething);

//stop the proximity tracker
$('.demo').data('mouseProximity').stop();
```

### Options
#### clear 
- type: boolean
- default: false
- for clearing the console so you don't end up with a huge list of mouse move logs (*not really reliable*)

#### origin
- type: string
- options: center (*only one option for now*)
- default: center
- set the origin relative to the body of the element from which to calculate distance from the mouse cursor

#### showAttribute
- type: boolean
- default: true
- add a *data-mouse-proximity* attribute to the element with its distance data

#### cb
- type: function
- default: 
```javascript
function(el,distance){
    console.log(el.outerHTML + ', distance ' + distance);
}
```
- callback function for doing whatever you want with the resulting distance data

### Methods
#### run( callback( el, distance) )
starts a mousemove event and feeds the resulting data into the callback
#### stop()
unbinds the mousemove event and halts proximity tracking