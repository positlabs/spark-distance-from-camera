var Scene = require('Scene')
var D = require('Diagnostics')
var TouchGestures = require('TouchGestures')
var Reactive = require('Reactive')

var camera = Scene.root.find('Camera')
var planeTracker = Scene.root.find('planeTracker0')
var plane0 = Scene.root.find('plane0')
var plane1 = Scene.root.find('plane1')
var text0 = Scene.root.find('text0')

// TouchGestures.onTap(plane).subscribe(function(gesture){
    // D.log(gesture.location)
    // var hit = planeTracker.hitTest(gesture.location)
    // D.log(hit.z)
// })

TouchGestures.onTap().subscribe(function(gesture) { 
    // D.log(gesture.location.x)
    
    // var pixelPoint = Reactive.point2d(gesture.location.x, gesture.location.y)
    // var camPosition = Scene.unprojectWithDepth(pixelPoint, .5)
    // D.watch('cam.x', camPosition.x)
    // D.watch('cam.y', camPosition.y)
    // D.watch('cam.z', camPosition.z)
})

var planePosition = Reactive.point(plane0.transform.x.lastValue, plane0.transform.y.lastValue, plane0.transform.z.lastValue)
plane0.transform.position = planePosition
D.watch('plane.x', planePosition.x)
D.watch('plane.y', planePosition.y)
D.watch('plane.z', planePosition.z)

var pixelPoint = Reactive.point2d(Reactive.val(0), Reactive.val(0))
var camPosition = Scene.unprojectWithDepth(pixelPoint, 0.01)
D.watch('cam.x', camPosition.x)
D.watch('cam.y', camPosition.y)
D.watch('cam.z', camPosition.z)
// D.log(camPosition)

var distance = camPosition.distance(planePosition).round()
D.watch('distance', distance)

text0.text = distance.toString()

plane1.hidden = distance.gt(300)