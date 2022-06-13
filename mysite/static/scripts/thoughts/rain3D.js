// objects

class droplet {
	constructor() {
		this.x = random(-400,400);
		this.z = random(-200,250);
		this.y = -400;
		this.vx = random(-1,1);
		this.vz = random(-1,1);
		this.vy = random(-10,-2);
		this.w = 10;
	}
	show = function() {
		fill(0,50,200,50);
		noStroke();
		let s = 20;
		beginShape(TRIANGLES);
		vertex(this.x, this.y, this.z); // tri 1
		vertex(this.x - (this.w / s), this.y - this.w, this.z);
		vertex(this.x + (this.w / s), this.y - this.w, this.z);
		vertex(this.x, this.y, this.z); // tri 2
		vertex(this.x, this.y - this.w, this.z - (this.w / s));
		vertex(this.x, this.y - this.w, this.z + (this.w / s));
		endShape();
	}
	update = function() {
		this.x += this.vx;
		this.z += this.vz;
		this.y -= this.vy;
		if(this.y>400 && (this.z < -50 || this.z > 1000 || this.x < -300 || this.x > 300)) {
			this.x = random(-400,400);
			this.z = random(-200,250);
			this.y = -400;
			this.vx = random(-1,1);
			this.vz = random(-1,1);
		}
		if(this.y>400) this.y = -400;
		this.a -= 5;
	}
}

var rain;

function setup() {
	var canvas = createCanvas(800, 800, WEBGL);
	canvas.parent('player');
	frameRate(60);
	
	rain = [];
	
	for(var i = 0; i < 2000; i++) {
		rain.push(new droplet());
	}
	
	camera(
	0,-50,500,
	0,0,0,
	0,1,0
	);
	
}

function draw() { 
	background(175);
	
/* 	// draw ground
	fill(250,170,0);
	//noStroke();
	stroke(0);
	inc = .01;
	var xoff = 0;
	var zoff = 0;
	var height = 1
	var scale = 10;
	var TILE_WIDTH = 10;
	for(var z = -500;z<=500;z+=TILE_WIDTH ){
		xoff = 0;
		beginShape(TRIANGLE_STRIP);
		for(var x = -500;x<=500;x+=TILE_WIDTH ) {
			vertex(x,(noise(xoff,zoff) * scale)+height,z);
			vertex(x,(noise(xoff,zoff + inc) * scale)+height,z - TILE_WIDTH);
			vertex(x + TILE_WIDTH,(noise(xoff + inc,zoff) * scale)+height,z);
			vertex(x,(noise(xoff,zoff + inc) * scale)+height,z - TILE_WIDTH);
			vertex(x + TILE_WIDTH,(noise(xoff + inc,zoff + inc) * scale)+height,z - TILE_WIDTH);
			xoff += inc;
		}
		zoff += inc;
	}
	endShape(); */
	
	
	for(var i in rain) {
		rain[i].show();
		rain[i].update();
	}
	
	//fill(200);
	//box(100);
	
}

