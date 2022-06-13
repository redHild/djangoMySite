// objects

class particle {
	constructor() {
		this.x = mouseX;
		this.y = mouseY;
		this.a = 255;
		let hVal = map(document.getElementById("pHv").value,0,100,0,25.0);
		let vVal = map(document.getElementById("pVv").value,0,100,0,25.0);
		this.vx = random(-hVal,hVal);
		this.vy = random(-vVal,-0.5);
	}
	show = function() {
		fill(255,this.a);
		noStroke();
		let w = map(document.getElementById("pSize").value,1,100,1,50);
		rect(this.x,this.y, w, w * 1.25);
	}
	update = function() {
		this.vy -= map(document.getElementById("pGrv").value,-10,10,-1.2,1.2);
		this.x += this.vx;
		this.y += this.vy;
		this.a -= document.getElementById("pDec").value;
	}
}

var particles;

function setup() {
	var canvas = createCanvas(800, 600);
	canvas.parent('player');
	frameRate(30);
	
	particles = [];
	
}

function draw() { 
	background(0);
	fill(255);
	
	if(mouseIsPressed && ((mouseX >= 0 && mouseX <= 800) && (mouseY >= 0 && mouseY <= 600)))
		for(var i = 0; i < document.getElementById("pAmt").value; i++)
			particles.push(new particle());
			
	for(let i = particles.length - 1; i >= 0; i--) {
		particles[i].show();
		particles[i].update();
		if(particles[i].a <= 0) particles.splice(i,1);
	}
	document.getElementById("tAmt").innerHTML = document.getElementById("pAmt").value;
	document.getElementById("tSize").innerHTML = document.getElementById("pSize").value;
	document.getElementById("tGrv").innerHTML = document.getElementById("pGrv").value;
	document.getElementById("tHv").innerHTML = document.getElementById("pHv").value;
	document.getElementById("tVv").innerHTML = document.getElementById("pVv").value;
	document.getElementById("tDec").innerHTML = document.getElementById("pDec").value;
	
	fill(255,0,0);
	text("Amount of Particles: " + particles.length, 25, 25); // Text wraps within text box
	
}

