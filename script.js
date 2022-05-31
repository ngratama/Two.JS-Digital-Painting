var two = new Two({
    fullscreen: true,
    autostart: true
}).appendTo(document.body);

var physics = new Physics();

var mass = 1;
var radius = 100;

var x1 = two.width * 0.25;
var x2 = two.width * 0.75;
var y = two.height / 2;

var a = physics.makeParticle(mass, x1, y);
var b = physics.makeParticle(mass, x2, y);

a.shape = two.makeCircle(x1, y, radius);
b.shape = two.makeCircle(x2, y, radius);

a.shape.noStroke().fill = 'rgb(255, 100, 100)';
b.shape.noStroke().fill = 'rgb(255, 100, 100)';

a.position = a.shape.translation;
b.position = b.shape.translation;

var connection = new Two.Polygon([a.position, b.position]);
two.add(connection);

connection.linewidth = 10;
connection.cap = 'round';
connection.stroke = '#333';

var strength = 0.75;
var drag = 0.1;
var rest = radius * 2;

var spring = physics.makeSpring(a, b, strength, drag, rest);

physics.onUpdate(function () {

    two.update();

    if (b.resting()) {
        a.position.set(x1, y);
        b.position.set(x2, y);
    }

});

physics.play();