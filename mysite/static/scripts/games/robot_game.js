// objects

const BOX_SIZE = 20; 
var RADIUS = 1000;

const colors = [
[230,0,0],
[0,230,0],
[0,0,230],
[230,230,0],
[0,230,230],
[230,0,230]
];

var player;
var boxes = [];
var pressed = false;

function robot() {
	this.x = 100;
	this.y = 0;
	this.z = 60;
	this.update = function() {
		if(keyIsDown(87)) {
			this.z -= playerSpeed.value / 100;
		}
		if(keyIsDown(83)) {
			this.z += playerSpeed.value / 100;
		}
		if(keyIsDown(65)) {
			this.x -= playerSpeed.value / 100;
		}
		if(keyIsDown(68)) {
			this.x += playerSpeed.value / 100;
		}
	}
	this.show = function() {
		push();
		fill(150);
		stroke(0);
		translate(this.x,((BOX_SIZE)/4),this.z);
		scale(.5,3,.5);
		box(BOX_SIZE);
		pop();
	}
}

function item(_x,_z) {
	this.x = _x * BOX_SIZE;
	this.y = 0;
	this.z = _z * BOX_SIZE;
	this.color = Math.floor(Math.random() * 5);
	this.pickedUp = false;
	this.canBePickedUp = false;
	this.update = function() {
		this.canBePickedUp=((this.z > player.z - (BOX_SIZE / 2)) && (this.z < player.z + (BOX_SIZE / 2))) && ((this.x > player.x - (BOX_SIZE / 2)) && (this.x < player.x + (BOX_SIZE / 2)));
		if(this.pickedUp) {
			this.x = player.x;
			this.z = player.z;
		}
	}
	this.pickUp = function() {
		this.pickedUp = !this.pickedUp;
		console.log(this.pickedUp);
	}
	this.show = function() {
		push();
		if(this.canBePickedUp) {
			fill(colors[this.color][0] + 25,colors[this.color][1] + 25,colors[this.color][2] + 25);
			stroke(255);
		} else {
			fill(colors[this.color][0],colors[this.color][1],colors[this.color][2]);
			stroke(0);
		}
		translate(this.x,this.y,this.z);
		box(BOX_SIZE);
		pop();
	}
}

let camDistance = document.getElementById("camDistance");
let playerSpeed = document.getElementById("playerSpeed");

function setup() {
	var canvas = createCanvas(800, 800, WEBGL);
	canvas.parent('player');
	
	// setup
	
	player = new robot();
	
	boxes = [
	new item(4,2),
	new item(6,2),
	new item(3,4),
	new item(4,5),
	new item(5,5),
	new item(6,5),
	new item(7,4)
	];
	
	for(var i = 0; i < 16; i++) {
		boxes.push(new item(0-3,i-3));
		boxes.push(new item(16-3,i-3));
		boxes.push(new item(i-3,0-3));
		boxes.push(new item(i-3,17-5));
	}
	
	for(var i = -40; i < -5; i++) {
		for(var j = -30; j < 20; j++) {
			if(Math.random() * 100 > 80) boxes.push(new item(i,j));
		}
	}
}

function draw() { 
	background(255);
	
	// update camera
	camera(player.x, player.y - camDistance.value, player.z + map(camDistance.value,100,800,200,600), player.x, player.y, player.z, 0, 1, 0);
	
	// show/update player
	player.show();
	player.update();
	
	// show/update boxes 
	for(var i in boxes) {
		boxes[i].update();
		boxes[i].show();
	}
}

function keyReleased() {
	for(var i in boxes) {
		if(boxes[i].canBePickedUp && keyCode == 16) boxes[i].pickUp();
	}
}