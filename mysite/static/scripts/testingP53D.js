
function planet(_name, _year, _color) {
	this.name = _name;
	this.year = _year;
	this.color = _color;
	this.img;
}

var planets = [];

function preload() {
	planets.push(new planet("mercury",87.969,[255, 207, 112]));
	planets.push(new planet("venus",224.7,[255, 97, 18]));
	planets.push(new planet("earth",365.2564,[66, 255, 135]));
	planets.push(new planet("mars",687,[255, 109, 36]));
	planets.push(new planet("jupiter",4332.59,[255, 188, 79]));
	planets.push(new planet("saturn",10759,[232, 210, 174]));
	planets.push(new planet("uranus",30688.5,[191, 239, 245]));
	planets.push(new planet("neptune",60182,[101, 143, 247]));
	for(var i in planets) {
		//planets[i].img = loadImage("images/planets/"+planets[i].name+".jpg");
	}
}


function setup() { 
	var canvas = createCanvas(800, 800, WEBGL);
	canvas.parent('player');
	
	// setup planets
}

var x = 400;
var y = 400;

var r = 40;

function draw() { 
	background(255);
	
	
	translate(-300,0,0);
	
	//ambientLight(255);
	directionalLight(255, 255, 255, 100, 100, 1);
	
	for(var i in planets) {
		push();
		//texture(planets[i].img);
		fill(planets[i].color[0],planets[i].color[1],planets[i].color[2]);
		noStroke();
		//normalMaterial();
		translate((r*2.2) * i,0,0);
		sphere(r);
		pop();
	}
	
}